var req = require('request');
var host = 'https://contacts-v1.curseapp.net/';
module.exports = {
	contacts: function (Client) {
		return new Promise((resolve, reject) => {
			req.get({url:host+'contacts',
				headers: {AuthenticationToken:Client._AuthenticationToken}}, function(err, res, body){
				if (err) return reject(err);
				var resp = JSON.parse(body);
				resolve(resp);
			});
		});
	}
}
