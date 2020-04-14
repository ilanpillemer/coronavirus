
// visualisation based on example at "https://observablehq.com/@d3/multi-line-chart"

function render() {
//initalise for materialize see https://materializecss.com/select.html
M.AutoInit();
  console.log("starting rendering")
  confirmed = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  confirmed_US = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
  deceased = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
  deceased_US = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"
  recovered = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

  d3.csv(deceased, data => {return {data}}).then(data => vis(data,"deceased"))
  d3.csv(confirmed, data => {return {data}}).then(data => vis(data,"confirmed"))
  d3.csv(recovered, data => {return {data}}).then(data => vis(data,"recovered"))
  d3.select("#scale").on("change", render) ;
 // d3.csv(deceased_US, data => {return {data}}).then(data => vis(data,"deceased_US"))
 // d3.csv(confirmed_US, data => {return {data}}).then(data => vis(data,"confirmed_US"))
}

function hello() {
  console.log("hello")
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
      .attr("font-size", 8)
      .attr("text-anchor", "end")
      .attr("y", -20);

 dot.append("path")
       .classed("xgrid",true)
       .attr("fill", "none")
       .style("stroke-dasharray", ("3, 3"))
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
 ;

 dot.append("path")
       .classed("ygrid",true)
       .attr("fill", "none")
       .style("stroke-dasharray", ("3, 3"))
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
 ;

  function moved(comp) {
    margin = ({top: 20, right: 20, bottom: 30, left: 30})
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

    var formatter = d3.timeFormat("%d %b")
    shortdate = formatter(data.dates[i] )
    dot.select("text").text(s.name +  " " + s.values[i] + " " + shortdate);

    xline = d3.line()([
     [0,0],
     [width-x(data.dates[i]) , 0]
    ])

    yline = d3.line()([
     [0,0],
     [ 0, height-y(s.values[i]) - margin.bottom]
    ])

      dot.select("path.xgrid")
//       .style("mix-blend-mode", null).attr("stroke", "#ddd")
      .attr("d", xline)

     dot.select("path.ygrid")
      .attr("d", yline);
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
  var columns = key === "deceased_US" ? d.columns.slice(12): d.columns.slice(4);
  columns = columns.map(c => c.replace("2020","20"))

  var data = {
    y: key ,
    series: d.map(e => ({
      name: e.data["Combined_Key"] || e.data["Country/Region"] + " " + e.data["Province/State"],
      values: columns.map(k => +e.data[k])
    })),
   dates: columns.map(d3.utcParse("%m/%d/%Y"))
  }
  /// setup checkboxes
//  d3
//  .selectAll("input.countryCheckbox")
//  .data(data.series)
//  .enter()
//  .append("label")
//  .attr("for",d => d.name)
//  .text(d => d.name)
//  .append("input")
//  .classed("countryCheckbox",true)
//  .attr("type","checkbox")
//  .attr("value",d => d.name)
  const showSqrt = d3.select("#scale").property("checked")
  const factor = showSqrt ? 2.5 : 1
  const watermark = d3.max(data.series, d => d3.mean(d.values)) / factor
  width = 400
  height = 400
  margin = ({top: 20, right: 50, bottom: 30, left: 20})
  let x = d3.scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])

   let y = showSqrt ?
    d3.scaleSqrt()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])
   :
     d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])



    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    yAxis = g => g
    .attr("transform", `translate(${width-margin.right+2},0)`)
    .call(d3.axisRight(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", -width/2)
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(data.y))

        line = d3.line()
    .defined(d => !isNaN(d) )
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))


     svg = d3.select("svg." + key)
     .attr("viewBox", [0, 0, width, height])
     .style("overflow", "visible");

   svg.select("g#paths").data(data.series).remove()
   svg.select("g#names").data(data.series).remove()
   svg.select("g#dots").data(data.series).remove()
   svg.select("g#yaxis").data(data.series).remove()
   svg.select("g#xaxis").data(data.series).remove()

  svg.append("g")
      .attr("id","xaxis")
      .call(xAxis);

  svg.append("g")
      .attr("id","yaxis")
      .call(yAxis);



  const path = svg.append("g")
      .attr("id","paths")
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
            .attr("id","dots")
           .selectAll("circle")
           .data(data.series)
           .enter()
           .append("circle")
           .attr("r", 1.0)
           .attr("cx",width - margin.right)
           .attr("cy", (d,i) => y(d.values[d.values.length-1]))
           .append("text")

        svg.append("g")
             .attr("id","names")
             .selectAll("g")
            .data(data.series, d => d.name)
            .enter()
           .append("text")
           .attr("font-family", "sans-serif")
           .attr("font-size", 10)
           .attr("text-anchor", "end")
           .attr("x",width - margin.right - 3)
           .attr("y", (d,i) => y(d.values[d.values.length-1]))
           .text((d) => {
             return +(d.values[d.values.length-1]) > watermark ? d.name : ""
           } )

  svg.call(hover, path, data, x, y);

}