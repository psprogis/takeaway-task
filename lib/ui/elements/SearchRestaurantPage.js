const log = require('log4js').getLogger('restaurants-p');

const { waitElementVisible } = require('../../browserHelpers');
const RestaurantPage = require('./RestaurantPage');

class SearchRestaurantPage {

    constructor() {
        this.restaurantsList = $('#irestaurantlist');
    }

    async getRestaurantsCount() {
        await waitElementVisible({ element: this.restaurantsList });

        // TODO: fix locator
        return $$('#irestaurantlist .restaurant').count();
    }

    async selectRestaurant({ name }) {
        // save mapping restaurant name -> id, e.g. "TEST Restaurant Selenium": "Q0ONNOO" ?
        // it will work only for permanent ids
        const restaurantRow = element(by.cssContainingText('a.restaurantname', name));

        log.info(`selecting restaurant: ${name}`);

        // TODO: use search input or scroll before click?
        await waitElementVisible({ element: restaurantRow, timeout: 5000 });
        await restaurantRow.click();

        return new RestaurantPage({ name });
    }
}

module.exports = SearchRestaurantPage;
