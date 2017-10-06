const Endpoints = require('./Endpoints');
module.exports = class GroupMember {
	/**
	 * Create a group member object
	 * @param {User} User User the member is
	 * @param {Group} Group Group the member is in
	 */
	constructor(User, Group) {
		this.user = User;
		this.group = Group;
	}
	/**
	 * @returns {Promise<void>}
	 */
	kick() {
		return new Promise((resolve, reject) => {
			Endpoints.Groups.groups.kick(this.user._Client, this.group.id, this.user.id).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	/**
	 * Ban this user
	 * @param {*} reason Ban reason
	 * @param {*} deleteM
	 * @returns {Promise<void>}
	 */
	ban(reason, deleteM) {
		return new Promise((resolve, reject) => {
			Endpoints.Groups.servers.ban(this.user._Client, this.group.id, this.user.id, reason, deleteM).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	/**
	 * Unban this user
	 * @returns {Promise<void>}
	 */
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
