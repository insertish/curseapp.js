var req = require('request');
var host = 'https://conversations-v1.curseapp.net/';
module.exports = {
	send: function (Client, ConversationID, Body, AttachmentID, AttachmentRegionID) {
		return new Promise((resolve, reject) => {
			if (typeof AttachmentID==='undefined') var AttachmentID = "00000000-0000-0000-0000-000000000000";
			if (typeof AttachmentRegionID==='undefined') var AttachmentRegionID = 0;
			req.post({url:host+'conversations/'+ConversationID, form: {
				MachineKey: Client._MachineKey,
				ClientID: Client._ClientID,
				Body: Body,
				AttachmentID: AttachmentID,
				AttachmentRegionID, AttachmentRegionID
			}, headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
				if (err) return reject(err);
				resolve();
			});
		});
	},
	like: function (Client, ConversationID, Id, Timestamp) {
		return new Promise((resolve, reject) => {
			req.post({url:host+'conversations/'+ConversationID+'/'+Id+'-'+Timestamp+'/like',
				headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
				if (err) return reject(err);
				resolve();
			});
		});
	},
	unlike: function (Client, ConversationID, Id, Timestamp) {
		return new Promise((resolve, reject) => {
			req.post({url:host+'conversations/'+ConversationID+'/'+Id+'-'+Timestamp+'/unlike',
				headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
				if (err) return reject(err);
				resolve();
			});
		});
	},
	delete: function (Client, ConversationID, Id, Timestamp) {
		return new Promise((resolve, reject) => {
			req.delete({url:host+'conversations/'+ConversationID+'/'+Id+'-'+Timestamp,
				headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
				if (err) return reject(err);
				resolve();
			});
		});
	},
	edit: function (Client, ConversationID, Id, Timestamp, Body) {
		return new Promise((resolve, reject) => {
			req.post({url:host+'conversations/'+ConversationID+'/'+Id+'-'+Timestamp,
				form: {Body: Body, Mentions: []},
				headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body) {
				if (err) return reject(err);
				resolve();
			});
		});
	}
}
