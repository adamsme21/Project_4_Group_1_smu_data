$(document).ready(function() {
  console.log("Page Loaded");
  workbubble();
  
  $('#filter').on('change',function(){
    workbubble();
  });
});

function workbubble(){

  let path1 = "static/data/HateCrime_bias1.csv";
  d3.csv(path1).then(function(data1) {
      console.log(data1);
      let yearfilter = $('#filter').val();
      let data = data1.filter(function(d){ return d.Year ==yearfilter})
      makebubble(data);
  });

}
function makebubble(data){
// set the dimensions and margins of the graph
var width = $("#bubble").width()
var height = 460

$("#bubble").empty();
// append the svg object to the body of the page
var svg = d3.select("#bubble")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

  // Filter a bit the data -> more than 1 million inhabitants
  // data = data.filter(function(d){ return d.value>10000000 })
  // Color palette for continents?
  var color = d3.scaleOrdinal()

    .domain(["Midwest", "Northeast", "Other", "South", "US Territories", "West"])
    .range(['#B7A4C2','#B080CC', '#9370DB', '#642592', '8B008B','000000']);
    //.range(d3.schemeCategory10);

  // Size scale for countries
  var size = d3.scaleLinear()
    .domain([0, 1090])
    .range([7,55])  // circle will be between 7 and 55 px wide

  // create a tooltip
  var Tooltip = d3.select("#bubble")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(event, d) {
    Tooltip
      .style("opacity", 1)
  }
  var mousemove = function(event, d) {
    Tooltip
      .html("Bias: " + '<b>' + d.Bias_Desc + '</b>' + "<br>" +"Region: " + '<b>' +d.Region_Name +'</b>'+"<br>"+ " Incidents: " + '<b>' + d.Count +'</b>' )
      .style("left", (event.x/2-350) + "px")
      .style("top", (event.y/2-100) + "px")
  }
  var mouseleave = function(event, d) {
    Tooltip
      .style("opacity", 0)
  }
 
  // Initialize the circle: all located at the center of the svg area
  var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return size(d.Count)})
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", function(d){ return color(d.Region_Name)})
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));
  

  

  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.Count)+3) }).iterations(1)) // Force that avoids circle overlapping

  // svg.append("g")
  //   .attr("class", "legendOrdinal")
  //   .attr("transform", "translate(600,40)");
  
  // var legendOrdinal = d3.legendColor()
  //   .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
  //   .shapePadding(10)
  //   .scale(color);
  
  // svg.select(".legendOrdinal")
  //   .call(legendOrdinal);   
simulation
    .nodes(data)
    .on("tick", function(d){
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
    });

// What happens when a circle is dragged?
function dragstarted(event, d) {
 if (!event.active) simulation.alphaTarget(.03).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}
function dragended(event, d) {
 if (!event.active) simulation.alphaTarget(.03);
  d.fx = null;
  d.fy = null;
}

}