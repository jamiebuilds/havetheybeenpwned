"use strict"

function bufferToHex(buffer) {
	let view = new DataView(buffer);
	let hexCodes = ""
	for (let i = 0; i < view.byteLength; i += 4) {
		hexCodes += view.getUint32(i).toString(16).padStart(8, "0")
	}
	return hexCodes
}

function sha1(str) {
	let buffer = new TextEncoder().encode(str)
	return crypto.subtle.digest("SHA-1", buffer)
		.then(hash => bufferToHex(hash))
}

module.exports = sha1
