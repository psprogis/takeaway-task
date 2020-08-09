const log = require('log4js').getLogger('restaurants-p');

const { ExpectedConditions: EC } = protractor;
const RestaurantPage = require('./RestaurantPage');

class RestaurantsPage {

    constructor() {
        this.restaurantsList = $('#irestaurantlist');
    }

    async getRestaurantsCount() {
        await browser.wait(EC.visibilityOf(this.restaurantsList), 3000);

        // TODO: fix locator
        return $$('#irestaurantlist .restaurant').count();
    }

    async selectRestaurant({ name }) {
        // TODO: scroll into view
        // save mapping restaurant name -> id, e.g. "TEST Restaurant Selenium": "Q0ONNOO" ?
        // it will work only for permanent ids
        const restaurantRow = element(by.cssContainingText('a.restaurantname', name));

        log.info(`selecting restaurant: ${name}`);
        await browser.wait(EC.visibilityOf(restaurantRow), 3000);
        await restaurantRow.click();

        return new RestaurantPage({ name });
    }
}

module.exports = RestaurantsPage;
