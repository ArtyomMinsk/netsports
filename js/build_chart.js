function load_data(){
    $.ajax({
        dataType: "json",
        url: "/soccer/netsports/data/season_stats.json",
        success: function (data){
            console.log(data);
            preprocessData(data);
        }
    });
};

function preprocessData(data){
    let dates = [];
    let places = [];
    let labels = [];

    data.reverse();
    for(let item of data){
        dates.push(item["date_start"]);
        places.push(item["place"]);
        labels.push(item["season"]);
    };

    generateTeamPerformanceChart(places, dates, labels);
};

function generateTeamPerformanceChart(places, dates, labels){
    places.pop();
    dates.pop();
    labels.pop();

    let myChart = document.getElementById("team_perf").getContext("2d");
    let teamPerformanceChart = new Chart(myChart, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                // label: "Team Performance",
                data: places,
                fill: false
                // backgroundColor: "#3399FF",
                // backgroundColor: ["#3399FF", "#8000ff", "#ff0040", "#00ffff", "#ff8000", "#ffff00"],
                // borderWidth: 1,
                // borderColor: "#777",
                // hoverBorderWidth: 1,
                // hoverBorderColor: "#000"
            }]
        },
        options: {
            title: {
                display: true,
                text: "Team Performance",
                fontSize: 20
            },
            legend: {
                display: false,
                position: "top",
                labels: {
                    fontColor: "#000"
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    title: "Place",
                    ticks: {
                        // beginAtZero: true,
                        reverse: true,
                        suggestedMin: 1,
                        suggestedMax: 10

                    },

                    // override: {
                    //     start: 10,
                    //     steps: 10,
                    //     stepWidth: -1
                    // }
                }],
                // display: true,
                // labelString: "Place"
            },

            tooltips: {
                enabled: true
            }
        }
    });
};

load_data();


// let myChart = document.getElementById("myChart").getContext("2d");
// let massPopChart = new Chart(myChart, {
//     type: "horizontalBar",
//     data: {
//         labels: ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge", "New Bedford"],
//         datasets: [{
//             label: "Population",
//             data: [617594, 181045, 153060, 106519, 105162, 95072],
//             // backgroundColor: "#3399FF",
//             backgroundColor: ["#3399FF", "#8000ff", "#ff0040", "#00ffff", "#ff8000", "#ffff00"],
//             borderWidth: 1,
//             borderColor: "#777",
//             hoverBorderWidth: 1,
//             hoverBorderColor: "#000"
//         }]
//     },
//     options: {
//         title: {
//             display: true,
//             text: "Largest Cities in Massachusetts",
//             fontSize: 20
//         },
//         legend: {
//             display: true,
//             position: "right",
//             labels: {
//                 fontColor: "#000"
//             }
//         },
//         layout: {
//             padding: {
//                 left: 50,
//                 right: 0,
//                 bottom: 0,
//                 top: 0
//             }
//         },
//         tooltips: {
//             enabled: true
//         }
//     }
// });