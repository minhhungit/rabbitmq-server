const {By,Key,until,Builder} = require("selenium-webdriver");
require("chromedriver");
var assert = require('assert');
const {buildDriver, goToHome, captureScreensFor, teardown} = require("../../utils");

var SSOHomePage = require('../../pageobjects/SSOHomePage')
var UAALoginPage = require('../../pageobjects/UAALoginPage')
var OverviewPage = require('../../pageobjects/OverviewPage')

describe("When a logged in user", function() {
  var overview
  var homePage
  var captureScreen

  before(async function() {
    driver = buildDriver()
    await goToHome(driver)
    homePage = new SSOHomePage(driver)
    uaaLogin = new UAALoginPage(driver)
    overview = new OverviewPage(driver)
    captureScreen = captureScreensFor(driver, __filename)
  });

  it("logs out", async function() {
    await homePage.clickToLogin();
    await uaaLogin.login("rabbit_admin", "rabbit_admin");
    await overview.isLoaded()
    await overview.logout()
    await homePage.isLoaded()
  });

  after(async function() {
    await teardown(driver, this, captureScreen)
  });
})
