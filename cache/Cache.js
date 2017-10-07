const Endpoints = require('../objects/Endpoints');
const Group = require('../objects/Group');
var Groups = new Map();
module.exports = {
	/**
	 * @type {Map<string, Group>}
	 */
	Groups,
	/**
	 * @param {Client}
	 */
	Sync: (Client) => {
		return new Promise((resolve, reject) => {
			Endpoints.Contacts.contacts(Client).then((data) => {
				for (var i=0;i<data.Groups.length;i++) {
					var gData = data.Groups[i];
					var group = new Group(Client, gData.GroupID);
					group.syncRaw(gData);
					Groups.set(gData.GroupID, group);
				}
				resolve();
			}).catch(err => {
				reject(err);
				throw new Error('Failed syncing!');
			});
		});
	}
};
