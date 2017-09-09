# [curseapp.js](https://github.com/mcrocks999/curseapp.js)
> curseapp.js is a 100% promise based, Object-oriented wrapper for the CurseApp API.

[![curseapp.js on npm](https://nodei.co/npm/curseapp.js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/curseapp.js)

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/curseapp.js) [![npm](https://img.shields.io/npm/dt/curseapp.js.svg)](https://www.npmjs.com/package/curseapp.js)

Get support [on my Twitch server](https://invite.twitch.tv/djbMkz), add me on Twitch: `InsertPaulHere`, or add me on Discord: `Hey It's Paul!#0751`. There is no documentation yet! ~~Because I'm too lazy to make it..~~ Ask me on Twitch if you need to know more about the library, keep in mind this is similar to Discord.js

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
    consolle.log('Connection dropped!');
});

app.on('message', (msg) => {
    if (msg.content=='ping')
        msg.reply('pong!');
})
```