# Takeaway test task

##Todo
- add helper for scroll and click
- cleanup specs (add steps ?)
- add allure.feature, allure.story
- create Dropdown class

##Notes
Since I have only 1 day (Sunday) for this task and few hours during the week, I have to choose some
workarounds/quick fixes instead of production ready solutions:

- test framework: protractor@7.0.0. In case I have more time, I would like to try webdriver.io.
  cypress/puppeteer - are good for the integration tests, but these 2 cases looks more like long and heavy e2e tests
  and should be run with selenium based wrapper.
  codeception.js - do not like this framework, it blocks your creativity and forces you to use silly syntax with
  I.doSomething, but what if it is not I, but mongoService, profilesService, helper classes, whatever.
- protractor is installed globally just for this example, usually it is a part of the test container (with webdriver-manager)
- selectors should be improved
- components library requires time, at least 2-3 weeks to create all fragments/elements: dropdowns, inputs, more complex widget, etc.
  it can be our own solution, or we can use some popular library, e.g. [Page Fragments](https://github.com/Xotabu4/protractor-element-extend)
  as a quick fix I created only high level classes, it should be fixed in the future.
- scenario: the whole scenario is pretty big and should be splitted into small tests for each page. Case1 and case2 looks identical.
- test structure:
- reporting:
- multibrowser support:
  - in the current task I tried multiCapabilities in protractor config + local browsers, the easies way
  - but in the real production testing selenoid should be used
  - or if we have some money - moon
  - or we can waste tones of money and use browser stack and similar solutions
- jsdocs 
- since it is non-angular site some additional waitFor call required
  
## Preconditions/Environment
* install protractor globally
```bash
npm i -g protractor
```
* Test should work on any linux/unix (CentOS, RedHat, Fedora, etc.) and Windows 10 (start from GitBash)
* node.js version v12.18.1 (or higher)
```bash
node -v
v12.18.1
```
* npm version 6.14.5. (package lock will be ignored with npm v less than 5)
```bash
npm -v
6.14.5
```
* webdriver-manager (installed with protractor), run `webdriver-manager update` to get the latest versions of drivers
```bash
npm ls -g webdriver-manager
/usr/local/lib
└─┬ protractor@7.0.0
  └── webdriver-manager@12.1.7

# status after update
webdriver-manager status
[12:02:16] I/status - selenium standalone version available: 3.141.59 [last]
[12:02:16] I/status - chromedriver version available: 84.0.4147.30 [last]
[12:02:16] I/status - geckodriver version available: v0.27.0 [last]
[12:02:16] I/status - IEDriverServer is not present
[12:02:16] I/status - android-sdk is not present
[12:02:16] I/status - appium is not present
```
* Start selenium server
```bash
webdriver-manager start
``` 

## How to run
* Clone repo
* Install dependencies (`npm i`)
* Run test (`npm t`)
* Open html report (```npm run report```)
```bash
git clone <path to repo>
# ...
cd takeaway-test/
npm i
# ...
npm t
# ...
npm run report
# ...
Report successfully generated to allure-report
Starting web server...
# ...
```