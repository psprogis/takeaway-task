// small examples of steps, it can be improved for sure
// here steps are used only to show mode details in allure report

const { MainPage } = require('../elements');

const findRestaurant = allure.createStep('find all restaurants from the main page',
    async ({ address, selectOption, name }) => {
        const searchRestaurantPage = await (new MainPage()).findRestaurants({ address, selectOption });
        return searchRestaurantPage.selectRestaurant({ name });
    });

const placeOrder = allure.createStep('placing order in the restaurant',
    async ({ restaurant, itemName }) => (await restaurant.addItem({ name: itemName })).placeOrder());

const processOrder = allure.createStep('processing order...', async ({ orderPage, orderDetails }) => {
    const summaryPage = await orderPage.processOrder(orderDetails);

    return summaryPage.getOrderReference();

});

module.exports = {
    findRestaurant,
    placeOrder,
    processOrder,
};
