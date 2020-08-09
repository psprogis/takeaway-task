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
        const restaurantsPage = await this.mainPage.findRestaurants({ address: '8888', selectOption: '8888 Alpha' });

        expect(await restaurantsPage.getRestaurantsCount())
            .toBeGreaterThan(0, 'did not find any restaurants on the restaurants page');

        const testRestaurant = await restaurantsPage.selectRestaurant({ name: 'TEST Restaurant Selenium' });
        await testRestaurant.addItem({ name: 'Salami' });

        const deliveryPage = await testRestaurant.placeOrder();
        await deliveryPage.fillInForm({
            where: { address: 'main street 2415', postcode: '8888AA', city: 'Enschede' },
            who: { name: 'TestUSer', email: 'testuser@test.test', phone: '1234567890' },
            when: { time: 'asap' },
            payment: { cash: true }, // FIXME
        });

        // select cash payment and closest amount

        // assert order reference number

        await browser.sleep(5000);
    });
});
