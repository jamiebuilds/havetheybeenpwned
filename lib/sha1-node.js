"use strict";
let crypto = require("crypto")

function sha1(str) {
  return Promise.resolve(
    crypto.createHash("sha1")
      .update(str, "utf8")
      .digest("hex")
  )
}

module.exports = sha1
