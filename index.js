const Bot = require('node-telegram-bot-api');
const request = require('request');

require('dotenv').config()

const url = 'https://launchlibrary.net/1.3/launch';
const trigger = 'I want to travel!';
const token = process.env.token;

const bot = new Bot(token, {polling: true});

const prepareData = (body) => {
    const launches = JSON.parse(body).launches;
    return launches.filter((launch) => launch !== undefined)
     .map((launch) => `SpaceShip: ${launch.name}
 Schedule:  ${launch.net}`)
     .join('\n\n');
   };


   bot.on('message', (msg) => {
    if (msg.text.toString() === trigger) {
     return request(url, (err, resp, body) => {
       console.log(body)
      bot.sendMessage(msg.chat.id, prepareData(body));
     });
    } else if (msg.text.toString() === 'No') {
        bot.sendMessage(msg.chat.id, 'Okay, Let me know when You want to travel')
    }
   bot.sendMessage(msg.chat.id, 'Hi, do you want to travel?', {
     reply_markup: {
       keyboard: [[trigger], ['No']]
      }
     }
    );
   });