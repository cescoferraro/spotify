module.exports = [require("./vendor"), require("./client"), require("./server")];


module.exports = (env = {prod: false}) => {
	let vendor = require("./vendor")(env);
	let client = require("./client")(env);
	let server = require("./server")(env);
	return [vendor, client, server]

};
