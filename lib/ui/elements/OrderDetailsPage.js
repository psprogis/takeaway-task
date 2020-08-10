const log = require('log4js').getLogger('delivery-page');

const { waitElementVisible } = require('../../waitHelpers');
const OrderSummaryPage = require('./OrderSummaryPage');

class OrderDetailsPage {

    async processOrder({ where, who, when, payment }) {
        await this.fillInForm({ where, who, when, payment });

        const orderButton = $('.checkout-orderbutton-btn input');

        await browser.executeScript('arguments[0].scrollIntoView(true)', orderButton);
        await waitElementVisible({ element: orderButton });

        await orderButton.click();

        return new OrderSummaryPage();
    }

    // can be filled with Promise.all, but in this case it will be more user-like to go through each field step by step
    async fillInForm({ where, who, when, payment }) {
        const addressInput = $('input#iaddress');
        await waitElementVisible({ element: addressInput });

        log.info('fill in delivery form...');

        await addressInput.clear().sendKeys(where.address);
        await $('input#ipostcode').clear().sendKeys(where.postcode);
        await $('input#itown').clear().sendKeys(where.city);
        await $('input#isurname').clear().sendKeys(who.name);
        await $('input#iemail').clear().sendKeys(who.email);
        await $('input#iphonenumber').clear().sendKeys(who.phone);

        // TODO: extract to Dropdown class, validate when.time
        const dropDown = $('select#ideliverytime');
        await dropDown.click();
        await dropDown.$(`[value="${when.time}"]`).click();
        await dropDown.click();

        if (payment.type !== 'cash') {
            throw new Error('only cash payment type is supported');
        }

        // TODO: extract to PaymentWidget
        // select cash only as of now
        // TODO: fix selector
        const paymentOption = await $('#ipaymentmethods .paymentmethod0');
        await browser.executeScript('arguments[0].scrollIntoView(true)', paymentOption);
        await paymentOption.click();

        // TODO: create method processCashOrder
        // replace with optional chaining in the new node versions, e.g.:
        // payment?.details?.amount === 'closest'
        if (payment.details && payment.details.amount && payment.details.amount === 'closest') {
            const cashDropdown = $('select#ipayswith');
            await cashDropdown.click();
            await cashDropdown.$$('option').get(1).click(); // click next
            await cashDropdown.click();
        }
    }
}

module.exports = OrderDetailsPage;
