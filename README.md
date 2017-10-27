# NodeClock
A nodejs-based clockpad api client

## Preparations

* Visit https://clockpad.net then sign up for a new ClockPad account.
* Create a new `business`
* Create a new `app` inside the business. With the `Webhook URL` you input here, you will run this nodeclock example app.
* The `Business ID` and `Subscription Token` for the app you created should be given as environment variables when you run the example app. 

## Running the app

```bash
$ npm install
$ BUSINESS_ID=XXX SUBSCRIPTION_TOKEN=XXXXXXXX-YYYY-ZZZZ-VVVV-WWWWWWWWWWWW node app.js
```

Note that tcp:3000 is the default for the example app.

Once it starts running, you can connect your fingerprint scanners to ClockPad then subscribe realtime events.
