# Takeaway test task

**Table of Contents**

## Notes
Since I have only 1 day (Sunday) for this task and few hours during the week, I have to choose some
workarounds/quick fixes instead of production ready solutions, some features are unstable and require more time for investigation.

- scenario: the whole scenario is pretty big and should be splitted into small tests for each page. Case1 and case2 looks identical.
- test framework: protractor@7.0.0. In case I have more time, I would like to try webdriver.io.
  cypress/puppeteer - are good for the integration tests, but these 2 cases looks more like long and heavy e2e tests
  and should be run with selenium based wrapper.
  codeception.js - do not like this framework, it blocks your creativity and forces you to use silly syntax with
  I.doSomething, but what if it is not I, but mongoService, profilesService, helper classes, whatever.
- protractor is installed globally just for this example, usually it is a part of the test container (with webdriver-manager)
- components library requires time, at least 2-3 weeks to create all fragments/elements: dropdowns, inputs, more complex widget, etc.
  it can be our own solution, or we can use some popular library, e.g. [Page Fragments](https://github.com/Xotabu4/protractor-element-extend)
  as a quick fix I created only high level classes, it should be fixed in the future.
- test structure:
- "Language of the webpage does not matter (you can use English or Dutch)" - verified in chrome for both English and Dutch, works ok,
  pages have lots of ids so it is easy to find elements. 
- reporting: jasmine supports a lot of reporters, I added only spec-reporter, but there are custom-reporters package.
  Visual reporting: very easy choice, since there are no alternatives, Allure Report is a standard de-facto in the industry.
  Results will be generated after each `npm t<:capability>` run, to generate html report run `npm run report`.
  See screenshot below.
- "Documentation in code" - good code should we self explaining, also I have some comments and TODOs.
  In real project I used  jsdocs. 
- since it is non-angular site some additional "waitFor" calls required.
- some selectors should be improved.
- "Static data should be read from file" - I'm not sure that I understand correctly, what data should be read from file...
  - selectors - bad idea, selector should inside elements/fragments classes.
  - input data - 50/50. sometimes it might be good, e.g. in case of gigantic inputs. But in general test data (input data)
    should be as close to test as possible, in this case it is easy to read and understand the test scenario.
    Anyway I created data directory and it can be required in the test, it has orders data, but I didn't used it:)
- "Coverage of functional scenarios, including corner cases" - it is the only requirement I didn't understand completely:
  - code coverage (istambul, jacoco, etc.) ? - it should be done during unit tests. I guess Drill4j already has UI support.
  - requirements coverage - I do not have any functional requirements for the site. But it is obvious that those 2 cases
    do not cover all possible scenarios, nagative cases, etc.
- storing images/screenshot inside git repository is more or less ok for this small example.

## Todo
- cleanup specs (add steps ?)
- use [cross-env](https://www.npmjs.com/package/cross-env) module in npm scripts
- add video record with my own ffmpeg-reporter
- use `NODE_PATH` variable to avoid relative paths
  
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

## How to run (basic setup with chrome)
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

## Multiple/different browser setup
The easiest way to run test(s) with multiple/different browser(s) in the same time is to change `capabilities` or
`multiCapabilities` in protractor config and use local browsers (do not forget to run webdriver-manager update before).
I guess I do not want to connect to local browser (for example I have only firefox nightly installed and do not want to
download and install stable version), so the best solution will be to use [Seleniod](https://aerokube.com/selenoid/).
 Steps how to use selenoid locally are described below.
 
Previous solution is good just to play around, for some local runs, etc. Here are some possible solutions for the
production testing:
  - deploy cluster of Selenoids in AWS or other cloud provider and manage it ourselves.  
  - if we have more money - [Moon](https://aerokube.com/moon/) can be used.
  - if we have plenty of money and want to waste them all - BrowserStack and other alternatives can be used

**please  note:** tests pass successfully only in chrome, I see that there are some issues with firefox and chrome-headless,
but I need more time to debug and fix them.
 
Here are the list of supported configurations:

`npm t`
```
{
    browserName: 'chrome',
    enableVNC: true,
    version: '',
    platform: 'ANY',
}
```

`npm run test:firefox`

```
{
    browserName: 'firefox',
    enableVNC: true,
    'moz:firefoxOptions': {
        prefs: {
            'geo.enabled': false,
        },
    },
},
```

`npm run test:headless-chrome`

```
{
    browserName: 'chrome',
    chromeOptions: {
        args: ['--headless', '--disable-gpu', '--window-size=1600,1200'],
    },
},
```

`npm run test:multiple`

```
multiCapabilities: [
    {
        browserName: 'chrome',
    },
    {
        browserName: 'firefox',
    },
],
```
### How to start selenoid locally  
- make sure docker is installed and running on your machine.
- download and start `cm` utility, see [official instructions] (https://aerokube.com/cm/latest/) or download binary from the
[release page](https://github.com/aerokube/cm/releases). During the first run it will download all necessary browser images.
Run docker images to double check:
![cm selenoid start and docker images output](screenshots/cm-start.png "cm selenoid start and docker images output")

You can download additional browser versions if needed.
- start `selenoid-ui`:
```bash
.\cm selenoid-ui start
```
2 containers should run now:
![docker dashboard](screenshots/docker-containers-running.png "docker dashboard")

- no need to update test configs, by default tests endpoint is `http://localhost:4444/wd/hub`.
  Check status:
  - `http://localhost:4444/status`
  - docker ps
  - open UI: `http://localhost:8080/`
  ![selenoid ui](screenshots/selenoid-ui.png "selenoid-ui")

- run your tests
    - chrome run
    ![chrome run](screenshots/chrome-run.png "chrome run")
    - 2 browsers run
    ![multiple run](screenshots/multiple-run.png "multiple run")

[more details](https://aerokube.com/selenoid/latest/)

## Test report
