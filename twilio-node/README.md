
Sample: bluelist-twilio-node
===

The bluelist-twilio-node sample works with the bluelist-twilio sample to add notifications from the Twilio service. 

This sample works with the Mobile Cloud, an application boilerplate that is available on [IBM Bluemix](https://www.ng.bluemix.net).  With this boilerplate, you can quickly incorporate pre-built, managed, and scalable cloud services into your mobile applications without relying on IT involvement. You can focus on building your mobile applications rather than the complexities of managing the back end infrastructure.

After you run the sample and add some items to the grocery list, you can see your data is synchronized between multiple devices.  Updates to the grocery list will trigger Twilio text notifications to a device based on your Twilio setup.

Downloading this sample
---

You can clone the samples from IBM DevOps Services with the following command:

    git clone https://hub.jazz.net/git/mobilecloud/bluelist-twilio

The bluelist-twilio-node code is the Node.js runtime code used with the bluelist-twilio sample.

Prerequisite's
---
Before you can run the sample you need to install the prerequisite software components.

Download the [Cloud Foundry CLI version 6](https://github.com/cloudfoundry/cli/releases), and choose the installer appropriate for the system from which you will run the CLI.

Running this sample
---

To test the Node.js code you need to have created a Mobile Cloud Boilerplate application with [IBM Bluemix](http://bluemix.net) and you need to make a note of your application id.

### Configuration

You need to modify the ```app.js``` file with your corresponding application id and app route.

```javascript
//change these to your Bluemix application values
var appConfig = {
    applicationId: "<INSERT_APP_ID>",
    applicationRoute: "<INSERT_APP_ROUTE>"
};
```

### Deploy to Bluemix
1. Open a command prompt and go to the directory containing the bluelist-twilio-node code.
```bash
cd <git repository>/bluelist-twilio/bluelist-twilio-node
```
2. Verify the Cloud Foundry CLI is installed.
```bash
cf --version 
```
3. Log in to Bluemix from the CLI
```bash
cf login -a https://ace.ng.bluemix.net
```
4. Push (upload) the bluelist-twilio-node application up to the Bluemix Node.js runtime.
```bash
cf push ${yourAppName} -p . -m 512M
```