var twilio = require('twilio');

var accountSid = 'AC0a4501550bb23e14a89ef9033c73eb30'; // Your Account SID from www.twilio.com/console
var authToken = '7a84e35b92b14d243478893b3f62d0f2';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello Vinamr',
    to: '+9188403917164',  // Text this number
    from: '+19165883535' // From a valid Twilio number
}).then((message) => console.log(message.sid))
.catch((e)=>{
    console.log(e);
});