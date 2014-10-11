Sample: bluelist-twilio-android
===

The bluelist-twilio-android sample builds upon the bluelist-mobiledata-android sample to add notifications using the Twilio service.

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

The bluelist-twilio-android sample will be located within the bluelist-twilio directory you just created.

The bluelist-twilio-node code is the Node.js runtime code used with the bluelist-twilio-android sample.

Running this sample
---

See the instructions in [Use the Twilio cloud service to add text messaging to Android and iOS apps](http://www.ibm.com/developerworks/library/mo-android-twilio-app/index.html) for more information about how to import this sample into your Android development environment, configure Twilio, and run the sample in a mobile emulator or device.

Alternatively, follow the instructions below:

Dependency Management
---

If using Android Studio, first you will need to download the Gradle .zip file from [here](http://www.gradle.org). To install Gradle, simply extract the downloaded zip into the directory of your choice.

Android Studio will ask for a GRADLE HOME when importing the sample. Set that path to the directory extracted from the Gradle .zip file where the 'bin' directory lives. The 'build.gradle' file will automatically build your project, pulling in the required dependencies.

Otherwise, if using Eclipse etc, on [IBM Bluemix](https://www.bluemix.net) click on your newly created app, then click Download SDKs, and click the Android SDK.
Once downloaded, unzip the SDK, and copy the required jars (ibmbluemix.jar, ibmdata.jar, ibmcloudcode.jar, and ibmfilesync.jar) into the 'libs' folder of your project.

Set up your Twilio account
---

1. Go to [Twilio](https://www.twilio.com/) and sign up for a free trial account.
2. Enter the required information (name, email, password) and click "Get Started".
3. Enter a valid (real) phone number so Twilio can verify that you're a human and complete the verification.
	Note: This number will also be the number your BlueList grocery list application will text.
4. Once the verification completes, you will be assigned a Twilio phone number. You have the option of accepting the assigned phone number or choosing your own. Save your Twilio phone number because you will need it again shortly.
5. Complete the setup of your account. Click on the "DASHBOARD" page and you'll see your "ACCOUNT SID" and "AUTH TOKEN". Save these values; you will need them later. To copy/paste the "TOKEN", click on the lock icon, as pictured below.

Extend your BlueList app with Twilio
---

1. Log in to [Bluemix](https://www.bluemix.net).
2. Click on your application in the "DASHBOARD" view.
3. Click on "ADD A SERVICE" and add the Twilio service to your application.
4. You will be prompted for the Account SID and Auth Token for your Twilio account. Select your app from the "Select an application" drop-down, then (copy/paste) the Twilio values you saved earlier and click "CREATE".
	Note: Your new Twilio service will be assigned a name (i.e., Twilio-xx), but you can change it to whatever you'd like. In this example, the Twilio service name is "Twilio."
5. Save your Twilio service name; you will need it when you edit the Node.js application code.
6. Your application will need to be restarted. Click "OK" to restart your BlueList application.
7. Now when you look at your Bluemix dashboard, you should see the new Twilio service added to your BlueList application.
8. Click on your BlueList application to go to the overview page.
9. Click on the "Runtime" link to view the details of your BlueList Node.js runtime.
10. Scroll to the Environment Variables section and the VCAP_SERVICES tab.
11. Review the "user-provided" section of the JSON code. This section was created when you added the Twilio service to your application. We will be able to use the VCAP_SERVICES variables to dynamically retrieve the Twilio accountSID and authToken values within our Node.js runtime code. Using the ibmconfig module within our server-side code allows us to access these Bluemix application environment variables.

Node.js Twilio code
---

1. Look through the code in the <gitRepository>/bluelist-twilio/bluelist-twilio-node directory — specifically, the app.js file — and familiarize yourself with the code.
2. The app.js file will require a few updates, which we'll walk through now. Open app.js in an editor and make the following updates:
	Replace the applicationId and applicationRoute value placeholders with your application values. These values can be found on your application's Bluemix overview page.
	
	Update the toPhone and fromPhone value placeholders. Replace the toPhone number with the phone number to be sent the text message and the fromPhone phone number with your assigned Twilio phone number.
	```
	//change these to your Bluemix application values
	var appConfig = {
		applicationId: "<INSERT_APPLICATION_ID_HERE>",
		applicationRoute: "<INSERT_APPLICATION_ROUTE_HERE>"
	};
	//change these to your Twilio values
	var twilioConfig = {
		twilioServiceName: "<INSERT_TWILIO_SERVICE_NAME>",
		toPhone: "+15551234567",
		fromPhone: "+15557654321"
	};
	```
3. Edit the manifest.yml file. Update the host: and name: values to match the name of your Bluemix application.
	```
	host: my_bluemix_app_name
	disk: 1024M
	name: my_bluemix_app_name
	command: node app.js
	path: .
	domain: mybluemix.net
	mem: 128M
	instances: 1
	```
4. Save your changes and prepare to use the [Cloud Foundry command-line interface (cf)](https://www.ng.bluemix.net/docs/#cli/index.html#cli) to push your code up to Bluemix.
5. Open a command prompt and navigate to the location of your Twilio Node.js application. For example: cd <gitRepository>/bluelist-twilio-node/bluelist_twilio. List the directory contents to make sure you see your app.js, manifest.yml, and package.json files (among others).
6. Verify that cf is installed correctly by issuing the following command:
	```
	cf –version
	```
7. The command results should display the version of cf installed on your machine. For example:
	```
	cf version 6.0.1-9df4861
	```
8. Log in to Bluemix using the following command:
	```
	cf login -a https://api.ng.bluemix.net
	```
9. Push (upload) your new application code up to the Bluemix Node.js runtime by running the following command, replacing ${yourBlueList} with your application name:
	```
	cf push ${yourBlueList} -p . -m 512M
	```
10. Confirm that the push command was successful and your new Twilio Node.js application is running on Bluemix.
	```
	1 of 1 instances running
	
	App started
	
	Showing health and status for app ${yourBlueList} in org ${yourOrg} / space ${yourSpace} as ${yourBlueMixId}...
	OK
	
	requested state: started
	instances: 1/1
	usage: 512M x 1 instances
	urls: ${yourBlueList}.mybluemix.net
	
		state     since                    cpu    memory          disk
	#0   running   2014-04-25 02:23:27 PM   0.0%   53.2M of 512M   34.7M of 1G
	```

Configuring Your App
---

Edit the bluelist.properties file in your assets folder. If not already done, update the applicationID value with your Bluemix application ID. The applicationNAME should match your Bluemix application name; the twilioTextMessage is the message text Twilio will send to your phone.
	```
	applicationID=<INSERT_APPLICATION_ID_HERE>
	applicationSecret=<INSERT_APPLICATION_SECRET_HERE>
	applicationRoute=<INSERT_APPLICATION_ROUTE_HERE>
	# Text preceding grocery list (keep < 30 chars to allow room for list items) 
	twilioTextMessage=Pick up groceries:
	```

Running This Sample
---

1. Run the updated code in your emulator.
2. Add some grocery list items.
3. Check your phone (the one entered as the toPhone: number in your app.js code) for Twilio text messages as you update your grocery list.
