const { ExpectedConditions: EC } = protractor;

async function waitReady({ element, timeout = 3000 }) {
    await browser.wait(EC.visibilityOf(element), timeout);
}

async function waitToDisappear({ element, timeout }) {
    await browser.wait(EC.not(EC.visibilityOf(element)), timeout);
}

module.exports = {
    waitReady,
    waitToDisappear,
};
