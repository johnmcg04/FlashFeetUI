var webdriver = require('selenium-webdriver');
var chai = require("chai");
var expect = chai.expect;


it('should have the correct title', async function(){
    driver = new webdriver.Builder().forBrowser('chrome').build();
    page = await driver.get('http://localhost:3000/login'); 
    const title = await driver.getTitle();
    expect(title).to.equal('signup'); 
});

it('should redirect to kainos twitter page when user clicks on the twitter icon', async function() {
    page = await driver.get('http://localhost:3000/login'); 
    const twitterIcon = await driver.findElement(webdriver.By.id('twitterIcon')); 

    await twitterIcon.click();

    // Wait for the page to load
    await driver.wait(webdriver.until.urlContains('twitter.com/KainosSoftware/'), 5000);

    // Check that the current URL contains the correct URL
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('twitter.com/KainosSoftware/');
});

it('should redirect to kainos facebook page when user clicks on the facebook icon', async function() {
    page = await driver.get('http://localhost:3000/login'); 
    const facebookIcon = await driver.findElement(webdriver.By.id('facebookIcon')); 

    await facebookIcon.click();

    // Wait for the page to load
    await driver.wait(webdriver.until.urlContains('https://www.facebook.com/KainosSoftware/'), 5000);

    // Check that the current URL contains the correct URL
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('https://www.facebook.com/KainosSoftware/');
});

it('should redirect to kainos linkedin page when user clicks on the linkedin icon', async function() {
    page = await driver.get('http://localhost:3000/login'); 
    const linkedinIcon = await driver.findElement(webdriver.By.id('linkedinIcon')); 

    await linkedinIcon.click();

    // Wait for the page to load
    await driver.wait(webdriver.until.urlContains('https://www.linkedin.com/company/kainos/'), 5000);

    // Check that the current URL contains the correct URL
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('https://www.linkedin.com/company/kainos/');
});

it('should redirect to kainos page when user clicks on the kainos.com link', async function() {
    page = await driver.get('http://localhost:3000/login'); 
    const kainosLink = await driver.findElement(webdriver.By.id('kainosLink')); 

    await kainosLink.click();

    // Wait for the page to load
    await driver.wait(webdriver.until.urlContains('www.kainos.com'), 5000);

    // Check that the current URL contains '/signup'
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('kainos.com');
});