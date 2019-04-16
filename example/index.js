let pwned = require("..")

let input = document.getElementById("input")
let toggle = document.getElementById("toggle")
let output = document.getElementById("output")

function update() {
  if (input.value === "") {
    output.innerText = "..."
    return
  }

  pwned(input.value).then(res => {
    if (res) {
      output.innerText = "they've been pwned :("
    } else {
      output.innerText = "they haven't been pwned :)"
    }
  })
}

input.addEventListener("keyup", update)
toggle.addEventListener("click", () => {
  input.type = input.type === "password" ? "text" : "password"
})
