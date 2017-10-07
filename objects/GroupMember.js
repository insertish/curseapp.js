const Endpoints = require('./Endpoints');
class GroupMember {
	/**
	 * Create a group member object
	 * @param {User} User User object
	 * @param {Group} Group Group object
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
	 * Ban this member from this group
	 * @param {*} reason Ban reason
	 * @param {*} deleteM Whether to delete messages
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
	 * Unban this member from this group
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
module.exports = GroupMember;