

$(document).ready(function() {
    console.log("Page Loaded");
    dowork();

    // $('#filter').on('change',function(){
    //     dowork();
    // });
});

function dowork(){

    let url = "static/data/HateCrime_Race.csv";
    d3.csv(url).then(function(data) {
        console.log(data);
        // let yearfilter = $('#filter').val();
        // let data =data.filter(x =>x["Year"]===yearfilter);
       
        makePlot(data);



    });

}

function makePlot(data){
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#Lollipop")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.Offender_Race; }))
    .padding(1);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 10000])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Lines
    svg.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
        .attr("x1", function(d) { return x(d.Offender_Race); })
        .attr("x2", function(d) { return x(d.Offender_Race); })
        .attr("y1", function(d) { return y(d.Count); })
        .attr("y2", y(0))
        .attr("stroke", "grey")

    // Circles
    svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function(d) { return x(d.Offender_Race); })
        .attr("cy", function(d) { return y(d.Count); })
        // .attr("r", function(d) { return y(d.Victim_Sum); })

        .attr("r", "5")
        .style("fill", "#69b3a2")
        .attr("stroke", "black")



}
