# ASK SDK Lambda Layers

You can configure your Lambda function to pull in additional code and content in the form of layers. A layer is a ZIP archive that contains libraries, or other dependencies. With layers, you can use libraries in your function without needing to include them in your deployment package.

Layers let you keep your deployment package small, which makes development easier. You can avoid errors that can occur when you install and package dependencies with your function code. 
https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html

New to using layers?  Get detailed instructions [here](./using-lambda-layers.md)
[Layer details](#layer-details)

## Current layer versions

###  Current Layers for ASK SDK for Node.js
| Language Runtime | SDK Version | Region | Layer ARN |
|-|-|-|-|
| ASK SDK for Node.js | v2.3.0 | us-east-1 | arn:aws:lambda:us-east-1:173334852312:layer:ask-sdk-for-nodejs:4
| ASK SDK for Node.js | v2.3.0 | us-west-2 | arn:aws:lambda:us-west-2:173334852312:layer:ask-sdk-for-nodejs:4
| ASK SDK for Node.js | v2.3.0 | eu-west-1 | n/a (yet)
| ASK SDK for Node.js | v2.3.0 | ap-northeast-1 | n/a (yet)

###  Current Layers for ASK SDK for Python 3.6

| Language Runtime | SDK Version | Region | Layer ARN |
|-|-|-|-|
| ASK SDK for Python 3.6 | v1.6.0 | us-east-1 | arn:aws:lambda:us-east-1:173334852312:layer:ask-sdk-for-python-36:1
| ASK SDK for Python 3.6 | v1.6.2 | us-west-2 | n/a (yet)
| ASK SDK for Python 3.6 | v1.6.2 | eu-west-1 | n/a (yet)
| ASK SDK for Python 3.6 | v1.6.2 | ap-northeast-1 | n/a (yet)

###  Current Layers for ASK SDK for Python 2.7

| Language Runtime | SDK Version | Region | Layer ARN |
|-|-|-|-|
| ASK SDK for Python 2.7 | v1.6.2 | us-east-1 | n/a (yet)
| ASK SDK for Python 2.7 | v1.6.2 | us-west-2 | n/a (yet)
| ASK SDK for Python 2.7 | v1.6.2 | eu-west-1 | n/a (yet)
| ASK SDK for Python 2.7 | v1.6.2 | ap-northeast-1 | n/a (yet)

## Layer Details

### Node.js v8.10

This layer includes the following modules and any required dependencies not already available to AWS Lambda functions.
* ask-sdk
* ask-sdk-model
* ask-sdk-core
* ask-sdk-runtime
* ask-sdk-dynamodb-persistence-adapter
* ask-sdk-s3-persistence-adapter
* ask-sdk-v1adapter
* alexa-sdk
* i18next
* i18next-sprintf-postprocessor

#### Layer History

| Layer Contents | region | arn | Status
|----------|------|----|-|
| ASK SDK for Node.js v2.3.0 | us-east-1 | arn:aws:lambda:us-east-1:173334852312:layer:ask-sdk-for-nodejs:4 | Active |


### Python 3.6

This layer includes the following libraries and any required dependencies not already available to AWS Lambda functions.

* ask-sdk

#### Layer History

| Layer Contents | region | arn | Status |
|----------|------|----|-|
| ASK SDK for Python v1.6.0 | us-east-1 | arn:aws:lambda:us-east-1:173334852312:layer:ask-sdk-for-python-36:1 | Active |

### Python 2.7

This layer includes the following libraries and any required dependencies not already available to AWS Lambda functions.

* ask-sdk

#### Layer History

| Layer Contents | region | arn | Status |
|----------|------|----|-|
| ASK SDK for Python v1.6.2 | us-east-1 | n/a (yet) | Pending |

