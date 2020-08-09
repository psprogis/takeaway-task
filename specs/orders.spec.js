const log = require('log4js').getLogger('spec-logger');
const { MainPage } = require('../lib/ui/elements');

describe('orders feature', () => {
    beforeAll(async () => {
        log.info('setup before test');
        await browser.waitForAngularEnabled(false);

        this.mainPage = new MainPage();
        await this.mainPage.open();
    });

    it('should allow to create an order', async () => {
        const searchRestaurantPage = await this.mainPage
            .findRestaurants({ address: '8888', selectOption: '8888 Alpha' });

        expect(await searchRestaurantPage.getRestaurantsCount())
            .toBeGreaterThan(0, 'did not find any restaurants on the restaurants page');

        const testRestaurant = await searchRestaurantPage.selectRestaurant({ name: 'TEST Restaurant Selenium' });
        await testRestaurant.addItem({ name: 'Salami' });

        const deliveryPage = await testRestaurant.placeOrder();
        await deliveryPage.processOrder({
            where: { address: 'main street 2415', postcode: '8888AA', city: 'Enschede' },
            who: { name: 'TestUSer', email: 'testuser@test.test', phone: '1234567890' },
            when: { time: 'asap' },
            payment: { type: 'cash' },
        });

        // assert order reference number

        await browser.sleep(5000);
    });

    xit('test', async () => {
        await browser.get('https://www.thuisbezorgd.nl/en/checkout-order-qa-restaurant-selenium');

        await browser.sleep(2000);

        $('#iremarks').sendKeys('tesing');

        const payment = await $('.paymentbuttonwrapper.payment-method-type-online.paymentmethod3');
        await browser.executeScript('arguments[0].scrollIntoView(true)', payment);

        await browser.sleep(2000);
        await payment.click();

        await browser.sleep(5000);
    }, 5 * 60 * 1000);
});
