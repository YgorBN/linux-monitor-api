from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import datetime


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return{"mensagem": "API online"}

@app.get("/cpu")
def cpu():
    return{
        "cpu_percent": psutil.cpu_percent()
        }
@app.get("/ram")
def ram():
    
    memoria = psutil.virtual_memory()

    return{
        "ram_percent": memoria.percent,
        "ram_total": round(memoria.total / (1024 ** 3), 2),
        "ram_used": round(memoria.used / (1024 ** 3), 2),
        "ram_available": round(memoria.available / (1024 ** 3), 2)

    }

@app.get("/disco")
def disco():

    disco = psutil.disk_usage("C:\\")

    return{
        "disk_percent": disco.percent,
        "disk_total": round(disco.total / (1024 ** 3), 2),
        "disk_free": round(disco.free / (1024 ** 3), 2),
        "disk_used": round(disco.used / (1024 ** 3), 2)
    }

@app.get("/rede")
def rede():
    
    rede = psutil.net_io_counters()

    return{
        "bytes_sent_gb": round(rede.bytes_sent / (1024 ** 3), 2),
        "bytes_recv_gb": round(rede.bytes_recv / (1024 ** 3), 2),
        "packets_sent": rede.packets_sent,
        "packets_recv": rede.packets_recv
    }

@app.get("/boot-time")
def tempo():

    boot_time = psutil.boot_time()

    agora = datetime.datetime.now()
    ligado_em = datetime.datetime.fromtimestamp(boot_time)

    diferenca = agora - ligado_em

    dias = diferenca.days
    segundos = diferenca.seconds

    horas = segundos // 3600
    minutos = (segundos % 3600) // 3600
    segundos = segundos % 60
    

    return {
        "uptime": f"{dias} dias(s) {horas}h {minutos}min {segundos}s"
    }

@app.get("/processos")
def processos():
    
    listas_processos = []

    for processo in psutil.process_iter(["pid", "name", "memory_percent"]):

        info = processo.info

        listas_processos.append({
            "pid": info["pid"],
            "nome": info["name"],
            "memoria_percent": round(info["memory_percent"], 2)
        })

        listas_processos = sorted(
            listas_processos,
            key=lambda processo: processo["memoria_percent"],
            reverse=True
        )
    
    return {
        "processos": listas_processos[:5]
    }
