var req = require('request');
var fs = require('fs');
var host = 'https://files.curseapp.net/';
module.exports = {
	upload: function (Client, FileN, isDM, IDfor) {
		return new Promise((resolve, reject) => {
			var formData = {
				file: fs.createReadStream(FileN)
			};
			req.post({url:host+(isDM ? 'users' : 'groups')+'/'+IDfor, formData: formData,
				headers: JSON.parse('{"X-Auth-Token":"'+Client._AuthenticationToken+'"}')}, function(err, res, body){
				if (err) return reject(err);
				var resp = JSON.parse(body);
				resolve(resp);
			});
		});
	}
}
