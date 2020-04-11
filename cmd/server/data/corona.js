function render() {
  console.log("starting rendering")
  d3.csv("deaths.csv", data => {return {data}}).then(data => vis(data))
}

function vis(d) {
  // turn the data into a what d3 expects for time series
  const columns = d.columns.slice(4);
  var data = {
    y: "confirmed deaths",
    series: d.map(e => ({
      name: e.data["Country/Region"] + " " + e.data["Province/State"],
      values: columns.map(k => +e.data[k])
    })),
   dates: columns.map(d3.utcParse("%M/%d/%y"))
  }
  console.log(data)
}