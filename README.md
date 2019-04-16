# havetheybeenpwned

> Test if your user's password has been pwned using the
> [haveibeenpwned.com](https://haveibeenpwned.com/) API

## Install

```sh
npm install --save havetheybeenpwned
```

## Usage

```js
import pwned from "havetheybeenpwned"

pwned("hunter42").then(isPwned => {
  console.log(isPwned) // true (pwned)
})
```

## How to build your own implementation

### 1. Hashing the password

For the haveibeenpwned API we'll need to create a hashed version of the
password in a format that the API expects.

- It need to be SHA-1 encoded
- And in hexidecimal format
- And in all caps

```js
import crypto from "crypto"

let hashed = crypto.createHash("sha1")
  .update(password)
  .digest("hex")
  .toUpperCase()
```


### 2. Get the "range" and "suffix"

We'll want to split the hashed password up into two parts:

- The `range` is the first 5 characters of the hashed password
- The `suffix` is all of the remaining characters after the 5th character

```js
let range = hashed.slice(0, 5)
let suffix = hashed.slice(5)
```

### 3. Fetch the `range`

Next we're going to use the `range` to search for a whole bunch of possibly
matching suffixes.

```js
let response = await fetch(`https://api.pwnedpasswords.com/range/${range}`)
let body = await response.text()
```

The body of the response will be in a text format like this:

```
005AB7658808E601CFBDA6B0822528E04EE:2
009A9DD8B92851C415994A6C68C3201F4D0:4
01F87CAC7825BD01CF025AE084EE6C85B47:4
02508FED8ADD9AB9D69E94D36CC8802C6ED:2
0372C8FB7D3EB9A8F9FBECC5904B84B69BF:3
0398AC94A63C1511136F3AA54287B358DA8:1
041E754C507CD6DD1E9B5D64C570818E255:1
04283CD001FF04F247EBA8B7A332C75A514:1
042C331F039E3A7E429C50B54C7AC8D2871:2
0447B3263150D2381042F83C16AD53A2E5F:3
0457CA8733A7618C8CB8232FDA2B3083675:7
04C8D1F5884F61EBE3B890C8B9EFBB71774:19
```

### 4. Check the range for your `suffix`

Each line in the response is are the "suffixes" that match the "range" followed
by a colon and a number of times the password has been pwned.

Search for your suffix in the list. If it is present, the password has been
pwned, if its not the password has not been pwned.

```js
let regex = new RegExp(`^${suffix}:`, 'm')

regex.test(body) // true (pwned), false (not pwned)
```
