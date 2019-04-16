let { createHash } = require("crypto")
let fetch = require("isomorphic-fetch")

function havetheybeenpwned(password) {
  let str = createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase()

  let range = str.slice(0, 5)
  let suffix = str.slice(5)
  let match = new RegExp(`^${suffix}:`, 'm')

  return fetch(`https://api.pwnedpasswords.com/range/${range}`)
    .then(res => res.text())
    .then(data => match.test(data))
}

module.exports = havetheybeenpwned
