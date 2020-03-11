import { generateTeamPerformanceChart, generateTopScorerChart, generateAttendanceChart,
         generateTeamGoalsChart, generateSeasonResultChart, generateTableGoalStatsChart } from "./build_chart.js";

const tableGoalStats = [
    ["INTER", 68, 27, 41],
    ["Arsenal 20", 37, 40, -3],
    ["Juventus 20", 48, 31, 17],
    ["Slim Jackets", 49, 29, 20],
    ["Tailgators", 35, 47, -12],
    ["AVQP", 30, 77, -47],
    ["FC Fenerbahce", 53, 61, -8],
    ["True FC", 45, 52, -7],
    ["Los Intergalacticos CF", 31, 47, -16]
];

function load_data(){
    $.ajax({
        dataType: "json",
        url: "../data/season_stats.json",
        success: function (data){
            preprocessData(data);
        }
    });
};

function preprocessData(data){
    let dates = [],
        ranking = [],
        points = [],
        topScorerObj = data[0]["best_scorer"],
        playerAttendanceObj = data[0]["attendance"];

    let goalsLabels = ["GF", "GA", "GD"],
        goalsData = [data[0]["GF"], data[0]["GA"], data[0]["GD"]],
        seasonResultLabels = ["W", "T", "L"],
        seasonResultData = [data[0]["W"], data[0]["T"], data[0]["L"]];

    data.reverse();
    for(let item of data){
        let date = Date.parse(item["date_start"]).toString("MMM-yyyy");

        dates.push(date);
        ranking.push(item["place"]);
        points.push(item["points"]);
    }

    let topScorerLabelsAndData = getLabelsAndData(topScorerObj),
        topScorerLabels = topScorerLabelsAndData[0],
        topScorerData = topScorerLabelsAndData[1];
    let maxGoals = Math.max(...topScorerData);

    let attendanceLabelsAndData = getLabelsAndData(playerAttendanceObj),
        attendanceLabels = attendanceLabelsAndData[0],
        attendanceData = attendanceLabelsAndData[1];

    let maxAttendance = Math.max(...attendanceData);

    generateTeamPerformanceChart(ranking, dates, points);
    generateTopScorerChart(topScorerLabels, topScorerData, maxGoals);
    generateAttendanceChart(attendanceLabels, attendanceData, maxAttendance);
    generateTeamGoalsChart(goalsLabels, goalsData);
    // generateSeasonResultChart(seasonResultLabels, seasonResultData);
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

function processTableGoalStats(tableGoalStats){
    let teamLabels = [],
        GF = [],
        GA = [],
        GD = [];
    for(let item of tableGoalStats){
        teamLabels.push(item[0]);
        GF.push(item[1]);
        GA.push(item[2]);
        GD.push(item[3]);
    }

    generateTableGoalStatsChart(teamLabels, GF, GA, GD);
};

load_data();
processTableGoalStats(tableGoalStats);
