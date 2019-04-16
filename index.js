let { sha1 } = require("crypto-hash")
let fetch = require("isomorphic-fetch")

function havetheybeenpwned(password) {
  return sha1(password).then(res => {
    let str = res.toUpperCase()
    let range = str.slice(0, 5)
    let suffix = str.slice(5)
    let match = new RegExp(`^${suffix}:`, 'm')

    return fetch(`https://api.pwnedpasswords.com/range/${range}`)
      .then(res => res.text())
      .then(data => match.test(data))
  })
}

module.exports = havetheybeenpwned
