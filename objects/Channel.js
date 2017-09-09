const Endpoints = require('./Endpoints');
const Group = require('./Group');
module.exports = class Channel {
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
	sync(callback) {
		if (!this.isDM) this.group.sync(callback);
		else callback();
	}
	send(data) {
		return new Promise((resolve, reject) => {
			Endpoints.Conversations.send(this._Client, this.id, data).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
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
