module.exports = class User {
	/**
	 * Create a user object 
	 * @param {Client} Client Parent client
	 * @param {string | number} Id User ID
	 * @param {string} Name Username
	 */
	constructor(Client, Id, Name) {
		this._Client = Client
		this.id = Id;
		this.name = Name;
		this.avatarURL = 'https://avatars.curseapp.net/users/'+Id+'?t='+(+ new Date());
	}
	/**
	 * Dm the user
	 * @param {string} msg Message to send
	 * @returns {Promise<void>}
	 */
	dm(msg) {
		return new Promise((resolve, reject) => {
			this._Client._Endpoints.Conversations.send(this._Client, this.id+':'+this._Client.user.id, msg).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
}
