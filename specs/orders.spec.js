const log = require('log4js').getLogger('spec-logger');
const { MainPage } = require('../lib/ui/elements');

describe('orders feature', () => {
    beforeAll(async () => {
        log.info('setup before test');
        await browser.waitForAngularEnabled(false);

        this.mainPage = new MainPage();
    });

    beforeEach(async () => {
        await this.mainPage.open();
    });

    it('should allow to create an order', async () => {
        const searchRestaurantPage = await this.mainPage
            .findRestaurants({ address: '8888', selectOption: '8888 Alpha' });

        expect(await searchRestaurantPage.getRestaurantsCount())
            .toBeGreaterThan(0, 'did not find any restaurants on the restaurants page');

        const testRestaurant = await searchRestaurantPage.selectRestaurant({ name: 'TEST Restaurant Selenium' });
        await testRestaurant.addItem({ name: 'Salami' });

        const orderDetailsPage = await testRestaurant.placeOrder();
        const summaryPage = await orderDetailsPage.processOrder({
            where: { address: 'main street 2415', postcode: '8888AA', city: 'Enschede' },
            who: { name: 'TestUSer', email: 'testuser@test.test', phone: '1234567890' },
            when: { time: 'asap' },
            payment: { type: 'cash', details: { amount: 'closest' } },
        });

        expect(summaryPage.getOrderReference()).toMatch(/[A-Z0-9]{6}/,
            'order reference should contains 6 alpha-numeric characters');
    });

    it('case 2', async () => {
        await browser.sleep(3000);

        const searchRestaurantPage = await this.mainPage
            .findRestaurants({ address: '8888', selectOption: '8888 Alpha' });

        const testRestaurant = await searchRestaurantPage.selectRestaurant({ name: "Maarten's Pannenkoeken" });
        await testRestaurant.addItem({ name: 'Ham' });

        const orderDetailsPage = await testRestaurant.placeOrder();

        const summaryPage = await orderDetailsPage.processOrder({
            where: { address: 'main street 2415', postcode: '8888AA', city: 'Enschede' },
            who: { name: 'TestUSer', email: 'testuser@test.test', phone: '1234567890' },
            when: { time: 'asap' },
            payment: { type: 'cash' },
        });

        expect(summaryPage.getOrderReference()).toMatch(/[A-Z0-9]{6}/,
            'order reference should contains 6 alpha-numeric characters');
    });
});
