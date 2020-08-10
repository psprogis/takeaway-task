const log = require('log4js').getLogger('main-page');

const { ExpectedConditions: EC } = protractor;
const { waitElementVisible } = require('../../browserHelpers');
const SearchRestaurantPage = require('./SearchRestaurantPage');

class MainPage {

    constructor() {
        this.addressInput = $('#imysearchstring');
    }

    async open() {
        // can be changed to a constructor parameter
        const BASE_URL = 'https://www.thuisbezorgd.nl/en/';

        log.info(`opening main page, url: ${BASE_URL}...`);

        await browser.get(BASE_URL);
        return waitElementVisible({ element: this.addressInput });
    }

    async findRestaurants({ address, selectOption }) {
        log.info(`searching restaurants by address: ${address} and select ${selectOption}...`);

        await this.addressInput.clear().sendKeys(address);

        // do not move to constructor, as long as it is used (and encapsulated) in this one method it is ok
        const submitButton = $('#submit_deliveryarea');
        await submitButton.click();

        // TODO: create dropdown class and extract all related logic
        const popupOptions = $('.popupoptions');
        await waitElementVisible({ element: popupOptions });

        const option = element(by.cssContainingText('.popupoptions a', selectOption));

        try {
            await option.click();
        } catch (e) {
            log.error('did not find search element, see message below:');
            log.error(e);

            // TODO: create custom error class(es)
            throw e;
        }

        return new SearchRestaurantPage();
    }
}

module.exports = MainPage;
