import { generateTeamPerformanceChart, generateTopScorerChart,
         generateAttendanceChart, generateTeamGoalsChart, generateSeasonResultChart } from "./build_chart.js";

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
        places = [],
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
        places.push(item["place"]);
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

    generateTeamPerformanceChart(places, dates, points);
    generateTopScorerChart(topScorerLabels, topScorerData, maxGoals);
    generateAttendanceChart(attendanceLabels, attendanceData, maxAttendance);
    generateTeamGoalsChart(goalsLabels, goalsData);
    generateSeasonResultChart(seasonResultLabels, seasonResultData);
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

load_data();
