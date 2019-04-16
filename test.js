let test = require("ava")
let pwned = require("./")

test("works", async t => {
  t.true(await pwned("password"))
  t.false(await pwned("ThisReallyLongPasswordShouldHopefullyNeverEndUpInTheHaveIBeenPwnedDatabaseAndIfNotThisTestWillFailAndThatWouldSuck#*^($@#HXKJN)@)(!@J92190201s1{{][[\n     \t\n   ª™£∂adkln"))
})
