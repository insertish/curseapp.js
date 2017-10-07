const EventEmitter = require('events');
const Objects = require('../objects');
const Endpoints = require('../objects/Endpoints');
const Websocket = require('../objects/Websocket');
const Cache = require('../cache/Cache');

/**
 * Client Object
 * @class
 */
class Client extends EventEmitter {
	/**
	 * Create a client object
	 * @constructor
	 */
	constructor() {
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
	/**
	 * Login to CurseApp
	 * @function
	 * @param {string} auth Authentication Token
	 * @param {string} id Client Id
	 * @param {string} key Machine Key
	 * @returns {void}
	 */
	login(auth, id, key) {
		this._AuthenticationToken = auth;
		this._ClientID = id;
		this._MachineKey = key;
		if (!key) {
			var Username, Password = auth, id;
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
module.exports = Client;