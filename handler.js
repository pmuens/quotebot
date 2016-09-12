'use strict';

const axios = require('axios');

// Your first function handler
module.exports.webhook = (event, context, callback) => {
  if (event.method === 'GET') {
    // facebook app verification
    if (event.query['hub.verify_token'] === 'STRONGTOKEN' && event.query['hub.challenge']) {
      return callback(null, parseInt(event.query['hub.challenge']));
    } else {
      return callback('Invalid token');
    }
  }

  if (event.method === 'POST') {
    event.body.entry.map((entry) => {
      entry.messaging.map((messagingItem) => {
        if (messagingItem.message && messagingItem.message.text) {
          const accessToken = '<access-token>'; // TODO: replace this token before deployment

          const quotes = [
            'Don\'t cry because it\'s over, smile because it happened. - Dr. Seuss',
            'Be yourself; everyone else is already taken. - Oscar Wilde',
            'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe. - Albert Einstein',
            'Be who you are and say what you feel, because those who mind don\'t matter, and those who matter don\'t mind. - Bernard M. Baruch',
            'So many books, so little time. - Frank Zappa',
            'A room without books is like a body without a soul. - Marcus Tullius Cicero'
          ];

          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

          const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${accessToken}`;

          const payload = {
            recipient: {
              id: messagingItem.sender.id
            },
            message: {
              text: randomQuote
            }
          };

          axios.post(url, payload).then((response) => callback(null, response));
        }
      });
    });
  }
};
