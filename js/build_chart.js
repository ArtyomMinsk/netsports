function load_data(){
    $.ajax({
        dataType: "json",
        url: "/soccer/netsports/data/season_stats.json",
        success: function (data){
            preprocessData(data);
        }
    });
};

function preprocessData(data){
    let dates = [],
        places = [],
        labels = [],
        bestScorerObj = data[0]["best_scorer"];

    data.reverse();
    for(let item of data){
        dates.push(item["date_start"]);
        places.push(item["place"]);
        labels.push(item["season"]);
    }

    let bestScoreObjArr = [];
    Object.entries(bestScorerObj).forEach(
        ([key, value]) => bestScoreObjArr.push([key, value])
    );

    let bestScoreObjArrSorted = bestScoreObjArr.sort((a, b) => {
        return b[1] - a[1];
    });

    let bestScorerLabels = [],
        bestScorerData = [];
    for(let item of bestScoreObjArrSorted){
        bestScorerLabels.push(item[0]);
        bestScorerData.push(item[1]);
    }

    let maxGoals = Math.max(...bestScorerData);
    console.log(maxGoals);

    generateTeamPerformanceChart(places, dates, labels);
    generateTopScorerChart(bestScorerLabels, bestScorerData, maxGoals);
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
                label: "Ranking",
                data: places,
                fill: false,
                borderColor: "#3399FF",
                lineTension: 0,
                pointRadius: 5,
                borderDash: [5, 15],
                pointBackgroundColor: "#ff3410"
            }]
        },
        options: {
            title: {
                display: true,
                text: "Team Performance",
                fontSize: 20
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },

            legend: {
                display: false
            },

            scales: {
                xAxes: [{
                    scaleLabel: {
                    display: true,
                    labelString: "NetSports Season",
                    fontSize: 14
                    }
                }],

                yAxes: [{
                    display: true,
                    ticks: {
                        reverse: true,
                        suggestedMin: 1,
                        suggestedMax: 10

                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Table Ranking",
                        fontSize: 14
                    }
                }]
            },

            tooltips: {
                enabled: true
            },

            animation: {
                animateScale: true
            }
        }
    });
};

function generateTopScorerChart(bestScorerLabels, bestScorerData, maxGoals){
    let myChart2 = document.getElementById("top_scorer").getContext("2d");
    let topScorerChart = new Chart(myChart2, {
        type: "horizontalBar",
        data: {
            labels: bestScorerLabels,
            datasets: [{
                label: "Goals",
                display: false,
                data: bestScorerData,
                backgroundColor: ["#3399FF", "#8000ff", "#ff0040", "#00ffff", "#ff8000", "#ffff00",
                                  "#c679ff", "#ff2a97", "#ffa51c", "#fffb21", "#54FF18", "#5DFFA4"],
                borderWidth: 0.5,
                borderColor: "#777",
                hoverBorderWidth: 1,
                hoverBorderColor: "#000"
            }]
        },
        options: {
            title: {
                display: true,
                text: "Top Scorer",
                fontSize: 20
            },
            order: 1,

            legend: {
                display: false
            },

            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Goals Scored by Player",
                        fontSize: 14
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        suggestedMax: maxGoals + 1
                    }
                }]
            }
        }
    });
};

load_data();
