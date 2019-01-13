# Alexa Proactive Events API

The [Proacive Events API](https://developer.amazon.com/docs/smapi/proactive-events-api.html) allows you to send notifications to users of your skill.
The user will then hear a chime sound from their Echo device indicating a notification has arrived.
They ask Alexa for "notifications" and hear the details.

This feature demo will show you how to setup a sample skill called Ping Me, and a script to generate notifications.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
*  [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
*  [Node.JS version 8](https://nodejs.org/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-proactive-events/).

Your notification must follow one of the pre-defined formats listed in the [Proactive Events Schema](https://developer.amazon.com/docs/smapi/schemas-for-proactive-events.html)
For example, here is a sample from the OrderStatus schema:
```
        "event": {
            "name": "AMAZON.OrderStatus.Updated",
            "payload": {
                "state": {
                    "status": "ORDER_SHIPPED",
                    "deliveryDetails": {
                        "expectedArrival":  "2018-12-14T11:30:00.000Z"
                    }
                },
                "order": {
                    "seller": {
                        "name": "Delivery Owl"
                    }
                }
            }
        },
```

 * Alexa:  *"Your order from Delivery Owl has shipped and will arrive on December fourteenth at five thirty PM"*

## Setting Up the Demo
Be sure you have the AWS CLI and ASK CLI setup.
Download this repository to your laptop via the ```git clone``` command or the green download button above.

#### AWS setup steps
We will setup the AWS Lambda function first, as part of a CloudFormation stack called PingMe.
The stack will include the Lambda trigger, IAM role, and a DynamoDB table to track userIds.

1. Open a (bash) command terminal.
1. Navigate to the ```/skill/sam``` folder
1. Make the deploy script executable via the commmand ```chmod +x ./deploy.sh```
1. Execute the script to create your stack:  ```./deploy.sh```
 * This will launch a CloudFormation setup from a packaged project (s3://ask-samples-resources/code-packages/0c0e791d1e718cecc4be8716df6dcdf8)
1. Open the [CloudFormation console](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks) and verify the new stack called PingMe is created.  It will take a few moments to complete.
1. Click on this stack and then the Outputs tab.  Copy down the AWS Lambda ARN that is shown.


#### Skill setup steps
We will update our skill manifest with the Lambda ARN and then deploy the skill using the ASK CLI.


1. Open the file ```skill.json``` found within the ```/skill``` folder
1. Locate the two lines with "uri" on about lines 36 and 46.
1. Replace the values of these with the ARN from your Lambda function created previously, and save.
1. Notice the publications eventNames listed: ```"eventName": "AMAZON.OrderStatus.Updated"```, etc.  The [Proactive Events](https://developer.amazon.com/docs/smapi/schemas-for-proactive-events.html) you intend to use must be defined here.
1. Run the command ```ask deploy``` to create the skill.
1. When the command completes, login to the Developer Portal and open your skill.
1. Click to the Test tab, and enable skill testing in "Development"
1. Test the skill with the utterance "open ping me" and then "stop"
1. Locate your ```userId``` from within the Skill I/O JSON Input panel.  Copy the value.
1. Click to the Build tab, and click "Permissions" from the bottom left
1. At the bottom of this page, locate and copy down the two Skill Messaging Client credentials, Client Id and Client Secret.

Enable the skill to receive notifications, as an end user would.
1. Navigate to [alexa.amazon.com](https://alexa.amazon.com) and log in.
1. Click on Skills, then "Your Skills" from the top right.
1. Within the skill list panel, click on "Dev Skills" and then click on your new skill called "Ping Me".
1. Click the "Settings" button, then click "Manage Permissions".
1. Toggle on the Alexa Notifications option and click "Save Permissions"

You can also perform these steps from the Alexa App on your phone.

#### Test script setup steps
The root of the project contains two sample Node.JS scripts you can run from the command line:
* **order.js** shows how to send a notification to an individual user
* **media.js** shows how to send a broadcast message to all users

1. Open ```order.js``` and review the three settings for clientID, clientSecret, and userId1.
1. Open ```media.js``` and review the two settings for clientID, clientSecret.
1. Replace these values with the values you found in the previous steps.
1. Review the ```schedule.txt``` file that accompanies the media demo.


## Running the Demo
1. Type ```node order.js```
 * You should hear a chime and see a yellow light ring on your Echo device! Say "Alexa, notifications"

1. Type ```node media.js```
 * This script will scan through the list of sports events in schedule.txt, locate the next future event, and send out a Multicast notification.

```
// schedule.txt
2018-12-20T13:00:00.000Z, "Owls at Badgers",   "Speech Radio"
2019-01-25T13:00:00.000Z, "Otters at Swans",   "Listen Channel"
2019-02-14T13:00:00.000Z, "Pandas at Tigers",  "Voice TV"
```

## Next Steps
There are several ways to extend this demo beyond changing event data in the schedule file.

Modify the skill.json event publications section to define additional schema event types and re-deploy the skill.

Notice the localizedAttributes section of the event.
You can define unique variable values that will be resolved dynamically from the locale of each user.

        "localizedAttributes": [
            {
                "locale": "en-US",
                "sellerName": "Delivery Owl"
            },
            {
                "locale": "en-GB",
                "sellerName": "Delivery Owl UK"
            }
        ],

Navigate to the [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home?#tables:) and find the new table "askPingMe".
This table has one row for each user of your skill.  The primary key is the field called "userId", followed by any Persistent Attributes you set in your endpoint code.
You can design integrations such that other systems read and write from this table.  For example, you could correlate a notification to a subsequent skill invocation to see how many people "click through" to launch the skill after receiving the notification.

You could also track when users have granted permissions by adding handlers to respond to [Alexa Skill Events](https://developer.amazon.com/docs/smapi/skill-events-in-alexa-skills.html).
The getMemoryAttributes function in lambda/custom/constants.js initializes any user persistent attributes you wish to define.


You may want to setup a regularly scheduled job to run your script, using tools such as
[Cron](https://en.wikipedia.org/wiki/Cron),
[Windows Task Scheduler](https://en.wikipedia.org/wiki/Windows_Task_Scheduler),
or [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/with-scheduled-events.html).
The job could check existing systems for any new events, and generate Proactive API notifications.


## Frequently Asked Questions

 * Q: Can I send an ad-hoc or literal message as a notification?
 * A: No, your notification must follow the form of one of the [Proactive API schemas](https://developer.amazon.com/docs/smapi/schemas-for-proactive-events.html). You can propose new schemas via [alexa.uservoice.com](https://alexa.uservoice.com) .

 * Q: Can I get a notification banner to appear on my Echo Show?
 * A: Yes, the notification banner will appear provided your skill has been prepared for publishing and the icons have been set.

 * Q: Can I send a notification to a mobile phone?
 * A: You could send a TXT/SMS to a phone number via other channels, however the Proactive API works with Alexa devices.
