const log = require('log4js').getLogger('generic-dropdown');

class GenericDropdown {
    constructor(selector) {
        this.root = selector;
    }

    async selectOption({ value }) {
        log.info(`select value: ${value}`);

        await this.root.click();
        await this.root.$(`[value="${value}"]`).click();
        await this.root.click();
    }

    async selectByNumber({ number }) {
        log.info(`select value by number: ${number}`);

        await this.root.click();
        await this.root.$$('option').get(number).click();
        await this.root.click();
    }

}

module.exports = GenericDropdown;
