const statuses = [];
const labels = ["Alive", "Stump", "Dead"];

async function getData() {
    const response = await fetch(/*tree census link here*/);
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    var alive = 0;
    var dead = 0;
    var stump = 0 ;
    rows.forEach((elem) => {
        const row = elem.split(",");
        const status = row[7];
        if(status == "Alive"){
            alive ++;
        }
        if(status == "Dead"){
            dead ++;
        }
        if(status == "Stump"){
            stump ++;
        }
    });
    statuses.push(alive, stump, dead);
    console.log("finished loading");
    await getChart();
}

async function getChart(){
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
            label: 'NYC Tree Data',
            backgroundColor: [            
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'],
            data: statuses,
            fill: false,
            borderWidth: 1
            }]
        },
    });
}

getData();
