export function generateTeamPerformanceChart(places, dates, points){
    let myChart = $("#team_perf");
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
                pointRadius: function(context){
                    let index = context.dataIndex;
                    return index === 8 ? 9 : 5;
                },
                pointHoverRadius: 10,
                borderDash: [5, 15],
                pointBackgroundColor: function(context){
                    let index = context.dataIndex;
                    return index === 8 ? "#8F2CFF" : "#ff3410";
                },
                yAxisID: 'y'
            },
            {
                label: "Points",
                data: points,
                fill: false,
                lineTension: 0,
                borderWidth: 1,
                borderColor: "#ff3410",
                backgroundColor: "#64ff25",
                pointRadius: function(context){
                    let index = context.dataIndex;
                    return index === 8 ? 9 : 5;
                },
                pointHoverRadius: 10,
                yAxisID: 'y1'
            }]
        },
        options: {
            title: {
                display: true,
                text: "Team Performance",
                fontSize: 16
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 30,
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
                    id: 'y',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        reverse: true,
                        suggestedMin: 1,
                        suggestedMax: 10
                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Ranking",
                        fontSize: 14
                    }
                },
                {
                    id: 'y1',
                    type: 'linear',
                    display: true,
                    position: 'right',
                    gridLines: {
                        drawOnChartArea: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Points",
                        fontSize: 14
                    }
                }],


            },

            tooltips: {
                enabled: true
            },

            animation: {
                animateScale: true
            },

            // plugins: {
            //     zoom: {
            //         // zoom: {
            //             enabled: true,
            //             drag: true,
            //             mode: "xy"
            //         // }
            //     }
            // }
        }
    });
};

export function generateTopScorerChart(topScorerLabels, topScorerData, maxGoals){
    let myChart = $("#top_scorer");
    let topScorerChart = new Chart(myChart, {
        type: "horizontalBar",
        data: {
            labels: topScorerLabels,
            datasets: [{
                label: "Goals",
                display: false,
                data: topScorerData,
                fill: false,
                // backgroundColor: ["#3399FF", "#8000ff", "#ff0040", "#00ffff", "#ff8000", "#ffff00",
                //                   "#c679ff", "#ff2a97", "#ffa51c", "#fffb21", "#54FF18", "#5DFFA4"],
                backgroundColor: ["rgb(51, 153, 255, 0.5)", "rgb(128, 0, 255, 0.5)", "rgb(255, 0, 64, 0.5)",
                                  "rgb(0, 255, 255, 0.5)", "rgb(255, 128, 0, 0.5)", "rgb(255, 255, 0, 0.5)",
                                  "rgb(198, 121, 255, 0.5)", "rgb(255, 42, 151, 0.5)", "rgb(255, 165, 28, 0.5)",
                                  "rgb(255, 251, 33, 0.5)", "rgb(84, 255, 24, 0.5)", "rgb(93, 255, 164, 0.5)"],
                borderWidth: 0.5,
                borderColor: "#777",
                hoverBorderWidth: 1,
                hoverBorderColor: "#000",
                alpha: 0.5
            }]
        },
        options: {
            title: {
                display: true,
                text: "Top Scorer",
                fontSize: 16
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
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 10,
                    top: 0
                }
            }
        }
    });
};

export function generateAttendanceChart(attendanceLabels, attendanceData, maxAttendance){
    let myChart = $("#player_attendance");
    let playerAttendanceChart = new Chart(myChart, {
        type: "bar",
        data: {
            labels: attendanceLabels,
            datasets: [{
                label: "Attended",
                display: false,
                data: attendanceData,
                backgroundColor: ["rgb(51, 153, 255, 0.5)", "rgb(128, 0, 255, 0.5)", "rgb(255, 0, 64, 0.5)",
                                  "rgb(0, 255, 255, 0.5)", "rgb(255, 128, 0, 0.5)", "rgb(255, 255, 0, 0.5)",
                                  "rgb(198, 121, 255, 0.5)", "rgb(255, 42, 151, 0.5)", "rgb(255, 165, 28, 0.5)",
                                  "rgb(255, 251, 33, 0.5)", "rgb(84, 255, 24, 0.5)", "rgb(93, 255, 164, 0.5)"],
                borderWidth: 0.5,
                borderColor: "#777",
                hoverBorderWidth: 1,
                hoverBorderColor: "#000",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: "Player Attendance",
                fontSize: 16
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
                    },
                    offsetGridLines: true
                }]
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 10,
                    top: 0
                }
            },

            plugins: {
                labels: {
                    render: function (args){ return "";}
                }
            }
        }
    });
};

export function generateTeamGoalsChart(goalsLabels, goalsData){
    let myChart = $("#team_goals");
    let teamGoalsChart = new Chart(myChart, {
        type: "doughnut",
        data: {
            labels: goalsLabels,
            datasets: [{
                label: "Goals",
                // display: false,
                data: goalsData,
                backgroundColor: ["#3399FF", "#FF4F17", "#9FFFAF"],
            }]
        },

        options: {
            plugins: {
                labels: [{
                    render: 'label',
                    position: 'outside',
                    fontSize: 16,
                    fontStyle: 'bold'
                    },
                    {
                    render: 'value',
                    fontSize: 16,
                    fontStyle: 'bold'
                }]
            }
        }
    });
};

export function generateSeasonResultChart(seasonResultLabels, seasonResultData){
    let myChart = $("#season_results");
    let seasonResultChart = new Chart(myChart, {
        type: "radar",
        data: {
            labels: seasonResultLabels,
            datasets: [{
                label: "Game Results",
                // display: false,
                data: seasonResultData,
                backgroundColor: "rgb(51, 153, 255, 0.4)",
            }]
        },

        options: {
            scale: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    suggestedMax: seasonResultData.reduce((a,b) => a + b, 0)
                }
            }

        }
    });
};
