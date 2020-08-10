const log = require('log4js').getLogger('restaurants-p');

const { waitElementVisible } = require('../../waitHelpers');
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
        // TODO: scroll into view or use search input
        // save mapping restaurant name -> id, e.g. "TEST Restaurant Selenium": "Q0ONNOO" ?
        // it will work only for permanent ids
        const restaurantRow = element(by.cssContainingText('a.restaurantname', name));

        log.info(`selecting restaurant: ${name}`);
        await waitElementVisible({ element: restaurantRow });
        await restaurantRow.click();

        return new RestaurantPage({ name });
    }
}

module.exports = SearchRestaurantPage;
