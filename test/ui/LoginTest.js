//const webdriver = require('selenium-webdriver');
const { Builder, By, until } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;


describe("Login Test", () => {
    it("Should display error for non-existent user login", async () => {
        let driver = await new Builder().forBrowser("chrome").build();

        try {
            await driver.get("http://localhost:3000/login");

            await driver.findElement(By.id("username")).sendKeys("nonexistent_user");
            await driver.findElement(By.id("password")).sendKeys("incorrect_password");
            await driver.findElement(By.id("btnLogin")).click();

            let errorMessage;
            try {
                errorMessage = await driver.wait(
                    until.elementLocated(By.css(".alert.alert-danger")),
                    10000,
                    "Error message element not found"
                );
                await driver.wait(
                    until.elementIsVisible(errorMessage),
                    10000,
                    "Error message element not visible"
                );
            } catch (error) {
                throw new Error("Error in locating or waiting for error message");
            }

            let errorMessageText = await errorMessage.getText();

            chai.assert.equal(errorMessageText.trim(), "Error: Could not login");
        } finally {
            await driver.quit();
        }
    }).timeout(30000);

    it("Should successfully log in with valid credentials", async () => {
        const username = process.env.TEST_ACCOUNT_USERNAME;
        const password = process.env.TEST_ACCOUNT_PASSWORD;

        if (!username) {
            throw new Error("TEST_ACCOUNT_USERNAME is not set in the environment variables");
        }

        if (!password) {
            throw new Error("TEST_ACCOUNT_PASSWORD is not set in the environment variables");
        }

        let driver = await new Builder().forBrowser("chrome").build();

        try {
            await driver.get("http://localhost:3000/login");

            await driver.findElement(By.id("username")).sendKeys(username);
            await driver.findElement(By.id("password")).sendKeys(password); 
            await driver.findElement(By.id("btnLogin")).click();

            let currentURL = await driver.getCurrentUrl();
            console.log(currentURL);
            chai.assert.isTrue(currentURL.includes("/jobroles"), "Login not successful. Redirect URL incorrect.");
        } finally {
            await driver.quit();
        }
    }).timeout(25000); 
});

