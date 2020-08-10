// const log = require('log4js').getLogger('ordersummary-page');
const { waitElementVisible } = require('../../waitHelpers');

class OrderSummaryPage {
    async getOrderReference() {
        const referenceLabel = $('.order-purchaseid');

        waitElementVisible({ element: $('#tip-payment-methods-select') });

        await browser.executeScript('arguments[0].scrollIntoView(true)', referenceLabel);

        return referenceLabel.getText();
    }
}

module.exports = OrderSummaryPage;
