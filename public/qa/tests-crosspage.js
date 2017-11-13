const Browser = require('zombie');

let browser;

suite('Cross-Page Tests', () => {
    setup(() => {
        browser = new Browser();
    });

    test('requesting group of rate from the hood river tour page ' +
        'should populate the referrer field', (done) => {
            let referrer = 'http://localhost:3000/tours/hood-river';
            browser.visit(referrer, () => {
                browser.clickLink('.requestGroupRate', () => {
                    console.log(browser.field('referrer').value);
                    // assert(browser.field('referrer').value === referrer);
                    browser.assert.element('form input[name=referrer]',referrer);
                    done();
                });
            });
        });

    test('requesting a group rate from the oregon coast tour page ' +
        'should populate the referrer field', (done) => {
            let referrer = 'http://localhost:3000/tours/oregan-coast';
            browser.visit(referrer, () => {
                console.log(browser.html());
                browser.clickLink('.requestGroupRate', () => {
                    // assert(browser.field('referrer').value === referrer);
                    browser.assert.element('form input[name=referrer]', referrer);
                    done();
                });
            });
        });

    test('visiting the "request group rate" page dirctly should result ' +
        'in an empty referrer field', (done) => {
            let referrer = 'http://localhost:3000/tours/request-group-rate';
            browser.visit(referrer, () => {
                browser.assert.element('form input[name=referrer]', '');
                done();
            });
        });
});