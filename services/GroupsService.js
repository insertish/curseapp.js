var req = require('request');
var host = 'https://groups-v1.curseapp.net/';
module.exports = {
	groups: {
		get: function (Client, RootConversationID) {
			return new Promise((resolve, reject) => {
				req.get({url:host+'groups/'+RootConversationID,
					headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
					if (err) return reject(err);
					var resp = JSON.parse(body);
					resolve(resp);
				});
			});
		},
		leave: function (Client, RootConversationID) {
			return new Promise((resolve, reject) => {
				req.post({url:host+'groups/'+RootConversationID+'/leave',
					headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
					if (err) return reject(err);
					resolve();
				});
			});
		},
		kick: function (Client, RootConversationID, MemberID) {
			return new Promise((resolve, reject) => {
				req.delete({url:host+'groups/'+RootConversationID+'/members/'+MemberID,
					headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
					if (err) return reject(err);
					resolve();
				});
			});
		}
	},
	servers: {
		ban: function (Client, RootConversationID, MemberID, reason, deleteM) {
			return new Promise((resolve, reject) => {
				req.post({url:host+'servers/'+RootConversationID+'/bans',
					form: {UserID: MemberID, Reason: reason ? reason : 'No reason specified!', MessageDeleteMode: deleteM ? 1 : 0},
					headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
					if (err) return reject(err);
					resolve();
				});
			});
		},
		unban: function (Client, RootConversationID, MemberID) {
			return new Promise((resolve, reject) => {
				req.delete({url:host+'servers/'+RootConversationID+'/bans/'+MemberID,
					headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
					if (err) return reject(err);
					resolve();
				});
			});
		}
	}
}
