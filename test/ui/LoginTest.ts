var webdriver = require('selenium-webdriver');
var chai = require("chai");
var expect = chai.expect;

describe('Login Page', function() {
    this.timeout(50000); // Set timeout to 5 seconds
    var driver :any;
    var page;

    it('should have the correct title', async() =>{
        driver = new webdriver.Builder().forBrowser('chrome').build();
        page = await driver.get('http://localhost:3000/login'); 
        const title = await driver.getTitle();
        expect(title).to.equal('Login Or Sign Up'); 
    });

    it('should redirect admin to admin menu page with valid credentials', async function() {
        page = await driver.get('http://localhost:3000/login'); 
        const usernameInput = await driver.findElement(webdriver.By.id('username')); 
        const passwordInput = await driver.findElement(webdriver.By.id('password')); 
        const loginButton = await driver.findElement(webdriver.By.id('login')); 

        await usernameInput.sendKeys('JohnsSuperAdmin1');
        await passwordInput.sendKeys('Kainos&Ulster23');
        await loginButton.click();

        // Wait for the page to load
        await driver.wait(webdriver.until.urlContains('/admin-menu'), 5000);

        // Check that the current URL contains '/admin-menu'
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/admin-menu');
    });

    it('should redirect normal user to user menu page with valid credentials', async function() {
        page = await driver.get('http://localhost:3000/login'); 
        const usernameInput = await driver.findElement(webdriver.By.id('username')); 
        const passwordInput = await driver.findElement(webdriver.By.id('password')); 
        const loginButton = await driver.findElement(webdriver.By.id('login')); 

        await usernameInput.sendKeys('User123!');
        await passwordInput.sendKeys('User123!');
        await loginButton.click();

        // Wait for the page to load
        await driver.wait(webdriver.until.urlContains('/menu'), 5000);

        // Check that the current URL contains '/menu'
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/menu');
    });

    it('should redirect to sign up page when user clicks on sign up button', async function() {
        page = await driver.get('http://localhost:3000/login'); 
        const signUpButton = await driver.findElement(webdriver.By.id('SignUp')); 

        await signUpButton.click();

        // Wait for the page to load
        await driver.wait(webdriver.until.urlContains('/signup'), 5000);

        // Check that the current URL contains '/signup'
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/signup');
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
});
