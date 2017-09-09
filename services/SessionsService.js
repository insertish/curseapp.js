var req = require('request');
var host = 'https://sessions-v1.curseapp.net/';
const User = require('../objects/User');
module.exports = {
	create: function (Client) {
		return new Promise((resolve, reject) => {
			req.post({url:host+'sessions', form: {
				MachineKey: Client._MachineKey
			}, headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
				if (err) return reject(err);
				var resp = JSON.parse(body);
				Client._SessionID = resp.SessionID;
				Client._UserID = resp.User.UserID;
				Client._Username = resp.User.Username;
				Client.user = new User(Client, resp.User.UserID, resp.User.Username);
				resolve(resp.SessionID, resp.User.UserID);
			});
		});
	}
}
