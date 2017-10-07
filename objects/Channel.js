const Endpoints = require('./Endpoints');
const Group = require('./Group');
module.exports = class Channel {
	/**
	 * Create a channel object
	 * @param {Client} Client Parent Client
	 * @param {string} RootConversationID Group Id
	 * @param {string} ConversationID Channel Id
	 * @param {bool} isDM Whether the channel is a DM
	 */
	constructor(Client, RootConversationID, ConversationID, isDM) {
		this._Client = Client;
		this.id = ConversationID;
		this.isDM = isDM;
		if (!isDM) {
			if (Client.groups.has(RootConversationID)) {
				this.group = Client.groups.get(RootConversationID);
			} else {
				this.group = new Group(Client, RootConversationID);
			}
		}
	}
	/**
	 * N/A
	 * @param {Function} callback 
	 * @returns {void}
	 */
	sync(callback) {
		if (!this.isDM) this.group.sync(callback);
		else callback();
	}
	/**
	 * Send a message to the channel
	 * @param {string} data message data
	 * @returns {Promise<void>}
	 */
	send(data) {
		return new Promise((resolve, reject) => {
			Endpoints.Conversations.send(this._Client, this.id, data).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	/**
	 * Send a file
	 * @param {Buffer | string} file file to send
	 * @returns {Promise<void>}
	 */
	sendFile(file) {
		return new Promise((resolve, reject) => {
			Endpoints.Files.upload(this._Client, file, this.isDM, this.isDM ? (this.id.split(':')[0] == this._Client.user.id ? this.id.split(':')[0] : this.id.split(':')[1]) : this.id).then((data) => {
				Endpoints.Conversations.send(this._Client, this.id, data.Url, data.ID, data.RegionID).then(() => {
					resolve();
				}).catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}
	/**
	 * Send an image
	 * @param {Buffer | string} image image to send 
	 * @returns {Promise<void>}
	 */
	sendImage(image) {
		return new Promise((resolve, reject) => {
			Endpoints.Images.upload(this._Client, image).then((data) => {
				Endpoints.Conversations.send(this._Client, this.id, data.Url, data.ID, data.RegionID).then(() => {
					resolve();
				}).catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}
}
