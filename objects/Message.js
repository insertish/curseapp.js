const Endpoints = require('./Endpoints');
const GroupMember = require('./GroupMember');
const Channel = require('./Channel');
const User = require('./User');
module.exports = class Message {
	/**
	 * Create a message object
	 * @param {Client} Client 
	 * @param {string} Data 
	 */
	constructor(Client, Data) {
		this._Client = Client;
		this.ConversationID = Data.ConversationID;
		this.Timestamp = Data.Timestamp;
		this.isDM = Data.ConversationType == 1 ? false : true;
		this.Channel = new Channel(Client, Data.RootConversationID, Data.ConversationID, this.isDM);
		this.author = new User(Client, Data.SenderID, Data.SenderName);
		this.member = new GroupMember(this.author, this.Channel.group);
		this.content = Data.Body;
		this.channel = this.Channel;
		this.id = Data.ServerID;
	}
	/**
	 * Synchronise a function with this
	 * @param {Function} callback callback to call
	 * @returns {void}
	 */
	sync(callback) {
		this.Channel.sync(callback);
	}
	/**
	 * Reply to a message
	 * @param {string} data 
	 * @returns {Promise<void>}
	 */
	reply(data) {
		return new Promise((resolve, reject) => {
			Endpoints.Conversations.send(this._Client, this.ConversationID, '@'+this.author.id+':'+this.author.name+', '+data).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	/**
	 * Like the message
	 * @returns {Promise<void>}
	 */
	like() {
		return new Promise((resolve, reject) => {
			Endpoints.Conversations.like(this._Client, this.ConversationID, this.id, this.Timestamp).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	/**
	 * Unlike the message
	 * @returns {Promise<void>}
	 */
	unlike() {
		return new Promise((resolve, reject) => {
			Endpoints.Conversations.unlike(this._Client, this.ConversationID, this.id, this.Timestamp).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	/**
	 * Edit the message
	 * @param {string} new_content 
	 * @returns {Promise<void>}
	 */
	edit(new_content) {
		return new Promise((resolve, reject) => {
			Endpoints.Conversations.edit(this._Client, this.ConversationID, this.id, this.Timestamp, new_content).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
	/**
	 * Delete the message
	 * @returns {Promise<void>}
	 */
	delete() {
		return new Promise((resolve, reject) => {
			Endpoints.Conversations.delete(this._Client, this.ConversationID, this.id, this.Timestamp).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
}
