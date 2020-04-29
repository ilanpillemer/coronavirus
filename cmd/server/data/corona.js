
// visualisation based on example at "https://observablehq.com/@d3/multi-line-chart"
var hasInit = false
var population = new Map()
var iso2 = new Map()
var continentMap = new Map()


async function init() {
         console.log("initialising")
         // add replaceAll for browsers that dont support it
	if (typeof "".replaceAll !== "function"){
		String.prototype.replaceAll = function(search, replacement) {
		    var target = this;
		    return target.replace(new RegExp(search, 'g'), replacement);
		};
	}
	// continent to country code
	continent = "corona/country-and-continent.csv"
	lookup = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv"

	await d3.csv(continent, d => {
	  continentMap.set(d.iso2,d.Continent_Name)
	})
	await d3.csv(lookup,  d => {
	    iso2.set(extractKey2(d), d.iso2)
	})

	// set up controls
	setUp(await d3.csv(lookup, data => {return {data}}))
	hasInit = true
}

function extractKey2(d) {
	return d.Country_Region + " " + d.Province_State
}

function extractKey(d) {
	return d.data.Country_Region + " " + d.data.Province_State
}

async function setUp(data) {
	    // setup checkboxes
	   // console.log(continentMap)
	  const defaultCountries =  ["US ","Belgium ","Belarus ","Russia ","Spain ","United Kingdom ","South Africa ","France ","Sweden ","Italy ","US ","Israel ","China Hubei","Germany ","Singapore ","Japan "]

		 //Africa
		  const lblAfrica =  d3
		  .select("div.africa")
		  .selectAll("label.country")
		  .data(data.filter(d=> {
		            continent = continentMap.get(iso2.get(extractKey(d)))
		            //console.log(continent)
			  return continent == "Africa" && !defaultCountries.includes(extractKey(d))
			  })
		  , d => extractKey(d))
		  .enter() //only runs once as data series doesnt change
		  .append("div")
		  .append("label")

		  lblAfrica.append("input")
		    .classed("country blue africa",true)
 		    .attr("value",d => extractKey(d))
		   .attr("pop",d => +d.data.Population)
		    .attr("type","checkbox")
		    .classed("filled-in", true)
		    //.property("checked",true)
		     .on("click", render)

		   lblAfrica.append("span")
		  .html(d => {
		   population.set(extractKey(d), +(d.data.Population))
		   return extractKey(d)
		   })

		 //Oceania
		  const lblOceania=  d3
		  .select("div.oceania")
		  .selectAll("label.country")
		  .data(data.filter(d=> {
		            continent = continentMap.get(iso2.get(extractKey(d)))
			  return continent == "Oceania" && !defaultCountries.includes(extractKey(d))
			  })
		  , d => extractKey(d))
		  .enter() //only runs once as data series doesnt change
		  .append("div")
		  .append("label")

		  lblOceania.append("input")
		    .classed("country blue oceania",true)
 		    .attr("value",d => extractKey(d))
		   .attr("pop",d => +d.data.Population)
		    .attr("type","checkbox")
		    .classed("filled-in", true)
		    //.property("checked",true)
		     .on("click", render)

		   lblOceania.append("span")
		  .html(d => {
		   population.set(extractKey(d), +(d.data.Population))
		   return extractKey(d)
		   })

		 //Asia
		  const lblAsia=  d3
		  .select("div.asia")
		  .selectAll("label.country")
		  .data(data.filter(d=> {
		            continent = continentMap.get(iso2.get(extractKey(d)))
			  return continent == "Asia" && !defaultCountries.includes(extractKey(d))
			  })
		  , d => extractKey(d))
		  .enter() //only runs once as data series doesnt change
		  .append("div")
		  .append("label")

		  lblAsia.append("input")
		    .classed("country blue asia",true)
 		    .attr("value",d => extractKey(d))
		   .attr("pop",d => +d.data.Population)
		    .attr("type","checkbox")
		    .classed("filled-in", true)
		    //.property("checked",true)
		     .on("click", render)

		   lblAsia.append("span")
		  .html(d => {
		   population.set(extractKey(d), +(d.data.Population))
		   return extractKey(d)
		   })

		 //South America
		  const lblSAmerica=  d3
		  .select("div.southamerica")
		  .selectAll("label.country")
		  .data(data.filter(d=> {
		            continent = continentMap.get(iso2.get(extractKey(d)))
			  return continent == "South America" && !defaultCountries.includes(extractKey(d))
			  })
		  , d => extractKey(d))
		  .enter() //only runs once as data series doesnt change
		  .append("div")
		  .append("label")

		  lblSAmerica.append("input")
		    .classed("country blue southamerica",true)
 		    .attr("value",d => extractKey(d))
		   .attr("pop",d => +d.data.Population)
		    .attr("type","checkbox")
		    .classed("filled-in", true)
		    //.property("checked",true)
		     .on("click", render)

		   lblSAmerica.append("span")
		  .html(d => {
		   population.set(extractKey(d), +(d.data.Population))
		   return extractKey(d)
		   })

		 //North America
		  const lblNAmerica=  d3
		  .select("div.northamerica")
		  .selectAll("label.country")
		  .data(data.filter(d=> {
		            continent = continentMap.get(iso2.get(extractKey(d)))
			  return continent == "North America" && !extractKey(d).includes("US ") && !defaultCountries.includes(extractKey(d))
			  })
		  , d => extractKey(d))
		  .enter() //only runs once as data series doesnt change
		  .append("div")
		  .append("label")

		  lblNAmerica.append("input")
		    .classed("country blue northamerica",true)
 		    .attr("value",d => extractKey(d))
		   .attr("pop",d => +d.data.Population)
		    .attr("type","checkbox")
		    .classed("filled-in", true)
		    //.property("checked",true)
		     .on("click", render)

		   lblNAmerica.append("span")
		  .html(d => {
		   population.set(extractKey(d), +(d.data.Population))
		   return extractKey(d)
		   })

		 //Popular
		  const lblPopular=  d3
		  .select("div.popular")
		  .selectAll("label.country")
		  .data(data.filter(d=> {
		            return defaultCountries.includes(extractKey(d))
			  })
		  , d => extractKey(d))
		  .enter() //only runs once as data series doesnt change
		  .append("div")
		  .append("label")

		  lblPopular.append("input")
		    .classed("country blue popular",true)
 		    .attr("value",d => extractKey(d))
		   .attr("pop",d => +d.data.Population)
		    .attr("type","checkbox")
		    .classed("filled-in", true)
		    .property("checked",true)
		     .on("click", render)

		   lblPopular.append("span")
		  .html(d => {
		   population.set(extractKey(d), +(d.data.Population))
		   return extractKey(d)
		   })

		 //Europe
		  const lblEurope =  d3
		  .select("div.europe")
		  .selectAll("label.country")
		  .data(data.filter(d=> {
		            continent = continentMap.get(iso2.get(extractKey(d)))
			  return continent == "Europe" && !defaultCountries.includes(extractKey(d))
			  })
		  , d => extractKey(d))
		  .enter() //only runs once as data series doesnt change
		  .append("div")
		  .append("label")

		  lblEurope.append("input")
		    .classed("country blue europe",true)
 		    .attr("value",d => extractKey(d))
		   .attr("pop",d => +d.data.Population)
		    .attr("type","checkbox")
		    .classed("filled-in", true)
		    //.property("checked",true)
		     .on("click", render)

		   lblEurope.append("span")
		  .html(d => {
		   population.set(extractKey(d), +(d.data.Population))
		   return extractKey(d)
		   })

		 //Other
		  const lblOther =  d3
		  .select("div.other")
		  .selectAll("label.country")
		  .data(data.filter(d=> {
		            continent = continentMap.get(iso2.get(extractKey(d)))
			  return !continent
			  })
		  , d => extractKey(d))
		  .enter() //only runs once as data series doesnt change
		  .append("div")
		  .append("label")

		  lblOther.append("input")
		    .classed("country blue other",true)
 		    .attr("value",d => extractKey(d))
		   .attr("pop",d => +d.data.Population)
		    .attr("type","checkbox")
		    .classed("filled-in", true)
		    //.property("checked",true)
		     .on("click", render)

		   lblOther.append("span")
		  .html(d => {
		   population.set(extractKey(d), +(d.data.Population))
		   return extractKey(d)
		   })

		  // console.log(data)

	   M.AutoInit();
}

function selectall() {
  d3.selectAll(".country")
   .property("checked", d => {
     return +d.data.Population != 0
     })

  d3.selectAll(".continentSelect")
   .property("checked",true)

      M.AutoInit();
      render()
}

function selectContinent(el,name) {
      d3.selectAll("input." + name).property("checked",$(el).prop("checked"))
      render()
}


function deselectall() {
  d3.selectAll("option.country")
   .property("selected",false)

  d3.selectAll("input.country")
   .property("checked",false)

  d3.selectAll(".continentSelect")
   .property("checked",false)

      M.AutoInit();
      render()
}

async function render() {
	if (!hasInit) {
		await init()
	}
	//initalise for materialize see https://materializecss.com/select.html
	M.AutoInit();
	  console.log("starting rendering")
	  console.log("starting rendering tab1")
	  confirmed = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
	  deceased = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
	  recovered = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

	  d3.csv(deceased, data => {return {data}}).then(data => vis(data,"deceased"))
	  d3.csv(deceased, data => {return {data}}).then(data => vis_col(data,"deceased_col"))

	  d3.csv(confirmed, data => {return {data}}).then(data => vis(data,"confirmed"))
	  d3.csv(confirmed, data => {return {data}}).then(data => vis_col(data,"confirmed_col"))

	  d3.csv(recovered, data => {return {data}}).then(data => vis(data,"recovered"))
	  d3.csv(recovered, data => {return {data}}).then(data => vis_col(data,"recovered_col"))

	  d3.csv(deceased, data => {return {data}}).then(data => vis(data,"deceased_delta"))
	  d3.csv(deceased, data => {return {data}}).then(data => vis_col(data,"deceased_delta_col"))

	  d3.csv(confirmed, data => {return {data}}).then(data => vis(data,"confirmed_delta"))
	  d3.csv(confirmed, data => {return {data}}).then(data => vis_col(data,"confirmed_delta_col"))

	  d3.csv(recovered, data => {return {data}}).then(data => vis(data,"recovered_delta"))
	  d3.csv(recovered, data => {return {data}}).then(data => vis_col(data,"recovered_delta_col"))

	  // daily figures
	   daily = "corona/daily.csv"  // temporary test csv for now
	    d3.csv(daily, d => {
	       //console.log("testing",d)
	       return {
		    Day: d.Day,
		    name: d.Country_Region + " " + d.Province_State,
		    active: d.Active
		  };
	     }).then(data => vis(data,"daily"))

	  // daily figures
	   daily = "corona/daily.csv"  // temporary test csv for now
	    d3.csv(daily, d => {
	       //console.log("testing",d)
	       return {
		    Day: d.Day,
		    name: d.Country_Region + " " + d.Province_State,
		    active: d.Active
		  };
	     }).then(data => vis_col(data,"daily_col"))

	d3.select("#scale").on("change", render)
	d3.select("#normalise").on("change", render)
	d3.select("#normaliseTime").on("change", render)

	console.log("starting rendering tab2")
	//hand tidyied csv for now...
	age_uk = "corona/age_uk_28.csv"
	region_uk = "corona/region_uk.csv"
	d3.csv(age_uk, data => {return {data}}).then(data => vis_uk(data,"age_uk"))
	d3.csv(region_uk, data => {return {data}}).then(data => vis_uk(data,"region_uk"))
	console.log("ending rendering tab2")
}



function hover(svg, path, data, x, y, c) {

  if ("ontouchstart" in document) svg
//      .style("-webkit-tap-highlight-color", "transparent")
//      .on("touchmove", moved)
//      .on("touchstart", entered)
//      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);

  const dot = svg.append("g")
      .attr("display", "none");

  dot.append("circle")
      .attr("r", 2.5);

  popover = dot.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 8)
      .attr("font-weight", "bold")
      .attr("text-anchor", "begin")
      .attr("x",-70)
      .attr("y", -40)

   popover.append("tspan").attr("id","name").attr("x",-100).attr("dy","0.6em")
   popover.append("tspan").attr("id","quant").attr("x",-100).attr("dy","1.2em")
   popover.append("tspan").attr("id","day").attr("x",-100).attr("dy","1.8em")

   dot.append("image")
          .attr("id","flag")
          .attr("y",-60)
          .attr("x",-100)


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
    path.attr("stroke", d => d === s ? c(s.name) : "#ddd").filter(d => d === s).raise();
    dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);

    var formatter = d3.timeFormat("%d %b")
    shortdate = formatter(data.dates[i] )
    if (d3.select("#normaliseTime").property("checked")) {
	 shortdate = "Day " + data.dates[i]
     }

   //console.log(iso2.get(s.name))

    pretty = d3.format(".2s")
    dot.select("text").select("tspan#name").html(s.name + " (pop: " + pretty(population.get(s.name)) + ")");
    dot.select("text").select("tspan#quant").html(d3.format(",")(s.values[i]));
    dot.select("text").select("tspan#day").html(shortdate);
    dot.select("image").attr("href","https://www.countryflags.io/" + iso2.get(s.name) + "/flat/16.png")

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

function  reloadcolors() {
     svg.select("g#paths")
       .selectAll("path")
       .data(data.series, d => d.name)
       .attr("stroke",d => c(d.name))
  }

  function left() {
    path.style("mix-blend-mode", "multiply")
    reloadcolors()
    dot.attr("display", "none");
  }
}



function cleanData(d,key) {
	if (key == "daily" || key == "daily_col" ) {
		return cleanDaily(d,key)
	}
	if (key.includes("delta")) {
	         return cleanGlobalAveraged(d,key)
	}
	return cleanGlobal(d,key)
}

function cleanDaily(incoming,key) {
	columns = []
	series = []
	  dayshift = + ( $("input#dayshift").val() )
	  dayshift = dayshift || 100

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

	var data = {
		y : "active cases",
		series: series,
		dates: columns.map(d3.utcParse("%m/%d/%Y"))
	}



  if (d3.select("#normalise").property("checked")) {
    data.y = data.y + " (normalised by pop.)"
    data.series.forEach( d=> {
     //console.log(d)
     d.values = d.values.map( (e,i) => {
	    return  e / (+population.get(d.name) + 1) * 10000000
     })
   })
  }

  if (d3.select("#normaliseTime").property("checked")) {
    data.dates = data.dates.map((d,i) => i)
    data.series.forEach( d=> {
     d.values = d.values.filter(k => k > dayshift)
   })
  }


  return data
}


function cleanGlobalAveraged(d,key,period) {
  //console.log("averaging")
  period = + ( $("input#deltaaverage").val() )
  period = period || 14

  dayshift = + ( $("input#dayshift").val() )
  dayshift = dayshift || 100
  //console.log(period)
  // turn the data into a what d3 expects for time series
  var columns = key === "deceased_US" ? d.columns.slice(12): d.columns.slice(4);
  columns = columns.map(c => c.replace("2020","20"))
 //console.log("cos",columns)
 //console.log("d",d)
 if (!d3.select("#normaliseTime").property("checked")) {
	  var data = {
	    y: key.replace("_delta"," per day (new) averaged over " + period + " days") ,
	    series: d.map(e => ({
	      name: e.data["Combined_Key"] || e.data["Country/Region"] + " " + e.data["Province/State"],
	      values: columns.map(k => +e.data[k])
	    })),
	   dates: columns.map(d3.utcParse("%m/%d/%Y"))
	  }
  } else {
	  var data = {
	    y: key.replace("_delta"," per day (new) averaged over " + period + " days") ,
	    series: d.map(e => ({
	      name: e.data["Combined_Key"] || e.data["Country/Region"] + " " + e.data["Province/State"],
	      values: columns.map(k => +e.data[k]).filter(k => k > dayshift)
	    })),
	      dates: columns.map((d,i) => i)
	  }
  }

  if (key.includes("delta")) {
    data.series.forEach( d=> {
      previous = d.values.slice(0)
      previous.unshift(0)
      d.values = d.values.map( (e,i) => previous[i+1] - previous[i] )
   })
  }

  if (d3.select("#normalise").property("checked")) {
    data.y = data.y + " (normalised by pop.)"
    data.series.forEach( d=> {
     d.values = d.values.map( (e,i) => e / (+population.get(d.name) + 1) * 10000000)
   })
  }

  //now average out
	data.series.forEach( d=> {
	  ghost = d.values.slice(0)
	  for (let i  = 1; i < period; i++) {
	   ghost.unshift(0)
	  }
	  d.values = d.values.map( (e,i) => {
	          sum = ghost[i]
		 for (let j  = 1; j < period; j++) {
		   sum = sum + ghost[i + j]
		  }
		  return ( sum / period )
		  })
	})

  return data
}


function cleanGlobal(d,key) {
  // turn the data into a what d3 expects for time series
   dayshift = + ( $("input#dayshift").val() )
  dayshift = dayshift || 100
  var columns = key === "deceased_US" ? d.columns.slice(12): d.columns.slice(4);
  columns = columns.map(c => c.replace("2020","20"))
 //console.log("cos",columns)
 //console.log("d",d)
 if (!d3.select("#normaliseTime").property("checked")) {
	  var data = {
	    y: key.replace("_delta"," per day (new)") ,
	    series: d.map(e => ({
	      name: e.data["Combined_Key"] || e.data["Country/Region"] + " " + e.data["Province/State"],
	      values: columns.map(k => +e.data[k])
	    })),
	   dates: columns.map(d3.utcParse("%m/%d/%Y"))
  	}
      } else {
 	  var data = {
	    y: key.replace("_delta"," per day (new)") ,
	    series: d.map(e => ({
	      name: e.data["Combined_Key"] || e.data["Country/Region"] + " " + e.data["Province/State"],
	      values: columns.map(k => +e.data[k]).filter(k => k > dayshift)
	    })),
	   dates: columns.map((d,i) => i)
	  }
  }

  if (key.includes("delta")) {
    data.series.forEach( d=> {
      previous = d.values.slice(0)
      previous.unshift(0)
      d.values = d.values.map( (e,i) => previous[i+1] - previous[i] )
   })
  }

  if (d3.select("#normalise").property("checked")) {
    data.y = data.y + " (normalised by pop.)"
    data.series.forEach( d=> {
     d.values = d.values.map( (e,i) => e / (+population.get(d.name) + 1) * 10000000)
   })
  }
  return data
}


function vis(d,key) {
   data =  cleanData(d,key)

   //get all selected
  const selectedCountries = new Array()
  $('.country:checkbox:checked').map((i,d) => selectedCountries.push($(d).attr("value") ))

  data.series = data.series.filter(d => {
    return  selectedCountries.includes(d.name)
   })





  const c = d3.scaleOrdinal(d3.schemeCategory10).domain(selectedCountries)
  const showSqrt = d3.select("#scale").property("checked")
  const factor = showSqrt ? 4 : 4
  const watermark = d3.max(data.series, d => d3.median(d.values)) / factor
  width = 800
  height = 500
  margin = ({top: 20, right: 50, bottom: 30, left: 20})

  let x = d3.select("#normaliseTime").property("checked") ?
  d3.scaleLinear()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])
   :
  d3.scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])

   let y = showSqrt ?
    d3.scaleLog().clamp(true)
    .domain([1, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])
   :
     d3.scaleLinear().clamp(true)
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
    .defined( d => {
     return !isNaN(d)
     })
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))


     svg = d3.select("svg." + key)
     .attr("viewBox", [0, 0, width, height])
     .style("overflow", "visible");

   svg.select("g#paths").remove()
   svg.select("g#names").remove()
   svg.select("g#dots").remove()
   svg.select("g#yaxis").remove()
   svg.select("g#xaxis").remove()

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
    .data(data.series, d => d.name)
    .join("path")
      .attr("name",d.name)
      .style("mix-blend-mode", "multiply")
      .attr("stroke", d => {
      	return c(d.name)
      })
      .attr("d", d => line(d.values))

//     svg.append("g")
//            .attr("id","dots")
//           .selectAll("circle")
//           .data(data.series, d => d.name)
//           .enter()
//           .append("circle")
//           .attr("r", 1.0)
//           .attr("cx",width - margin.right)
//           .attr("cy", (d,i) => y(d.values[d.values.length-1]))
//           .append("text")


	if (d3.select("#normaliseTime").property("checked")) {
	        svg.append("g")
	             .attr("id","names")
	             .selectAll("g")
	            .data(data.series, d => d.name)
	            .enter()
	           .append("text")
	           .attr("font-family", "sans-serif")
	           .attr("font-size", 10)
	           .attr("text-anchor", "begin")
	           .attr("x", (d,i) => x(d.values.length) )
	           .attr("y", (d,i) => y(d.values[d.values.length-1]))
	           .text((d) => {
	             return +(d.values[d.values.length-1]) > watermark ? d.name : ""
	           } )
	} else {
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
	}



  svg.call(hover, path, data, x, y, c);

}

function vis_col(d,key) {

   // console.log(key)
   data =  cleanData(d,key)

   //get all selected
  const selectedCountries = new Array()
  $('.country:checkbox:checked').map((i,d) => selectedCountries.push($(d).attr("value") ))

  data.series = data.series.filter(d => {
    return  selectedCountries.includes(d.name)
   })
//d.values[d.values.length-1])
data.series.sort(function(x, y){
   return d3.descending( x.values[x.values.length-1], y.values[y.values.length-1]);
})

data.series = data.series.slice(0,25)

  const c = d3.scaleOrdinal(d3.schemeCategory10).domain(selectedCountries)
  const showSqrt = d3.select("#scale").property("checked")
  const factor = showSqrt ? 4 : 4
  const watermark = d3.max(data.series, d => d3.median(d.values)) / factor
  width = 800
  height = 500
  margin = ({top: 20, right: 50, bottom: 30, left: 20})

x = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d.values[d.values.length-1])])
    .range([margin.left, width - margin.right])

let y = d3.scaleBand()
    .domain(d3.range(data.series.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)

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
    .defined( d => {
     return !isNaN(d)
     })
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))


     svg = d3.select("svg." + key)
     .attr("viewBox", [0, 0, width, height])
     .style("overflow", "visible");

   svg.select("g#bars").remove()
   svg.select("g#names").remove()
   svg.select("g#xaxis").remove()

  svg.append("g")
      .attr("id","xaxis")
      .call(xAxis);

const path  = svg.append("g")
      .attr("id","bars")
    .selectAll("rect")
    .data(data.series, d => d.name)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
       .attr("fill", d =>  c(d.name))
      .attr("stroke", "steelblue" )
      .attr("width", d =>  {
          //console.log(d3.max(d.values))
      	return x(d.values[d.values.length-1])
      })
      .attr("height", y.bandwidth());

svg.append("g")
//      .attr("fill", "white")
       .attr("id","names")
      .attr("text-anchor", "begin")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data.series, d => d.name)
    .join("text")
      .attr("x", margin.left + 5)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => d.name);

 // svg.call(hover, path, data, x, y, c);
}

function vis_uk(d,key) { //age_series
	//console.log(key,d)
  // set up controls/geometries for chart
  width = 800
  height = 500

  margin = ({top: 20, right: 50, bottom: 30, left: 20})


	       const svg = d3.select("svg." + key)
	      .attr("viewBox", [0, 0, width, height]);
//	console.log(svg) deceased
  // end of set up

  // x and y scales
  //xz is the shared x values
  //hard coded various variables during first phase
//  xz = ["Age group",	"Up to 01-Mar-20",	"01-Mar-20",	"02-Mar-20",	"03-Mar-20",	"04-Mar-20",	"05-Mar-20",	"06-Mar-20",	"07-Mar-20",	"08-Mar-20",	"09-Mar-20",	"10-Mar-20",	"11-Mar-20",	"12-Mar-20",	"13-Mar-20",	"14-Mar-20",	"15-Mar-20",	"16-Mar-20",	"17-Mar-20",	"18-Mar-20",	"19-Mar-20",	"20-Mar-20",	"21-Mar-20",	"22-Mar-20",	"23-Mar-20",	"24-Mar-20",	"25-Mar-20",	"26-Mar-20",	"27-Mar-20",	"28-Mar-20",	"29-Mar-20",	"30-Mar-20",	"31-Mar-20",	"01-Apr-20",	"02-Apr-20",	"03-Apr-20",	"04-Apr-20",	"05-Apr-20",	"06-Apr-20",	"07-Apr-20",	"08-Apr-20",	"09-Apr-20",	"10-Apr-20",	"11-Apr-20",	"12-Apr-20",	"13-Apr-20",	"14-Apr-20",	"15-Apr-20",	"16-Apr-20",	"17-Apr-20",	"18-Apr-20",	"19-Apr-20",	"20-Apr-20",	"21-Apr-20",	"22-Apr-20",	"23-Apr-20",	"24-Apr-20"]

  xz = ["01-Mar-20",	"02-Mar-20",	"03-Mar-20",	"04-Mar-20",	"05-Mar-20",	"06-Mar-20",	"07-Mar-20",	"08-Mar-20",	"09-Mar-20",	"10-Mar-20",	"11-Mar-20",	"12-Mar-20",	"13-Mar-20",	"14-Mar-20",	"15-Mar-20",	"16-Mar-20",	"17-Mar-20",	"18-Mar-20",	"19-Mar-20",	"20-Mar-20",	"21-Mar-20",	"22-Mar-20",	"23-Mar-20",	"24-Mar-20",	"25-Mar-20",	"26-Mar-20",	"27-Mar-20",	"28-Mar-20",	"29-Mar-20",	"30-Mar-20",	"31-Mar-20",	"01-Apr-20",	"02-Apr-20",	"03-Apr-20",	"04-Apr-20",	"05-Apr-20",	"06-Apr-20",	"07-Apr-20",	"08-Apr-20",	"09-Apr-20",	"10-Apr-20",	"11-Apr-20",	"12-Apr-20",	"13-Apr-20",	"14-Apr-20",	"15-Apr-20",	"16-Apr-20",	"17-Apr-20",	"18-Apr-20",	"19-Apr-20",	"20-Apr-20",	"21-Apr-20",	"22-Apr-20",	"23-Apr-20",	"24-Apr-20","25-Apr-20","26-Apr-20","27-Apr-20","28-Apr-20"]

//xz = [new Date(2015, 0, 1),new Date(2015, 1, 1),new Date(2015, 2, 1),new Date(2015,3, 1)]
  n = key == "age_uk" ? 5 : 7  // number of series
 y1Max = 900
  z = d3.scaleSequential(d3.interpolateBlues)
    .domain([-0.5 * n, 1.5 * n])

    z = d3.scaleOrdinal(d3.schemeCategory10);

	x = d3.scaleBand()
	    .domain(xz.map( (d,i) => i))
	    .rangeRound([margin.left, width - margin.right])
	    .padding(0.08)

	    y = d3.scaleLinear()
    .domain([0, y1Max])
    .range([height - margin.bottom, margin.top])

  //
  // set up layout
  // need something that looks like this....
//  var data = [
//  {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
//  {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
//  {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, dates: 400},
//  {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, dates: 400}
//]; ie
  var data = [
  {month: new Date(2015, 0, 1), "0 - 19 yrs": 3840, "20 - 39": 1920, "40 - 59": 960, "60 - 79": 400, "80+": 400 },
  {month: new Date(2015, 1, 1), "0 - 19 yrs": 1600, "20 - 39": 1440, "40 - 59": 960, "60 - 79": 400,"80+": 400 },
  {month: new Date(2015, 2, 1), "0 - 19 yrs":  640, "20 - 39":  960, "40 - 59": 640, "60 - 79": 400,"80+": 400 },
  {month: new Date(2015, 3, 1), "0 - 19 yrs":  320, "20 - 39":  480, "40 - 59": 640, "60 - 79": 400,"80+": 400 }
];

var stackEx = d3.stack()
    .keys(["0 - 19 yrs", "20 - 39", "40 - 59", "60 - 79", "80+"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);
var series = stackEx(data);

var stackRegion = d3.stack()
    .keys(["East Of England", "London", "Midlands", "North East And Yorkshire", "North West","South East","South West"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);




  //console.log(d)
  age_array = new Array()
  temp = new Map()
  if (key=="age_uk") {
	  d.forEach ( e => {
	  	agroup = e.data["Age group"]
	  	entries = d3.entries(e.data)
	  	//console.log(entries)
	  	//console.log(agroup)
	  	entries.forEach ( f => {
		  	   if (agroup !== "Total" && f.key !== "Age group" && f.key !== "Up to 01-Mar-20" && f.key !== "") {
		  	  //console.log(f)
		  	  item = temp.get(f.key) || {}
		  	  item["month"]=f.key // ugly hacking so much
		  	  //console.log(agroup)
		  	  //console.log(item)
		  	  item[agroup] = f.value
			  //console.log(item)
		  	  temp.set(f.key, item)
	  	  }
	  	})
	 	//console.log(temp)
	  	//console.log(e)
	  })
  }

   if (key=="region_uk") {
	  d.forEach ( e => {
	  	agroup = e.data["NHS England Region"]
	  	entries = d3.entries(e.data)
	  	//console.log(entries)
	  	//console.log(agroup)
	  	entries.forEach ( f => {
		  	   if (agroup !== "England" && f.key !== "NHS England Region" && f.key !== "Up to 01-Mar-20" && f.key !== "") {
		  	  //console.log(f)
		  	  item = temp.get(f.key) || {}
		  	  item["month"]=f.key // ugly hacking so much
		  	  //console.log(agroup)
		  	  //console.log(item)
		  	  item[agroup] = f.value
			  //console.log(item)
		  	  temp.set(f.key, item)
	  	  }
	  	})
	 	//console.log(temp)
	  	//console.log(e)
	  })
  }

 // console.log(temp)
  temp.forEach ( d => {
    //console.log(d)
    age_array.push(d)
  })

//console.log(key,age_array)

  //console.log(age_series)
var age_series = key == "age_uk" ?  stackEx(age_array) : stackRegion(age_array);
//console.log(key,age_series)
  // draw bars
  const rect = svg.selectAll("g")
    .data(age_series)
    .join("g")
      .attr("fill", (d, i) => z(i))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", height - margin.bottom)
      .attr("width", x.bandwidth())
      .attr("height", 0);

	  async function transitionStacked() {
	    y.domain([0, y1Max]);

	    rect.transition()
	        .duration(500)
	        .delay((d, i) => i * 20)
	        .attr("y", d => y(d[1]))
	        .attr("height", d => y(d[0]) - y(d[1]))
	      .transition()
	        .attr("x", (d, i) => {
//	        	        console.log("d",d)
//	        	        console.log("i",i)
//	        	        console.log("x",x(d.month))



		        return x(i)
	        })
	        .attr("width", x.bandwidth());
	  }


	   yAxis = g => g
	    .attr("transform", `translate(${width-margin.right+2},0)`)
	    .call(d3.axisRight(y).ticks(5).tickFormat(d3.format(",.0f")))
	    .call(g => g.select(".domain").remove())
	    .call(g => g.select(".tick:last-of-type text").clone()
	        .attr("x", -width/2)
	        .attr("text-anchor", "end")
	        .attr("font-weight", "bold")
	        .text("NHS England Deceased: Mar 1 to Apr 28 2020"))

    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

svg.append("g")
  .attr("class", "legendOrdinal")
  .attr("transform", "translate(20,20)")

  svg.append("g")
      .attr("id","yaxis")
      .call(yAxis)

  svg.append("g")
      .attr("id","xaxis")
      .call(xAxis);



  var legendOrdinal = key == "age_uk" ?
   d3.legendColor()
  //.orient("horizontal")
  .labels(["0 - 19 yrs","20 - 39","40 - 59","60 - 79","80+"])
  .cellFilter(function(d){ return d.label !== "e" })
  .shape("circle")
  .shapePadding(25)
  .labelAlign("end")
  .labelOffset(20)
  .ascending(true)
  .scale(z)
  :
   d3.legendColor()
  //.orient("horizontal")
  .labels(["East Of England", "London", "Midlands", "North East And Yorkshire", "North West","South East","South West"])
  .cellFilter(function(d){ return d.label !== "e" })
  .shape("circle")
  .shapePadding(25)
  .labelAlign("end")
  .labelOffset(20)
  .ascending(true)
  .scale(z)


transitionStacked().then(svg.select(".legendOrdinal").call(legendOrdinal))
//svg.select(".legendOrdinal")
//  .call(legendOrdinal);


}