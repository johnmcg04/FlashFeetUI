var webdriver = require('selenium-webdriver');
var chai = require("chai");
var expect = chai.expect;



describe('Login Page', function() {
    this.timeout(50000); // Set timeout to 5 seconds
    var driver;
    var page;

    

    it('should have the correct title', async function(){

        driver = new webdriver.Builder().forBrowser('chrome').build();
        page = await driver.get('http://localhost:3000/login'); 
        const title = await driver.getTitle();
        expect(title).to.equal('Login'); 
    });

    it('should allow user to login with valid credentials', async function() {
        const usernameInput = await driver.findElement(webdriver.By.id('username')); 
        const passwordInput = await driver.findElement(webdriver.By.id('password')); 
        const loginButton = await driver.findElement(webdriver.By.id('login')); 

        await usernameInput.sendKeys('dummy');
        await passwordInput.sendKeys('password');
        await loginButton.click();

        // Wait for the page to load
        await driver.wait(webdriver.until.urlContains('/jobroles'), 5000);

        // Check that the current URL contains '/jobroles'
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/jobroles');
    });

    after(async function() {
        await driver.quit();
    });
});
