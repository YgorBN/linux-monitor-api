

const cpuInfo = document.getElementById("cpu-info");
const ramInfo = document.getElementById("ram-info");
const discoInfo = document.getElementById("disco-info");
const uptimeInfo = document.getElementById("uptime-info");
// const tempInfo = document.getElementById("temp-info");

const listaProcessos =document.getElementById("lista-processos");


const redeEnviado = document.getElementById("rede-enviado");
const redeRecebido = document.getElementById("rede-recebido");

const cpuBar = document.getElementById("cpu-bar");
const ramBar = document.getElementById("ram-bar");
const discoBar = document.getElementById("disco-bar");
const tempBar = document.getElementById("temp-bar");

const cpuChartCanvas = document.getElementById("cpuChart")
const ramChartCanvas = document.getElementById("ramChart");

let contadorCPU = 0;
let contadorRAM = 0;


const ramChart = new Chart(ramChartCanvas, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Uso da RAM (%)",
            data: [],
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 3,
            borderColor: "#a78bfa",
            backgroundColor: "rgba(167, 139, 250, 0.2)",
            fill: true
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
});

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
        animation: false,
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

            cpuChart.update("none");

        });
}


function carregarRAM(){


    fetch("http://127.0.0.1:8000/ram")
        .then(response => response.json())

        .then(data => {
            ramInfo.innerText = `RAM: ${data.ram_percent}%`;
            ramBar.style.width = `${data.ram_percent}%`;
            atualizarCorBarra(ramBar, data.ram_percent);
            
            contadorRAM++;

            ramChart.data.labels.push(contadorRAM);
            ramChart.data.datasets[0].data.push(Number(data.ram_percent));

            if (ramChart.data.labels.length > 20) {
                ramChart.data.labels.shift();
                ramChart.data.datasets[0].data.shift();
            }

            ramChart.update("none");


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
        });
}


function carregarRede() {
    fetch("http://127.0.0.1:8000/rede")
    .then(response => response.json())
    .then(data => {
        redeEnviado.innerText = `Enviado: ${data.bytes_sent_gb} GB`;
        redeRecebido.innerText = `Recebido: ${data.bytes_recv_gb} GB`;

    });
}

function carregarProcessos() {
    fetch("http://127.0.0.1:8000/processos")
    .then(response => response.json())
    .then(data => {

        listaProcessos.innerHTML = "";

        data.processos.forEach((processo, indice) => {
            console.log(processo);

            const linha = document.createElement("p");

            linha.innerText = `${indice + 1}º ${processo.nome} - ${processo.memoria_percent}%`;

            listaProcessos.appendChild(linha);
        })
    });
}



carregarCPU();
carregarRAM();
carregarDISCO();
carregarRede();
carregarUptime();
carregarProcessos();

setInterval(carregarCPU, 1000);
setInterval(carregarRAM, 1000);
setInterval(carregarDISCO, 5000);
setInterval(carregarUptime, 1000);
setInterval(carregarRede, 5000);
setInterval(carregarProcessos, 5000);

