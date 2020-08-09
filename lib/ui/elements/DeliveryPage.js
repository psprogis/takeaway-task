const log = require('log4js').getLogger('delivery-page');

const { ExpectedConditions: EC } = protractor;

class DeliveryPage {

    // can be filled with Promise.all, but in this case it will be more user-like to go through each field step by step
    async fillInForm({ where, who, when }) {
        const addressInput = $('input#iaddress');
        await browser.wait(EC.visibilityOf(addressInput), 3000);

        log.info('fill in delivery form...');

        await addressInput.sendKeys(where.address);
        await $('input#ipostcode').sendKeys(where.postcode);
        await $('input#itown').sendKeys(where.city);
        await $('input#isurname').sendKeys(who.name);
        await $('input#iemail').sendKeys(who.email);
        await $('input#iphonenumber').sendKeys(who.phone);

        // TODO: extract to Dropdown class
        if (when.time !== 'asap') {
            throw new Error('when.time can be asap only, other options are not supported');
        }

        const dropDown = $('select#ideliverytime');
        await dropDown.click();
        await dropDown.$('[value="asap"]').click();
    }

    // await $('.checkout-orderbutton-btn input').click();
}

module.exports = DeliveryPage;
