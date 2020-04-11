function render() {
  console.log("starting rendering")
  d3.csv("deaths.csv", data => {vis(data)} )
}

function vis(data) {
 console.log(data)
}