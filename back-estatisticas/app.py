from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import matplotlib.pyplot as plt
from typing import List
from io import BytesIO
from fastapi.responses import StreamingResponse


app = FastAPI()

# Modelo para o JSON recebido
class Data(BaseModel):
    values: List[int]  # Lista de inteiros

@app.post("/generate-chart")
def generate_chart(data: Data):
    # Convertendo a lista de valores em um DataFrame
    df = pd.DataFrame({"values": data.values})

    # Criando o gráfico
    plt.figure(figsize=(10, 6))
    df['values'].plot(kind="bar", color="skyblue")
    plt.xlabel("Índice")
    plt.ylabel("Valor")
    plt.title("Gráfico de Barras dos Valores")

    # Salvando o gráfico em um buffer de bytes
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    plt.close()

    # Retornando o gráfico como uma imagem
    return StreamingResponse(buffer, media_type="image/png")