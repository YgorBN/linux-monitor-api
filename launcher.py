import webbrowser
import threading
import time
import uvicorn
from main import app

def abrir_navegador():
    time.sleep(3)
    webbrowser.open("http://127.0.0.1:8000")

if __name__ == "__main__":
    threading.Thread(target=abrir_navegador).start()

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000
    )