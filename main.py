from fastapi import FastAPI
import psutil
import datetime


app = FastAPI()


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

    tempo = psutil.boot_time()

    return{
        "O sistema foi ligado em": datetime.datetime.fromtimestamp(tempo).strftime("%Y-%m-%d %H:%M:%S")
    }