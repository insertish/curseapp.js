const EventEmitter = require('events');
const Objects = require('../objects');
const Endpoints = require('../objects/Endpoints');
const Websocket = require('../objects/Websocket');
const Cache = require('../cache/Cache');

module.exports = class Client extends EventEmitter {
	constructor(options = {}) {
		super();
		this._Endpoints = Endpoints;
		this._Objects = Objects;
		this._AuthenticationToken = '';
		this._ClientID = '';
		this._MachineKey = '';
		this._SessionID = '';
		this._UserID = '';
		this._Username = '';
		this._Cache = Cache;
		this.groups = Cache.Groups;
	}
	login(a,b,c) {
		this._AuthenticationToken = a;
		this._ClientID = b;
		this._MachineKey = c;
		if (!c) {
			var Username, Password = a, b;
			// TODO: login and set variables above
		}
		Endpoints.Sessions.create(this).then((UserID, SessionID) => {
			Cache.Sync(this).then(() => {
				this._ws = new Websocket(this);
			}).catch((err) => {
				console.log(err);
			});
		}).catch((err) => {
			console.log(err);
		});
	}
}
