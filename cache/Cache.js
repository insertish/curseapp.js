const Endpoints = require('../objects/Endpoints');
var Groups = new Map();
var Channels = new Map();
module.exports = {
	Groups,
	Channels,
	Sync: (Client) => {
		return new Promise((resolve, reject) => {
			Endpoints.Contacts.contacts(Client).then((data) => {
				resolve();
			}).catch(err => {
				reject(err);
				throw new Error('Failed syncing!');
			});
		});
	}
};
