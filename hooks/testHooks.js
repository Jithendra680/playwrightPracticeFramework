
function registerTestHooks(test) {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`STARTED: ${testInfo.title}`);
        console.log(`Initial URL: ${page.url()}`);
    });

    test.afterEach(async ({}, testInfo) => {
        console.log(
            `RESULT: ${testInfo.title} - ${testInfo.status}`
        );
    });

    test.beforeAll(() => {
        console.log('Test suite started');
    });

    test.afterAll(() => {
        console.log('Test suite completed');
    });
}

module.exports = { registerTestHooks };
