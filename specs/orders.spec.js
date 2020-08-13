const log = require('log4js').getLogger('spec-logger');
const { MainPage } = require('../lib/ui/elements');
const { setNonAngularSite } = require('../lib/browserHelpers');

// steps for the second example/approach
const { findRestaurant, placeOrder, processOrder } = require('../lib/ui/steps');

describe('orders feature', () => {

    beforeAll(async () => {
        log.info('setup before test');
        await setNonAngularSite();

        const BASE_URL = 'https://www.thuisbezorgd.nl/en/';
        // const BASE_URL = 'https://www.thuisbezorgd.nl/'; // will work in Dutch language also, can be moved to config
        this.mainPage = new MainPage(BASE_URL);
    });

    beforeEach(async () => {
        allure.feature('ABC-555: orders'); // some feature code and/or description

        await this.mainPage.open();
    });

    it('should allow to create an order with cash payment, closest amount', async () => {
        allure.story('STORY-111: user should be able to order food');

        // the whole test also can be written in "fluent style", with only chaining, e.g.
        // in this case most of the methods should return 'this', for the chaining
        // but in this case we do not see navigation and mediator pages
        // await this.mainPage
        //     .findRestaurants({ address: '8888', selectOption: '8888 Alpha' });
        //     .selectRestaurant({ name: 'TEST Restaurant Selenium' });
        //     .addItem({ name: 'Salami' })
        //     .placeOrder();
        //     .processOrder({...});

        const searchRestaurantPage = await this.mainPage
            .findRestaurants({ address: '8888', selectOption: '8888 Alpha' });

        expect(await searchRestaurantPage.getRestaurantsCount())
            .toBeGreaterThan(0, 'did not find any restaurants on the restaurants page');

        const testRestaurant = await searchRestaurantPage.selectRestaurant({ name: 'TEST Restaurant Selenium' });
        const orderDetailsPage = await (await testRestaurant.addItem({ name: 'Salami' })).placeOrder();

        const summaryPage = await orderDetailsPage.processOrder({
            where: { address: 'main street 2415', postcode: '8888AA', city: 'Enschede' },
            who: { name: 'TestUSer', email: 'testuser@test.test', phone: '1234567890' },
            when: { time: 'asap' },
            payment: { type: 'cash', details: { amount: 'closest' } },
        });

        expect(summaryPage.getOrderReference()).toMatch(/[A-Z0-9]{6}/,
            'order reference should contains 6 alpha-numeric characters');
    });

    it('should allow to create an order with cash payment, exact amount', async () => {
        allure.story('STORY-222: user should be able to order food (some additional descrition goes here)');
        allure.severity(allure.severity.CRITICAL);

        // another approach using allure steps
        // it requires +1 abstraction layer with DSL/step functions, but allure report will contain more details
        const testRestaurant = await findRestaurant({
            address: '8888',
            selectOption: '8888 Alpha',
            name: "Maarten's Pannenkoeken",
        });

        const orderDetailsPage = await placeOrder({ restaurant: testRestaurant, itemName: 'Ham' });

        const orderReferenceNumber = await processOrder({
            orderPage: orderDetailsPage,
            orderDetails: {
                where: { address: 'main street 2415', postcode: '8888AA', city: 'Enschede' },
                who: { name: 'TestUSer', email: 'testuser@test.test', phone: '1234567890' },
                when: { time: 'asap' },
                payment: { type: 'cash' },
            },
        });

        expect(orderReferenceNumber).toMatch(/[A-Z0-9]{6}/,
            'order reference should contains 6 alpha-numeric characters');
    });
});
