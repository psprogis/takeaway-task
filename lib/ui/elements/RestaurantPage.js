const log = require('log4js').getLogger('restaurant-page');

const DeliveryPage = require('./DeliveryPage');

class RestaurantPage {

    constructor({ name }) {
        log.info(`creating page for the restaurant: ${name}`);
        this.name = name;

        // TODO: create Basket class (editItem, addItem, etc.)
        // this.basket = new Basket();
    }

    async placeOrder() {
        await $('.basket-container button.basket__order-button').click();

        return new DeliveryPage();
    }

    // TODO: add category
    async addItem({ name }) {
        // save mapping item name -> id, e.g. "Salami": "QON30PNRN" ?
        // it will work only for permanent ids
        // as of now click first found item
        return $$(`[data-product-name=${name}]`).get(0).click();
    }

    /* eslint-disable-next-line no-unused-vars */
    async addItems({ items }) {
        throw new Error('not implemented');
    }
}

module.exports = RestaurantPage;
