let create = require("./lib/implementation")
let sha1 = require("./lib/sha1-browser")

module.exports = create(sha1)
