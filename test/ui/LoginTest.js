const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

describe('Login Page', function() {
    this.timeout(5000); // Set timeout to 5 seconds
    let driver;
    let page;

    before(async function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        page = await driver.get('http://localhost:3000/login'); // Replace with your login page URL
    });

    it('should have the correct title', async function() {
        const title = await driver.getTitle();
        expect(title).to.equal('Login'); // Replace with your login page title
    });

    it('should allow user to login with valid credentials', async function() {
        const usernameInput = await driver.findElement(webdriver.By.id('username')); // Replace with your username input field's id
        const passwordInput = await driver.findElement(webdriver.By.id('password')); // Replace with your password input field's id
        const loginButton = await driver.findElement(webdriver.By.id('login')); // Replace with your login button's id

        await usernameInput.sendKeys('testuser');
        await passwordInput.sendKeys('testpass');
        await loginButton.click();

        const welcomeMessage = await driver.findElement(webdriver.By.id('welcome')).getText(); // Replace with the id of the element showing a welcome message or similar upon successful login
        expect(welcomeMessage).to.include('Welcome, testuser!');
    });

    after(async function() {
        await driver.quit();
    });
});
