const log = require('log4js').getLogger('main-page');

const { waitElementVisible, deleteAllCookies } = require('../../browserHelpers');
const SearchRestaurantPage = require('./SearchRestaurantPage');

class MainPage {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.addressInput = $('#imysearchstring');
    }

    async open() {
        log.info(`opening main page, url: ${this.baseUrl}...`);

        await deleteAllCookies();

        await browser.get(this.baseUrl);
        return waitElementVisible({ element: this.addressInput });
    }

    async findRestaurants({ address, selectOption }) {
        log.info(`searching restaurants by address: ${address} and select ${selectOption}...`);

        await this.addressInput.clear().sendKeys(address);

        // do not move to constructor, as long as it is used (and encapsulated) in this one method it is ok
        const submitButton = $('#submit_deliveryarea');
        await submitButton.click();

        // TODO: create SearchDropdown class and extract all related logic
        const popupOptions = $('.popupoptions');
        await waitElementVisible({ element: popupOptions, timeout: 4000 });

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
