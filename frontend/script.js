

const cpuInfo = document.getElementById("cpu-info");
const ramInfo = document.getElementById("ram-info");
const discoInfo = document.getElementById("disco-info");
const uptimeInfo = document.getElementById("uptime-info")

const cpuBar = document.getElementById("cpu-bar");
const ramBar = document.getElementById("ram-bar");
const discoBar = document.getElementById("disco-bar");

const cpuChartCanvas = document.getElementById("cpuChart")

let contadorCPU = 0;

const cpuChart = new Chart(cpuChartCanvas, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Uso da CPU (%)",
            data: [],
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 3,
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.2)",
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
})



function carregarCPU(){


    

    fetch("http://127.0.0.1:8000/cpu")
        .then(response => response.json())

        .then(data => {
            cpuInfo.innerText = `CPU: ${data.cpu_percent}%`;
            cpuBar.style.width = `${data.cpu_percent}%`;
            atualizarCorBarra(cpuBar, data.cpu_percent);
            
            contadorCPU++;

            cpuChart.data.labels.push(contadorCPU);
            cpuChart.data.datasets[0].data.push(Number(data.cpu_percent));

            if (cpuChart.data.labels.length > 20) {
                cpuChart.data.labels.shift();
                cpuChart.data.datasets[0].data.shift();
            }

            cpuChart.update();

        });
}


function carregarRAM(){


    fetch("http://127.0.0.1:8000/ram")
        .then(response => response.json())

        .then(data => {
            ramInfo.innerText = `RAM: ${data.ram_percent}%`;
            ramBar.style.width = `${data.ram_percent}%`;
            atualizarCorBarra(ramBar, data.ram_percent);
        });
}



function carregarDISCO(){

    fetch("http://127.0.0.1:8000/disco")
        .then(response => response.json())

        .then(data => {
            discoInfo.innerText = `DISCO C: ${data.disk_percent}%`;
            discoBar.style.width = `${data.disk_percent}%`;
            atualizarCorBarra(discoBar, data.disk_percent);
        });
}



function atualizarCorBarra(barra, valor){
    if(valor < 50) {
        barra.style.backgroundColor = "#22c55e";
    } else if (valor < 80) {
        barra.style.backgroundColor = "#eab308";
    } else {
        barra.style.backgroundColor = "#ef4444";
    }
}

function carregarUptime() {
    fetch("http://127.0.0.1:8000/boot-time")
        .then(response => response.json())
        .then(data => {
            uptimeInfo.innerText = `Ligado há: ${data.uptime}`;
        })
}


carregarCPU();
carregarRAM();
carregarDISCO();
carregarUptime();

setInterval(carregarCPU, 1000);
setInterval(carregarRAM, 1000);
setInterval(carregarDISCO, 5000);
setInterval(carregarUptime, 6000);

