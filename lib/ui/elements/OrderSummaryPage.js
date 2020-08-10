const log = require('log4js').getLogger('order-summary-page');
const { waitElementVisible } = require('../../browserHelpers');

class OrderSummaryPage {
    async getOrderReference() {
        log.info('searching order reference number');

        const referenceLabel = $('.order-purchaseid');

        waitElementVisible({ element: $('#tip-payment-methods-select') });

        await browser.executeScript('arguments[0].scrollIntoView(true)', referenceLabel);

        const number = await referenceLabel.getText();

        log.debug(`found! number: ${number}`);

        return number;
    }
}

module.exports = OrderSummaryPage;
