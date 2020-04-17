
// visualisation based on example at "https://observablehq.com/@d3/multi-line-chart"

var hasInit = false
function render() {
//initalise for materialize see https://materializecss.com/select.html
//chrome sucks and doesnt have replaceAll
if (typeof "".replaceAll !== "function"){
	String.prototype.replaceAll = function(search, replacement) {
	    var target = this;
	    return target.replace(new RegExp(search, 'g'), replacement);
	};
}



  console.log("starting rendering")


  confirmed = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  confirmed_US = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
  deceased = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
  deceased_US = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"
  recovered = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"
  d3.csv(confirmed, data => {return {data}}).then(data => vis(data,"confirmed"))
  d3.csv(deceased, data => {return {data}}).then(data => vis(data,"deceased"))
  d3.csv(recovered, data => {return {data}}).then(data => vis(data,"recovered"))
  d3.csv(deceased, data => {return {data}}).then(data => {
    vis(data,"deceased_delta")
    //hack
             //only run this after previous have run..
             //to do fix hack so that order does not matter
	   daily = "corona/daily.csv"  // temporary test csv for now
	    d3.csv(daily, d => {
	       //console.log("testing",d)
	       return {
		    Day: d.Day,
		    name: d.Country_Region + " " + d.Province_State,
		    active: d.Active
		  };
	     }).then(data => vis(data,"daily"))
    //end hack
    })



  d3.csv(confirmed, data => {return {data}}).then(data => vis(data,"confirmed_delta"))
  d3.select("#scale").on("change", render) ;
}

function selectall() {
  d3.selectAll("option.country")
   .property("selected",true)
      M.AutoInit();
}

function deselectall() {
  //console.log("hello")
  d3.selectAll("option.country")
   .property("selected",false)
      M.AutoInit();
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
       .classed("x1grid",true)
       .attr("fill", "none")
       .style("stroke-dasharray", ("3, 3"))
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
 ;

  dot.append("path")
       .classed("x2grid",true)
       .attr("fill", "none")
       .style("stroke-dasharray", ("3, 3"))
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")


 dot.append("path")
       .classed("y1grid",true)
       .attr("fill", "none")
       .style("stroke-dasharray", ("3, 3"))
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
 ;

 dot.append("path")
       .classed("y2grid",true)
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

    x1line = d3.line()([
     [0,0],
     [width - margin.right - margin.right  -x(data.dates[i]) , 0]
    ])

    x2line = d3.line()([
     [0,0],
     [-x(data.dates[i]) + margin.left , 0]
    ])

    y1line = d3.line()([
     [0,0],
     [ 0, height-y(s.values[i]) - margin.bottom]
    ])

    y2line = d3.line()([
     [0,0],
     [ 0, -y(s.values[i]) + margin.top]
    ])

      dot.select("path.x1grid")
      .attr("d", x1line)

      dot.select("path.x2grid")
      .attr("d", x2line)

     dot.select("path.y1grid")
      .attr("d", y1line);

    dot.select("path.y2grid")
      .attr("d", y2line);
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

function cleanData(d,key) {
	if (key == "daily") {
		return cleanDaily(d,key)
	} else {
		return cleanGlobal(d,key)
	}
}

function cleanDaily(incoming,key) {
	columns = []
	series = []

	  d = d3.group(incoming, d => d.name)
	  var first = true
	  d.forEach( e => {
	    item = {}
	    values = []
	    e.forEach ( f => {
	        item.name = f.name
	        if (first) columns.push(f.Day.replace("2020","20").replaceAll("-","/"))
	        values.push(+(f.active))
	      })
	      first = false
	      item.values = values
	      series.push(item)
	    });

	// hack for now until including US data
	item = {}
	item.name = "US "
	item.values = series[0].values.map(d => 0)
	series.push(item)
	//
	var data = {
		y : "active cases",
		series: series,
		dates: columns.map(d3.utcParse("%m/%d/%Y"))
	}
  return data
}



function cleanGlobal(d,key) {
  // turn the data into a what d3 expects for time series
  var columns = key === "deceased_US" ? d.columns.slice(12): d.columns.slice(4);
  columns = columns.map(c => c.replace("2020","20"))
 //console.log("cos",columns)
 //console.log("d",d)
  var data = {
    y: key ,
    series: d.map(e => ({
      name: e.data["Combined_Key"] || e.data["Country/Region"] + " " + e.data["Province/State"],
      values: columns.map(k => +e.data[k])
    })),
   dates: columns.map(d3.utcParse("%m/%d/%Y"))
  }

  if (key.includes("delta")) {
    data.series.forEach( d=> {
      previous = d.values.slice(0)
      previous.unshift(0)
      d.values = d.values.map( (e,i) => previous[i+1] - previous[i] )
   })
  }

    // setup checkboxes
  const defaultCountries =  ["US ","Spain ","United Kingdom ","South Africa ","France ","Sweden ","Italy ","US ","Israel ","China Hubei","Germany "]

   d3
  .select("select.countries")
  .selectAll("option.country")
  .data(data.series)
  .enter() //only runs once as data series doesnt change
  .append("option")
  .classed("country",true)
  .property("selected",d => {
      return defaultCountries.includes(d.name)
    })
   .attr("value",d => d.name)
   .html(d => d.name)
   M.AutoInit();

//  const lbl =  d3
//  .select("div.countriesv2")
//  .selectAll("label.country")
//  .data(data.series)
//  .enter() //only runs once as data series doesnt change
//  .append("label")
//
//  lbl.append("input")
//    .classed("country",true)
//    .attr("type","checkbox")
//    .classed("filled-in", true)
//   lbl.append("span")
//  .html(d => d.name)
  return data
}

function vis(d,key) {
   // console.log(key)
   data =  cleanData(d,key)

   //get all selected
  const selectedCountries = $('select.countries').val()
  data.series = data.series.filter(d => {
    return  selectedCountries.includes(d.name)
   })

  const showSqrt = d3.select("#scale").property("checked")
  const factor = showSqrt ? 4 : 4
  const watermark = d3.max(data.series, d => d3.median(d.values)) / factor
  width = 800
  height = 500
  margin = ({top: 20, right: 50, bottom: 30, left: 20})
  let x = d3.scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])

   let y = showSqrt ?
    d3.scaleLog().clamp(true)
    .domain([1, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])
   :
     d3.scaleLinear()
    .domain([1, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])



    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    let yformat = d3.format(",.0f")

    yAxis = g => g
    .attr("transform", `translate(${width-margin.right+2},0)`)
    .call(d3.axisRight(y).ticks(5).tickFormat(d3.format(",.0f")))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", -width/2)
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(data.y))

        line = d3.line()//.curve(d3.curveMonotoneX)
    .defined( d => !isNaN(d) )
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