// visualisation based on example at "https://observablehq.com/@d3/multi-line-chart"

function render() {
  console.log("starting rendering")
  d3.csv("deaths.csv", data => {return {data}}).then(data => vis(data))
}

function hover(svg, path) {

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

  function moved() {
    d3.event.preventDefault();
    const ym = y.invert(d3.event.layerY);
    const xm = x.invert(d3.event.layerX);
    const i1 = d3.bisectLeft(gdata.dates, xm, 1);
    const i0 = i1 - 1;
    const i = xm - gdata.dates[i0] > gdata.dates[i1] - xm ? i1 : i0;
    const s = d3.least(gdata.series, d => Math.abs(d.values[i] - ym));
    path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
    dot.attr("transform", `translate(${x(gdata.dates[i])},${y(s.values[i])})`);
    dot.select("text").text(s.name);
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

var gdata

function vis(d) {
  // turn the data into a what d3 expects for time series
  var columns = d.columns.slice(4);
  columns = columns.map(c => c.replace("2020","20"))
  console.log(columns)
  var data = {
    y: "confirmed deaths",
    series: d.map(e => ({
      name: e.data["Country/Region"] + " " + e.data["Province/State"],
      values: columns.map(k => +e.data[k])
    })),
   dates: columns.map(d3.utcParse("%m/%d/%Y"))
  }
  gdata = data
  console.log(gdata)
  width = 1200
  height = 1200
  margin = ({top: 20, right: 20, bottom: 30, left: 30})
  x = d3.scaleUtc()
    .domain(d3.extent(gdata.dates))
    .range([margin.left, width - margin.right])

    y = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])

    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

        line = d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))

    ///
 //   chart = {
     svg = d3.select("svg")
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
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.values));


  svg.call(hover, path);

  //return svg.node();
//}

    ///


}