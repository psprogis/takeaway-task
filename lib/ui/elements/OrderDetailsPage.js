const log = require('log4js').getLogger('order-details-page');

const { waitElementVisible, scrollIntoView } = require('../../browserHelpers');
const OrderSummaryPage = require('./OrderSummaryPage');
const GenericDropdown = require('./GenericDropdown');

class OrderDetailsPage {

    constructor() {
        this.deliveryTimeDropdown = new GenericDropdown($('select#ideliverytime'));
        this.cashDropdown = new GenericDropdown($('select#ipayswith'));
    }

    async processOrder({ where, who, when, payment }) {
        log.info('processing order...');

        await this.fillInForm({ where, who, when, payment });

        const orderButton = $('.checkout-orderbutton-btn input');

        await scrollIntoView({ element: orderButton });
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

        // TODO: validate when.time
        await this.deliveryTimeDropdown.selectOption({ value: when.time });

        if (payment.type !== 'cash') {
            throw new Error('only cash payment type is supported');
        }

        // TODO: extract to PaymentWidget
        // select cash only as of now
        // TODO: fix selector
        const paymentOption = await $('#ipaymentmethods .paymentmethod0');
        await scrollIntoView({ element: paymentOption });
        await paymentOption.click();

        // TODO: create method processCashOrder
        // replace with optional chaining in the new node versions, e.g.:
        // payment?.details?.amount === 'closest'
        if (payment.details && payment.details.amount && payment.details.amount === 'closest') {
            await this.cashDropdown.selectByNumber({ number: 1 });
        }
    }
}

module.exports = OrderDetailsPage;
