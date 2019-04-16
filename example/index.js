require("@babel/polyfill")
let pwned = require("..")

let input = document.getElementById("input")
let toggle = document.getElementById("toggle")
let output = document.getElementById("output")

async function update() {
  if (input.value === "") {
    output.innerText = "..."
    return
  }

  let res = await pwned(input.value)

  if (res) {
    output.innerText = "they've been pwned :("
  } else {
    output.innerText = "they haven't been pwned :)"
  }
}

input.addEventListener("keyup", update)
toggle.addEventListener("click", () => {
  input.type = input.type === "password" ? "text" : "password"
})
