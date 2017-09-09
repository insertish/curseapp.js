const Endpoints = require('./Endpoints');
module.exports = class GroupMember {
	constructor(User, Group) {
		this.user = User;
		this.group = Group;
	}
	kick() {
		return new Promise((resolve, reject) => {
			Endpoints.Groups.groups.kick(this.user._Client, this.group.id, this.user.id).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	ban(reason, deleteM) {
		return new Promise((resolve, reject) => {
			Endpoints.Groups.servers.ban(this.user._Client, this.group.id, this.user.id, reason, deleteM).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	unban() {
		return new Promise((resolve, reject) => {
			Endpoints.Groups.servers.unban(this.user._Client, this.group.id, this.user.id).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
}
