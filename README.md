# ARCHIVED

The Curse Messenger has since shut down, hence this project will likewise be deprecated and archived.

## [curseapp.js](https://github.com/insertish/curseapp.js)

> curseapp.js is a 100% promise based, Object-oriented wrapper for the CurseApp API.

[![curseapp.js on npm](https://nodei.co/npm/curseapp.js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/curseapp.js)

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/curseapp.js) [![npm](https://img.shields.io/npm/dt/curseapp.js.svg)](https://www.npmjs.com/package/curseapp.js)

Bye bye Twitch.

## Quickly get started with curseapp.js:

`npm install curseapp.js`

> Here's a simple script to get you started:

```javascript
const Curse = require('curseapp.js');
const app = new Curse.Client();

app.on('connected', () => {
    console.log(`Connected as ${app.user.name}`);
});

app.on('dropped', () => {
    console.log('Connection dropped!');
});

app.on('message', (msg) => {
    if (msg.content=='ping')
        msg.reply('pong!');
});
```