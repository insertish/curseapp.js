var req = require('request');
var fs = require('fs');
var host = 'https://images.curseapp.net/';
module.exports = {
	upload: function (Client, Image) {
		return new Promise((resolve, reject) => {
			var formData = {
				file: fs.createReadStream(Image)
			};
			req.post({url:host+'upload', formData: formData,
				headers: JSON.parse('{"X-Auth-Token":"'+Client._AuthenticationToken+'"}')}, function(err, res, body){
				if (err) return reject(err);
				var resp = JSON.parse(body);
				resolve(resp);
			});
		});
	}
}
