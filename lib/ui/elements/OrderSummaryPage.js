const log = require('log4js').getLogger('order-summary-page');
const { waitElementVisible, scrollIntoView } = require('../../browserHelpers');

class OrderSummaryPage {
    async getOrderReference() {
        log.info('searching order reference number');

        const referenceLabel = $('.order-purchaseid');

        await waitElementVisible({ element: $('#tip-payment-methods-select') });

        await scrollIntoView({ element: referenceLabel });

        const number = await referenceLabel.getText();

        log.debug(`found! number: ${number}`);

        return number;
    }
}

module.exports = OrderSummaryPage;
