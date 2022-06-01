$(document).ready(function() {
    console.log("Page Loaded");
    dowork();
    $('#filter').on('change',function(){
        dowork();
    });
});
function dowork(){
    let url = "static/data/HateCrime_Race.csv";
    d3.csv(url).then(function(data1) {
        console.log(data1);
        // data1.forEach(function(d){
        //     d.Count = +d.Count;
        // });
        // d3.selectALL("#filter").on('change',function(){
        //     draw(this.value)
        // })
        let yearfilter = $('#filter').val();
        let data = data1.filter(function(d){ return d.Year ==yearfilter})
        // let yearfilter = $('#filter').val();
        // let data =data1.filter(x =>x["Year"]===yearfilter);
        // let incident = sub.map(x => x["Count"]);
        // let offrace= sub.map(x => x["Offender_Race"]);
        // let victims= sub.map(x => x["Victim_Sum"]);
        makelolli(data);
    });
}
function makelolli(data){
    // d3.selectALL("#filter").on('change',function(){
    //     dowork();
    // });
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 60, left: 40},
    width = $("#Lollipop").width() - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    $("#Lollipop").empty();
    var svg = d3.select("#Lollipop")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.Offender_Race; }))
    .padding(1);
    chartGroup.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 5000])
    .range([ height, 0,]);
    chartGroup.append("g")
    .transition(200).duration(1000)
    .call(d3.axisLeft(y));
    // var Tooltip = d3.select("#Lollipop")
    // .append("div")
    // .style("opacity", 0)
    // .attr("class", "tooltip")
    // .style("background-color", "white")
    // .style("border", "solid")
    // .style("border-width", "2px")
    // .style("border-radius", "5px")
    // .style("padding", "5px")
    // // Three function that change the tooltip when user hover / move / leave a cell
    // var mouseover = function(event, d) {
    // Tooltip
    //     .style("opacity", 1)
    // }
    // var mousemove = function(event, d) {
    // Tooltip
    //     .html("Bias: " + '<b>' + d.Offender_Race)
    //     .style("left", (event.x/2-350) + "px")
    //     .style("top", (event.y/2-100) + "px")
    // }
    // var mouseleave = function(event, d) {
    // Tooltip
    //     .style("opacity", 0)
    // }
    // Lines
    chartGroup.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
    .transition(200).duration(1000)
        .attr("x1", function(d) { return x(d.Offender_Race); })
        .attr("x2", function(d) { return x(d.Offender_Race); })
        .attr("y1", function(d) { return y(d.Count); })
        .attr("y2", y(0))
        .attr("stroke", "purple");
    // Circles
    var circlesGroup =  chartGroup.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "node")
    .style("fill", "indigo")
    .attr("stroke", "black")
    .attr("r", "10")
    circlesGroup
    .transition(200).duration(1000)
    .attr("cx", function(d) { return x(d.Offender_Race); })
    .attr("cy", function(d) { return y(d.Count); })
    //.attr("r", function(d) { return y((d.Victim_Sum)/); })
    // STEP 7: TOOLTIP
    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`<hr><strong>Count: ${d.Count}</strong>`);
        });
    // Step 2: Create the tooltip in chartGroup.
    circlesGroup.call(toolTip);
    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(event, d) {
            toolTip.show(d, this);
            //make bubbles big
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", 50);
        })
        // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(event, d) {
            toolTip.hide(d);
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", 10);
        });
    //     // Change the X coordinates of line and circle
    // svg.selectAll("circle")
    //     .transition()
    //     .duration(2000)
    //     .attr("cx", function(d) { return x(d.Count); })
    // svg.selectAll("line")
    //     .transition()
    //     .duration(2000)
    //     .attr("x1", function(d) { return x(d.Offender_Race); })
}