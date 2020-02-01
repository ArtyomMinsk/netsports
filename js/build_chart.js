let myChart = document.getElementById("myChart").getContext("2d");
let massPopChart = new Chart(myChart, {
    type: "horizontalBar",
    data: {
        labels: ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge", "New Bedford"],
        datasets: [{
            label: "Population",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            // backgroundColor: "#3399FF",
            backgroundColor: ["#3399FF", "#8000ff", "#ff0040", "#00ffff", "#ff8000", "#ffff00"],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 1,
            hoverBorderColor: "#000"
        }]
    },
    options: {
        title: {
            display: true,
            text: "Largest Cities in Massachusetts",
            fontSize: 20
        },
        legend: {
            display: true,
            position: "right",
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
        tooltips: {
            enabled: true
        }
    }
});