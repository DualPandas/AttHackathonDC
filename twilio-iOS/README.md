Sample: bluelist-twilio-iOS
===

The bluelist-twilio-iOS sample builds upon the bluelist-mobiledata-iOS sample to add notifications using the Twilio service.

This sample works with the Mobile Cloud, an application boilerplate that is available on [IBM Bluemix](https://www.ng.bluemix.net).  With this boilerplate, you can quickly incorporate pre-built, managed, and scalable cloud services into your mobile applications without relying on IT involvement. You can focus on building your mobile applications rather than the complexities of managing the back end infrastructure.

After you run the sample and add some items to the grocery list, you can see your data is synchronized between multiple devices.  Updates to the grocery list will trigger Twilio text notifications to a device based on your Twilio setup.

Creating the Mobile Cloud boilerplate application
---
1. Login to [IBM Bluemix](https://www.bluemix.net)
2. Click 'Catalog' or 'Create An App'
3. Under Boilerplates, select Mobile Cloud.
4. Enter in App Info & select 'Create'
5. You now have a mobile cloud backend, providing you with some mobile services on the cloud!

Downloading this sample
---

You can clone the samples from IBM DevOps Services with the following command:

    git clone https://hub.jazz.net/git/mobilecloud/bluelist-twilio

The bluelist-twilio-iOS sample will be located within the bluelist-twilio directory you just created.

The bluelist-twilio-node code is the Node.js runtime code used with the bluelist-twilio-iOS sample.

Downloading the Dependencies
---

You can now download the dependencies for this sample using cocoapods!
This will enable you to skip the SDK download instructions in the article below.

First, install CocoaPods using the following command:

      sudo gem install cocoapods

Next, go to the folder containing the bluelist-twilio-iOS sample.  Then, install the
dependencies listed in your podfile using the following command:

      pod install

Keep in mind that when using cocoapods, you must use the app's .xcworkspace file, and not
the .xcodeproj file. This file will be generated on pod install.

Adding Node.js app to Project
---

This project utilizes a node.js application to send the twilio notification to your phone.
You will need to push this application to the Mobile Cloud backend/boilerplate you created earlier, using cf commands.
To do this, you'll need to ensure you have Cloud Foundry command line interface installed.

First, go into the bluelist-twilio-node directory, and open the app.js file.
Plug in the application id, application route, from number, and to number where requested.

Next, open up the manifest.yml file, and change the host & name to reflect your application's name.

Finally, use the following command from terminal to push your app.

      cf push YourAppNameHere

Your application has now been pushed to your mobile cloud boilerplate!


Running this iOS sample (bluelist-twilio-iOS)
---

You may now open the project's .xcworkspace file (if using cocoapods), and get started!
See the instructions in [Use the Twilio cloud service to add text messaging to Android and iOS apps](http://www.ibm.com/developerworks/library/mo-android-twilio-app/) for more detailed instructions.
Keep in mind, you may skip the steps for downloading the dependencies, as you've already done this using cocoapods.
