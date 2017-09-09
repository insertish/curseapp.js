module.exports = class User {
	constructor(Client, Id, Name) {
		this._Client = Client
		this.id = Id;
		this.name = Name;
		this.avatarURL = 'https://avatars.curseapp.net/users/'+Id+'?t='+(+ new Date());
	}
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
