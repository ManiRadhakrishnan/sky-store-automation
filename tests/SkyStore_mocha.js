var webdriver = require('selenium-webdriver');
var fs = require('fs');
var data = require('nconf');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

//Read Data Json file
data.file({ file: './testdata/data.json' });

// Enabling the Chrome Webdriver
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build(); 

//Error Handling
webdriver.promise.controlFlow().on('uncaughtException', function(e) {
console.error('Unhandled error: ' + e);
//driver.quit();
});

/**************************************************************************

Suite : Launch Sky Store Page Successfully

Functions : Ensure that Sky Store is Launched Sussfully

****************************************************************************/


describe("Launch Sky Store Page Successfully:", function() { 
    
before(function(done) 
{
   driver.get('http://www.skystore.com').then(function() 
   {
    //console.log("Launch http://www.skystore.com");
    done();
    });  
});


it("Ensure Sky Welcome page is displayed", function (done) {
    driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === 'Welcome ~ Sky Store';
     });
    }, 10000);

    driver.getTitle().then(function(value) {
          assert.equal(value, 'Welcome ~ Sky Store');
          driver.takeScreenshot().then(function(base64Data){fs.writeFileSync("./results/Welcome_Page.png", base64Data, 'base64')});
          done();
        });
});

after(function(done) {
    // works with promise
    //driver.quit().then(done);
    done();
});

});


/**************************************************************************

Suite : Sign Up Form Tests

Functions : 1.) Navigate to SignUp Page
            2.) Ensure error Message is displayed >> When SingUp form is blank
            3.) Ensure error Message is displayed >> When Email is incorrect

****************************************************************************/

describe("Sign Up Form Tests:", function() { 
   
before(function(done) 
{
    done();
});


it("After click on SignUp button, Check SignUp Page is displayed:", function(done) {
driver.sleep(4000);

driver.findElement(webdriver.By.xpath('//button[text()="Sign up"]')).click();
    driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
       return title === 'Sky - Sign up';
     });
    }, 10000);

    driver.getTitle().then(function(value) {
          assert.equal(value, 'Sky - Sign up', "Successfully navigated to SignUp Page");
          done();
        });
});


it("Singup Form : submit with blank fields >> Error message should be displayed", function(done){
driver.findElement(webdriver.By.id("submitButton")).click().then(function(){done();});
});


it("Signup Form : Incorrect email id >> Error message should be displayed ", function(done){
driver.sleep(4000);
driver.findElement(webdriver.By.id("firstname")).sendKeys(data.get("FirstName"));
driver.findElement(webdriver.By.id("lastname")).sendKeys(data.get("LastName"));
driver.findElement(webdriver.By.id("email")).sendKeys(data.get("Email"));
driver.findElement(webdriver.By.id("confirmEmail")).sendKeys(data.get("ConfirmEmail"));
driver.findElement(webdriver.By.id("username")).sendKeys(data.get("Username"));
driver.findElement(webdriver.By.id("password")).sendKeys(data.get("Password"));
driver.findElement(webdriver.By.id("confirmPassword")).sendKeys(data.get("ConfirmPassword"));
driver.findElement(webdriver.By.id("termsAndConditions")).click();
driver.findElement(webdriver.By.id("submitButton")).click();
driver.findElement(webdriver.By.id("cancelButton")).click().then(function(){done();});

//driver.sleep(5000);

//driver.findElement(webdriver.By.css("SPAN.validationIcon")).click();

//driver.findElement(webdriver.By.css("DIV.defaultBubble.firstnameError.visible")).isElementPresent().then(function(check){
 //console.log(check);
 //done();
//});
 });

after(function(done) {
    // works with promise
    //driver.quit().then(done);
    done();
});

});
/**************************************************************************

Suite : Navigate to all Menus 

Functions : 1.) Verify New Releases section
            2.) Verify Offers section
            3.) Verify Family section
            4.) Verify Comedy section
            5.) Verify Action section
            6.) Verify Thriller section
            7.) Verify Sc-Fi section

****************************************************************************/

describe("Verify all Menu sections", function() { 

before(function(done) 
{
    done();
});


it("Verify New Releases section", function(done){
 driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === 'Most Popular ~ Sky Store';
     });
    }, 10000);

should.exist(driver.findElement(webdriver.By.linkText("New Releases")));

driver.findElement(webdriver.By.linkText("New Releases")).click();
 driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === 'New Releases ~ Sky Store';
     });
    }, 10000);
 driver.sleep(2000);
should.exist(driver.findElement(webdriver.By.css("h1.ng-binding:nth-child(2)")));
driver.findElement(webdriver.By.id("browse-packshot-item-bg-0")).click();
driver.sleep(1500);
should.exist(driver.findElement(webdriver.By.css("SPAN.global-button-small-bg.product-action-button-bg.ng-binding")));
driver.getTitle().then(function() {
      done();
    });
});


it("Verify Offers section", function(done){
  driver.sleep(1000);
   driver.findElement(webdriver.By.linkText("Offers")).click();
   driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === '99p/€1.49 Movies ~ Sky Store';
     });
    }, 10000);
   driver.sleep(2000);
should.exist(driver.findElement(webdriver.By.css("h1.ng-binding:nth-child(2)")));
driver.findElement(webdriver.By.id("browse-packshot-item-bg-0")).click();
driver.sleep(1500);
should.exist(driver.findElement(webdriver.By.css("SPAN.global-button-small-bg.product-action-button-bg.ng-binding")));
driver.getTitle().then(function() {
      done();
    });
});


it("Verify Family section", function(done){
  driver.sleep(1000);
   driver.findElement(webdriver.By.linkText("Family")).click();
   driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === 'Family ~ Sky Store';
     });
    }, 10000);
   driver.sleep(1500);
should.exist(driver.findElement(webdriver.By.css("h1.ng-binding:nth-child(2)")));
driver.findElement(webdriver.By.id("browse-packshot-item-bg-0")).click().then(function(){done();});
});


it("Verify Comedy section", function(done){
  driver.sleep(3000);
   driver.findElement(webdriver.By.linkText("Comedy")).click();
   driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === 'Comedy ~ Sky Store';
     });
    }, 10000);
   driver.sleep(1500);
should.exist(driver.findElement(webdriver.By.css("h1.ng-binding:nth-child(2)")));
driver.findElement(webdriver.By.id("browse-packshot-item-bg-0")).click().then(function(){done();});
});



it("Verify Action section", function(done){
 driver.sleep(3000);
   driver.findElement(webdriver.By.linkText("Action")).click();
   driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === 'Action ~ Sky Store';
     });
    }, 10000);
   driver.sleep(1500);
should.exist(driver.findElement(webdriver.By.css("h1.ng-binding:nth-child(2)")));
driver.findElement(webdriver.By.id("browse-packshot-item-bg-0")).click().then(function(){done();});
});


it("Verify Thriller section", function(done){
 driver.sleep(3000);
   driver.findElement(webdriver.By.linkText("Thriller")).click();
   driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === 'Thriller ~ Sky Store';
     });
    }, 10000);
   driver.sleep(1500);
should.exist(driver.findElement(webdriver.By.css("h1.ng-binding:nth-child(2)")));
driver.findElement(webdriver.By.id("browse-packshot-item-bg-0")).click().then(function(){done();});
});

it("Verify Sci-Fi section", function(done){
 driver.sleep(3000);
   driver.findElement(webdriver.By.linkText("More...")).click();
    driver.sleep(1000);
   driver.findElement(webdriver.By.linkText("Sci-Fi")).click();
   
   driver.wait(function() {
     return driver.getTitle().then(function(title) {
        //console.log(title);
        //return assert.equal(title, 'Welcome ~ Sky Store')
       return title === 'Sci-Fi ~ Sky Store';
     });
    }, 10000);
   driver.sleep(1500);
should.exist(driver.findElement(webdriver.By.css("h1.ng-binding:nth-child(2)")));
driver.findElement(webdriver.By.id("browse-packshot-item-bg-0")).click().then(function(){done();});
});

after(function(done) {
    // works with promise
    //driver.quit().then(done);
    done();
});
});


/**************************************************************************

Suite : Search for a Movie

Functions : Seach for a given Movie
****************************************************************************/

describe("Verify all Menu sections", function() { 

before(function(done) 
{
    done();
});


it("Search Movie : Search should work fine ", function(done){
driver.sleep(1500);
driver.findElement(webdriver.By.css('DIV.search-field')).click();
driver.findElement(webdriver.By.css('.input-text')).sendKeys(data.get("SearchMovie"));
driver.sleep(1000);
driver.findElement(webdriver.By.css('input.global-search-button')).click();

driver.sleep(3000);
driver.findElements(webdriver.By.css('.search-moviestill-placeholder > img')).then(function(arrMovies){
//console.log(arrMovies);
arrMovies[1].click();
});
driver.sleep(3000);
/*
driver.wait(function() {
 return driver.getTitle().then(function(title) {
  console.log(title);
   return title == 'The Hangover Part III ~ Sky Store';
 });
}, 10000);
*/
driver.findElement(webdriver.By.css('#product-action-watch-trailer > a:nth-child(1) > span:nth-child(2)')).click();
driver.sleep(10000);
driver.navigate().to("https://store.sky.com/product/the-hangover-part-iii/9e11faab-485c-4502-8ec3-0c3bc9f591e8");
driver.sleep(5000);
driver.findElement(webdriver.By.linkText("Home")).click().then(function(){done();});
});

after(function(done) {
    // works with promise
    //driver.quit().then(done);
    done();
});
});




