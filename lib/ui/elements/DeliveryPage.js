const log = require('log4js').getLogger('delivery-page');

const { ExpectedConditions: EC } = protractor;

class DeliveryPage {

    async processOrder({ where, who, when, payment }) {
        await this.fillInForm({ where, who, when, payment });

        const orderButton = $('.checkout-orderbutton-btn input').click();
        await browser.executeScript('arguments[0].scrollIntoView(true)', orderButton);
        await orderButton.click();
    }

    // can be filled with Promise.all, but in this case it will be more user-like to go through each field step by step
    async fillInForm({ where, who, when, payment }) {
        const addressInput = $('input#iaddress');
        await browser.wait(EC.visibilityOf(addressInput), 3000);

        log.info('fill in delivery form...');

        await addressInput.sendKeys(where.address);
        await $('input#ipostcode').sendKeys(where.postcode);
        await $('input#itown').sendKeys(where.city);
        await $('input#isurname').sendKeys(who.name);
        await $('input#iemail').sendKeys(who.email);
        await $('input#iphonenumber').sendKeys(who.phone);

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

        // TODO: select cash payment and closest amount
    }
}

module.exports = DeliveryPage;
