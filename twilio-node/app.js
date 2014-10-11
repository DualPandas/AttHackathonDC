/*
 * Copyright 2014 IBM Corp. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Module dependencies
 */
var express = require('express'),
    bodyparser = require('body-parser'),
    ibmbluemix = require('ibmbluemix'),
    ibmdata = require('ibmdata'),
    twilio = require('twilio');


//change these to your Bluemix application values
var appConfig = {
    applicationId: "178c7cb3-5e4a-47c6-8841-3a104b3704ba",
    applicationRoute: "TodoAppList.mybluemix.net"
};
//change these to your Twilio values
var twilioConfig = {
    twilioServiceName: "Twilio-d4",
    toPhone: "+14046106603",
    fromPhone: "+14046106603"
};

//initialize the SDK
ibmbluemix.initialize(appConfig);
var logger = ibmbluemix.getLogger();

//initialize ibmconfig module
var ibmconfig = ibmbluemix.getConfig();

//create an express app
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

//uncomment below code to protect endpoints created afterwards by MAS
//var mas = require('ibmsecurity')();
//app.use(mas);

//initialize ibmdata service SDK
app.use(function(req, res, next) {
    req.data = ibmdata.initializeService(req);
    something = req.body.text;
    req.logger = logger;
    next();
});

//retrieve twilio credentials from VCAP_SERVICES
var twilioSid, twilioToken,
	vcapServices = ibmconfig.vcapServices;

for (var key in vcapServices) {
	//find the user-provided services section
	if (key == "user-provided") {
		for (var i in vcapServices[key]) {
			//find the twilio service values
			if (vcapServices[key][i].name == twilioConfig.twilioServiceName) {
				//get the credentials
				twilioSid = vcapServices[key][i].credentials.accountSID;
				twilioToken = vcapServices[key][i].credentials.authToken;
			}
		}
	}
}

console.log("Twilio account SID=" + twilioSid);
console.log("Twilio authToken=" + twilioToken);

//create twilio client
var twilioClient = new twilio.RestClient(twilioSid, twilioToken);

//get context root to deploy your application
//the context root is '${appHostName}/v1/apps/${applicationId}'
//map the context root to the app namespace
var contextRoot = ibmconfig.getContextRoot();
var appContext = express.Router();
app.use(contextRoot, appContext);

console.log("contextRoot: " + contextRoot);

// log all requests
app.all('*', function(req, res, next){
	console.log("Received request to " + req.url);
	next();
});

// endpoint: https://mobile.mybluemix.net/${appHostName}/v1/apps/${applicationId}/notifyOtherDevices/
appContext.post('/notifyOtherDevices', function(req,res) {
	//console.log(req);
	//console.log(res);
	//extract data from POST request
	var twilioTextMessage = req.body.text;
	console.log("twilioText :" + twilioTextMessage);
  console.log(req.body.text);

	//retrieve all Items in MobileData grocery list
    var groceryItems = [];
	var query = req.data.Query.ofType("Item");
    query.find().done(function onSuccess(items) {
        items.forEach(function(item) {
            //Add each item to the grocery list
            groceryItems.push(item.get('name'));
            if ((twilioTextMessage+" "+groceryItems.join(", ")).length > 140) {
            	//If all the items combined is > 140 characters (SMS limit)
            	//then remove last item and break out of the loop.
            	groceryItems.pop();
            	return true;
            }
        });
        var groceryList = groceryItems.join(", ");
        // Build the final twilioTextMessage
        twilioTextMessage = twilioTextMessage + groceryList;

        // Send twilio text
        twilioClient.sendMessage({
            to: twilioConfig.toPhone,
            from: twilioConfig.fromPhone,
            body: twilioTextMessage
        }, function(err, message) {
            if (err) {
                var errorMessage = "An error occurred sending the SMS through twilio.";
                console.error(errorMessage+": "+err)
                res.send(500, {
                    status: "FAILED",
                    statusMessage: errorMessage,
                    error: err
                });
            } else {
                console.log('Twilio Sent message ID: ' + message.sid);
                res.send({
                    status: "SUCCESS",
                    statusMessage: "Sent text message to Twilio phone number successfully",
                    smsMessage: twilioTextMessage,
                    twilioResponse: message
                });
                console.log("Returned response to device");
            }
        });

    }, function onFailure(err){
    	var errorMessage = "An error occurred querying for grocery items. Unable to send message"
    	console.error(errorMessage+": "+err);
    	res.send(500, {
    		status: "FAILED",
        	statusMessage: errorMessage,
        	error: err
    	});
    });
});

// host static files in public folder
// endpoint:  https://mobile.mybluemix.net/${appHostName}/v1/apps/${applicationId}/static/
//app.use(contextRoot+'/static',express.directory('public'));
appContext.use('/public',express.static('public'));


//redirect to cloudcode doc page when accessing the root context
app.get('/', function(req, res){
	res.sendfile('public/index.html');
});

app.listen(ibmconfig.getPort());
console.log('Server started at port: '+ibmconfig.getPort());
