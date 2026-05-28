

const cpuInfo = document.getElementById("cpu-info");
const ramInfo = document.getElementById("ram-info");
const discoInfo = document.getElementById("disco-info");

function carregarCPU(){


    fetch("http://127.0.0.1:8000/cpu")
        .then(response => response.json())

        .then(data => {
            cpuInfo.innerText = `CPU: ${data.cpu_percent}%`;
        });
}


function carregarRAM(){


    fetch("http://127.0.0.1:8000/ram")
        .then(response => response.json())

        .then(data => {
            ramInfo.innerText = `RAM: ${data.ram_percent}%`;
        });
}



function carregarDISCO(){

    fetch("http://127.0.0.1:8000/disco")
        .then(response => response.json())

        .then(data => {
            discoInfo.innerText = `DISCO C: ${data.disk_percent}%`;
        });
}

carregarCPU();
carregarRAM();
carregarDISCO()

setInterval(carregarCPU, 1000);
setInterval(carregarRAM, 1000);
setInterval(carregarDISCO, 5000);

