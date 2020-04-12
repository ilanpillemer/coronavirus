// visualisation based on example at "https://observablehq.com/@d3/multi-line-chart"

function render() {
  console.log("starting rendering")
  confirmed = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  sourcedata = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
   recovered = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

  //d3.csv("deaths.csv", data => {return {data}}).then(data => vis(data))
  d3.csv(sourcedata, data => {return {data}}).then(data => vis(data,"passed"))
  d3.csv(confirmed, data => {return {data}}).then(data => vis(data,"confirmed"))
  d3.csv(recovered, data => {return {data}}).then(data => vis(data,"recovered"))


}

function labelme(svg,path) {
  console.log(path)
}

function hover(svg, path, data, x, y) {

  if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);

  const dot = svg.append("g")
      .attr("display", "none");

  dot.append("circle")
      .attr("r", 2.5);

  dot.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8);

  function moved(comp) {
    var pt = d3.mouse(this)
    d3.event.preventDefault();
    var ym = y.invert(pt[1]);
    var xm = x.invert(pt[0]);
    var i1 = d3.bisectLeft(data.dates, xm, 1);
    var i0 = i1 - 1;
    var i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
    var s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
    path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
    dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
    dot.select("text").text(s.name +  " : " + s.values[i]);
  }

  function entered() {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd");
    dot.attr("display", null);
  }

  function left() {
    path.style("mix-blend-mode", "multiply").attr("stroke", null);
    dot.attr("display", "none");
  }
}

//var gdata

function vis(d,key) {
  // turn the data into a what d3 expects for time series
  var columns = d.columns.slice(4);
  columns = columns.map(c => c.replace("2020","20"))
  var data = {
    y: key + " (source: https://github.com/CSSEGISandData/COVID-19) by Johns Hopkins CSSE",
    series: d.map(e => ({
      name: e.data["Country/Region"] + " " + e.data["Province/State"],
      values: columns.map(k => +e.data[k])
    })),
   dates: columns.map(d3.utcParse("%m/%d/%Y"))
  }
  //gdata = data
  //console.log(gdata)
  width = 700
  height = 700
  margin = ({top: 20, right: 20, bottom: 30, left: 30})
  let x = d3.scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])

   let y = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])

    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    yAxis = g => g
    .attr("transform", `translate(${width},0)`)
    .call(d3.axisRight(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", -5)
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(data.y))

        line = d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))


     svg = d3.select("svg." + key)
     .attr("viewBox", [0, 0, width, height])
     .style("overflow", "visible");

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const path = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(data.series)
    .join("path")
      .attr("name",d.name)
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.values));

      svg.append("g")
           .selectAll("circle")
           .data(data.series)
           .enter()
           .append("circle")
           .attr("r", 2.5)
           .attr("cx",width - margin.right)
           .attr("cy", (d,i) => y(d.values[d.values.length-1]))
           .append("text")

        svg.append("g").selectAll("g")
            .data(data.series)
            .enter()
           .append("text")
           .attr("font-family", "sans-serif")
           .attr("font-size", 10)
           .attr("text-anchor", "end")
           .attr("x",width - margin.right - 5)
           .attr("y", (d,i) => y(d.values[d.values.length-1]))
           .text(d => d.name )
  svg.call(hover, path, data, x, y);

}