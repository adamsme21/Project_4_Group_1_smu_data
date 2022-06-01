$(document).ready(function() {
    console.log("Page Loaded");
    getData();

    $('#filter').on('change',function(){
        getData();
    });
});

function getData() {
    let filepath = "static/data/HateCrime_CrimeType.csv";

    d3.csv(filepath).then(function(data) {
        console.log(data);

        // let yearfilter = $('#filter').val();
        // let sub =data.filter(x =>x["Year"]===yearfilter);
        // let crime = sub.map(x => x["Crime_Type"]);
        // let count = sub.map(x => x["Count"]); // the + casts to number
        // let Counts = sub.map(x => x.Count).reduce((a, b) => a + b, 0)
        
        makebar(data);
    });
}



function makebar(data) {
    let yearfilter = $('#filter').val();
    let sub =data.filter(x =>x.Year===yearfilter);
    let totalCount = sub.map(x => +x.Count).reduce((a, b) => a + b);
    let totalcount2 = totalCount.toLocaleString("en-US");
    sub.sort((a,b) => b.Count - a.Count);
    let crime = sub.map(x => x.Crime_Type);
    let count = sub.map(x => x.Count);
    
    var trace1 = {
        x: crime,
        y: count,
        name: 'crime',
        type: 'bar',
        marker: {
            color: '#4B0082'
        }
    };

    var data = [trace1];
   var layout ={
    title: {
        text: `<b> Total Number of Incidents in ${yearfilter}  <br>  ${totalcount2}</b>`,
        font: {
            family: 'Segoe UI, sans-serif',
            size: 18
        }
    },
        xaxis: {
            titlefont: {
            size: 16
            },
            tickfont: {
            size: 10,
            family: 'Segoe UI, sans-serif',
            color: 'black',
                },
            },
            yaxis: {
                title: '<b># of Incidents</b>',
                titlefont: {
                family: 'Segoe UI, sans-serif',
                size: 16
                },
                tickfont: {
                family: 'Segoe UI, sans-serif',
                size: 14,
                color: 'black',
            },
            }
        }

    Plotly.newPlot('plot', data, layout);
}