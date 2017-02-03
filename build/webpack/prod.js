module.exports = (env = {prod: false}) => {
	let client = require("./client")(env);
	let server = require("./server")(env);
	return [client, server]

};
