// const log = require('log4js').getLogger('ordersummary-page');
const { ExpectedConditions: EC } = protractor;

class OrderSummaryPage {
    async getOrderReference() {
        const referenceLabel = $('.order-purchaseid');

        // wait page load
        await browser.wait(EC.visibilityOf($('#tip-payment-methods-select')), 3000);

        await browser.executeScript('arguments[0].scrollIntoView(true)', referenceLabel);
        // await browser.wait(EC.visibilityOf(referenceLabel), 3000);

        return referenceLabel.getText();
    }
}

module.exports = OrderSummaryPage;
