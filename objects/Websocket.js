const EventEmitter = require('events');
const WebSocket = require('ws');
const host = 'wss://notifications-eu-v1.curseapp.net/';
const Message = require('./Message');
const User = require('./User');
const Group = require('./Group');
const GroupMember = require('./GroupMember');

/**
 * Connect to the endpoint
 * @param {Client} Client 
 * @param {Class} Class 
 * @returns {void}
 */
function connect(Client, Class) {
	const ws = new WebSocket(host);
	ws.on('open', function () {
		var payload = `{"TypeID":-2101997347,"Body":{"CipherAlgorithm":0,"CipherStrength":0,"ClientVersion":"7.0.149","PublicKey":null,"MachineKey":"${Client._MachineKey}","UserID":${Client._UserID},"SessionID":"${Client._SessionID}","Status":1}}`;
		ws.send(payload);
		Class._keepAlive = setInterval(()=>{
			ws.send(`{"TypeID":-476754606,"Body":{"Signal":true}}`);
		},1000);
	});
	ws.on('close', function () {
		clearInterval(Class._keepAlive);
		Client.emit('dropped');
		setTimeout(() => {
			connect(Client, Class);
		},1000);
	});
	ws.on('message', function (raw) {
		//console.log(raw);
		var data = JSON.parse(raw);
		switch (data.TypeID) {
			case -815187584:
				if (data.Body.Status==1) Client.emit('connected');
				break;
			case 149631008:
				if (data.Body.ChangeType==2 || data.Body.ChangeType==3) {
					var group = new Group(Client, data.Body.Group.GroupID);
					group.sync(() => {
						Client.emit(data.Body.ChangeType==2 ? 'groupMemberJoin' : 'groupMemberLeave', new GroupMember(
							new User(Client, data.Body.Members[0].UserID, data.Body.Members[0].Username),
							group), new User(Client, data.Body.SenderID, data.Body.SenderName));
					});
				}
				break;
			case -635182161:
				if (data.Body.LikeCount<1) {
					var message = new Message(Client, data.Body);
					message.sync(() => {
						Client.emit('message', message);
					});
				}
				break;
		}
	});
}

module.exports = class Websocket extends EventEmitter {
	/**
	 * Connect to endpoint
	 * @param {Client} Client 
	 */
	constructor(Client) {
		super();
		connect(Client, this);
	}
}
