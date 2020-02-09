function load_data(){
    $.ajax({
        dataType: "json",
        url: "../netsports/data/season_stats.json",
        success: function (data){
            preprocessData(data);
        }
    });
};

function preprocessData(data){
    let dates = [],
        places = [],
        topScorerObj = data[0]["best_scorer"],
        playerAttendanceObj = data[0]["attendance"];

    data.reverse();
    for(let item of data){
        dates.push(item["date_start"]);
        places.push(item["place"]);
    }

    let topScorerLabelsAndData = getLabelsAndData(topScorerObj),
        topScorerLabels = topScorerLabelsAndData[0],
        topScorerData = topScorerLabelsAndData[1];
    let maxGoals = Math.max(...topScorerData);

    let attendanceLabelsAndData = getLabelsAndData(playerAttendanceObj),
        attendanceLabels = attendanceLabelsAndData[0],
        attendanceData = attendanceLabelsAndData[1];

    let maxAttendance = Math.max(...attendanceData);

    generateTeamPerformanceChart(places, dates);
    generateTopScorerChart(topScorerLabels, topScorerData, maxGoals);
    generateAttendanceChart(attendanceLabels, attendanceData, maxAttendance);
};

function getLabelsAndData(obj){
    let objArr = [],
        labelsArray = [],
        dataArray = [];

    Object.entries(obj).forEach(
        ([key, value]) => objArr.push([key, value])
    );

    let objArrSorted = objArr.sort((a, b) => {
        return b[1] - a[1];
    });

    for(let item of objArrSorted){
        labelsArray.push(item[0]);
        dataArray.push(item[1]);
    }

    return [labelsArray, dataArray];
};

function generateTeamPerformanceChart(places, dates){

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

function generateTopScorerChart(topScorerLabels, topScorerData, maxGoals){
    let myChart = document.getElementById("top_scorer").getContext("2d");
    let topScorerChart = new Chart(myChart, {
        type: "horizontalBar",
        data: {
            labels: topScorerLabels,
            datasets: [{
                label: "Goals",
                display: false,
                data: topScorerData,
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

function generateAttendanceChart(attendanceLabels, attendanceData, maxAttendance){
    let myChart = document.getElementById("player_attendance").getContext("2d");
    let topScorerChart = new Chart(myChart, {
        type: "bar",
        data: {
            labels: attendanceLabels,
            datasets: [{
                label: "Attended",
                display: false,
                data: attendanceData,
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
                text: "Player Attendance",
                fontSize: 20
            },
            order: 1,

            legend: {
                display: false
            },

            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Attended Games",
                        fontSize: 14
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        suggestedMax: maxAttendance + 1
                    }
                }]
            }
        }
    });
};

load_data();
