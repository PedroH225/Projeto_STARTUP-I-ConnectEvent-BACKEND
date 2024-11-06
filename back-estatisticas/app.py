from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd

import matplotlib
matplotlib.use('Agg')
from matplotlib.ticker import MaxNLocator
import matplotlib.pyplot as plt

from typing import List
from io import BytesIO
from fastapi.responses import StreamingResponse
from collections import Counter


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



class Usuario(BaseModel):
    id: int
    email: str
    idade: int
    genero: str
    estado: str
    cidade: str

@app.post("/gerar-pizza-genero")
def gerarGraficoPizzaGenero(usuarios: list[Usuario]):
    # Contando a quantidade de cada gênero
    generos = [usuario.genero for usuario in usuarios]
    contagem_generos = Counter(generos)

    # Extraindo os dados para o gráfico
    labels = list(contagem_generos.keys())
    sizes = list(contagem_generos.values())

    # Criando o gráfico de pizza
    plt.figure(figsize=(7, 7))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90, colors=['skyblue', 'lightcoral', 'lightgreen'])

    # Título
    plt.title('Distribuição de Gênero dos Participantes')

    # Salvando o gráfico em um buffer de bytes
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    plt.close()

    # Retornando o gráfico como uma imagem
    return StreamingResponse(buffer, media_type="image/png")


# Endpoint para gerar o gráfico de distribuição de idade
@app.post("/gerar-histo-idade")
def gerarHistogramaIdade(usuarios: list[Usuario]):
    # Extraindo as idades dos participantes
    idades = [usuario.idade for usuario in usuarios]
    
    # Criando o histograma de idades
    plt.figure(figsize=(10, 6))
    plt.hist(idades, bins=range(min(idades), max(idades) + 2, 2), color='skyblue', edgecolor='black', alpha=0.7)
    plt.xlabel("Faixa Etária")
    plt.ylabel("Número de Participantes")
    plt.title("Distribuição de Idade dos Participantes")

    plt.gca().yaxis.set_major_locator(MaxNLocator(integer=True))
    plt.gca().xaxis.set_major_locator(MaxNLocator(integer=True))

    # Salvando o gráfico em um buffer de bytes
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    plt.close()

    # Retornando o gráfico como uma imagem
    return StreamingResponse(buffer, media_type="image/png")