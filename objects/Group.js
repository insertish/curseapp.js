const Endpoints = require('./Endpoints');
const Sync = require('sync');
module.exports = class Group {
	constructor(Client, RootConversationID) {
		this._Client = Client;
		this.id = RootConversationID;
	}
	sync(callback) {
		Endpoints.Groups.groups.get(this._Client, this.id).then(data => {
			this.title = data.GroupTitle;
			this.isPublic = data.IsPublic;
			this.inviteURL = data.UrlHost + data.UrlPath;
			this.memberCount = data.MemberCount;
			this.membersOnline = data.MembersOnline;
			this.isServer = data.GroupType == 1;
			if (this.isServer) {
				for (var i=0;i<data.Channels.length;i--) {
					if (data.Channels[i].IsDefaultChannel) {
						this.defaultChannel = new this._Client._Objects.Channel(this._Client, this.id, data.Channels[i].GroupID, true);
						break;
					}
				}
			} else {
				this.defaultChannel = new this._Client._Objects.Channel(this._Client, this.id, this.id, true);
			}
			callback();
		}).catch(err => {
			console.log(err);
		});
	}
	leave() {
		return new Promise((resolve, reject) => {
			Endpoints.Groups.groups.leave(this._Client, this.id).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
}
