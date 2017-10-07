const Endpoints = require('./Endpoints');
class Group {
	/**
	 * Create a group object
	 * @param {Client} Client Parent Client
	 * @param {string} RootConversationID Group Id
	 */
	constructor(Client, RootConversationID) {
		this._Client = Client;
		this.id = RootConversationID;
		this.synced = false;
	}
	/**
	 * N/A
	 * @param {Function} callback Callback to callback
	 * @returns {void}
	 */
	sync(callback) {
		if (this.synced) return callback();
		Endpoints.Groups.groups.get(this._Client, this.id).then(data => {
			this.syncRaw(data);
			callback();
		}).catch(err => {
			console.log(err);
		});
	}
	/**
	 * N/A
	 * @param {string} data data
	 * @returns {void}
	 */
	syncRaw(data) {
		this.synced = true;
		this.title = data.GroupTitle;
		this.isPublic = data.IsPublic;
		this.inviteURL = data.UrlHost + data.UrlPath;
		this.memberCount = data.MemberCount;
		this.membersOnline = data.MembersOnline;
		this.isServer = data.GroupType == 1;
		this.channels = new Map();
		if (this.isServer) {
			for (var i=0;i<data.Channels.length;i++) {
				var chn = new this._Client._Objects.Channel(this._Client, this.id, data.Channels[i].GroupID, true);
				this.channels.set(data.Channels[i].GroupID, chn);
				if (data.Channels[i].IsDefaultChannel) {
					this.defaultChannel = chn;
					break;
				}
			}
		} else {
			this.defaultChannel = new this._Client._Objects.Channel(this._Client, this.id, this.id, true);
		}
	}
	/**
	 * Leave the group
	 * @returns {Promise<void>}
	 */
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
module.exports = Group;