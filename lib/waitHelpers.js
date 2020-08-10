const { ExpectedConditions: EC } = protractor;
const DEFAULT_TIMEOUT = 3000;

async function waitElementVisible({ element, timeout = DEFAULT_TIMEOUT }) {
    return browser.wait(EC.visibilityOf(element), timeout);
}

async function waitElementNotVisible({ element, timeout = DEFAULT_TIMEOUT }) {
    return browser.wait(EC.not(EC.visibilityOf(element)), timeout);
}

module.exports = {
    waitElementVisible,
    waitElementNotVisible,
};
