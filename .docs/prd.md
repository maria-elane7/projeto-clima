# PRD — Projeto Clima

## 1. Visão geral

### Nome do projeto

**Clima**

### Objetivo

Desenvolver uma aplicação web que permita ao usuário pesquisar uma cidade e visualizar suas principais condições climáticas atuais.

O usuário informará o nome de uma cidade em um campo de busca. A aplicação deverá:

1. Buscar a cidade na API de geocodificação do Open-Meteo.
2. Obter latitude e longitude da cidade encontrada.
3. Utilizar essas coordenadas para consultar as condições climáticas atuais.
4. Exibir as informações de forma organizada e responsiva.

O projeto também tem como objetivo praticar **JavaScript/TypeScript, consumo de APIs, organização de código e desacoplamento de responsabilidades**.

---

# 2. Stack

O projeto deverá utilizar:

* **Vite** — ferramenta de desenvolvimento e build.
* **TypeScript** — linguagem principal.
* **Vanilla** — HTML, CSS e TypeScript, sem frameworks como React ou Vue.
* **Open-Meteo** — APIs de geocodificação e previsão/condições climáticas.

---

# 3. API

O projeto utilizará duas APIs do Open-Meteo.

## 3.1 Geocodificação

Responsável por encontrar a cidade pesquisada e retornar suas coordenadas.

```text
https://geocoding-api.open-meteo.com/v1/search?name={NOME_DA_CIDADE}&count=1&language=pt&format=json&countryCode=BR
```

### Parâmetros

* `name` — nome da cidade pesquisada.
* `count=1` — retornar apenas um resultado.
* `language=pt` — informações em português.
* `format=json` — resposta em JSON.
* `countryCode=BR` — restringir a busca ao Brasil.

### Dados necessários da resposta

A aplicação deverá utilizar, principalmente:

* Nome da cidade.
* Código do país.
* Latitude.
* Longitude.

---

## 3.2 Dados climáticos

Depois de obter latitude e longitude, a aplicação deverá consultar:

```text
https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,precipitation,weather_code
```

### Dados atuais utilizados

A aplicação deverá trabalhar com:

* `temperature_2m` — temperatura atual.
* `relative_humidity_2m` — umidade relativa.
* `apparent_temperature` — temperatura aparente.
* `is_day` — indica se é dia ou noite.
* `wind_speed_10m` — velocidade do vento.
* `wind_direction_10m` — direção do vento.
* `precipitation` — precipitação.
* `weather_code` — código da condição climática.

---

# 4. Regra de desacoplamento

A interface **não deverá realizar requisições diretamente para as APIs**.

As requisições deverão ser centralizadas em funções responsáveis por comunicação com serviços externos.

### Fluxo esperado

```text
Interface
   ↓
Função de busca
   ↓
Serviço/API
   ↓
Retorno dos dados
   ↓
Interface
```

Por exemplo:

```text
Usuário pesquisa "Belém"
        ↓
handleSearch()
        ↓
getCity("Belém")
        ↓
API de Geocoding
        ↓
latitude + longitude
        ↓
getWeather(latitude, longitude)
        ↓
API de clima
        ↓
dados climáticos
        ↓
renderWeather()
        ↓
Interface
```

A camada responsável pela API deverá ser independente da camada responsável pela interface.

---

# 5. Estrutura sugerida

Uma possível organização:

```text
src/
├── api/
│   ├── geocoding.ts
│   └── weather.ts
│
├── types/
│   └── weather.ts
│
├── services/
│   └── weatherService.ts
│
├── components/
│   └── weatherCard.ts
│
├── utils/
│   └── weatherCode.ts
│
├── main.ts
├── style.css
└── index.html
```

### Responsabilidades

#### `api/geocoding.ts`

Responsável exclusivamente pela comunicação com a API de geocodificação.

Exemplo conceitual:

```text
getCity(cityName)
```

---

#### `api/weather.ts`

Responsável exclusivamente pela comunicação com a API climática.

Exemplo conceitual:

```text
getWeather(latitude, longitude)
```

---

#### `services/weatherService.ts`

Responsável por organizar o fluxo entre as APIs.

Exemplo:

```text
buscar cidade
    ↓
obter coordenadas
    ↓
buscar clima
    ↓
retornar dados necessários para a aplicação
```

---

#### `types/weather.ts`

Responsável pelas tipagens utilizadas no projeto.

As respostas das APIs deverão possuir tipos definidos em TypeScript sempre que possível.

---

#### `utils/weatherCode.ts`

Responsável por transformar os códigos meteorológicos retornados pela API em informações compreensíveis para o usuário.

Exemplo:

```text
weather_code
      ↓
descrição
      ↓
"Chuva"
```

---

# 6. UX / Interface

## 6.1 Container principal

A aplicação deverá possuir um container centralizado.

### Requisitos

* Largura máxima: **800px**.
* Centralizado horizontalmente.
* Fundo branco.
* Bordas arredondadas.
* Espaçamento interno.
* Deve funcionar bem em telas menores.

---

# 7. Background

O background geral da página deverá ser:

* Cinza escuro.

O contraste deverá destacar o container branco principal.

Estrutura visual:

```text
┌────────────────────────────────────────────┐
│                                            │
│              🔍 Buscar cidade              │
│                                            │
│  ┌──────────────┬────────────────────────┐  │
│  │              │                        │  │
│  │   SIDEBAR    │       PRINCIPAL        │  │
│  │              │                        │  │
│  │ Temperatura  │ Umidade                │  │
│  │ Cidade       │ Temp. aparente         │  │
│  │ Data         │ Precipitação            │  │
│  │ Dia/Noite    │ Vento                  │  │
│  │ Clima        │                        │  │
│  │              │                        │  │
│  └──────────────┴────────────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

---

# 8. Área de busca

A área superior deverá ficar centralizada.

### Elementos

* Campo de texto.
* Botão de busca.

### Exemplo

```text
┌──────────────────────────────────┐
│ Digite o nome da cidade...  🔍   │
└──────────────────────────────────┘
```

### Comportamento

Ao pesquisar:

1. Capturar o nome digitado.
2. Validar se o campo não está vazio.
3. Solicitar a cidade à API de geocodificação.
4. Obter latitude e longitude.
5. Solicitar os dados climáticos.
6. Atualizar a interface.

---

# 9. Sidebar

A sidebar deverá ficar no lado esquerdo do conteúdo climático.

Ela deverá apresentar as informações principais.

## Informações

### Temperatura

Exibir a temperatura atual.

Exemplo:

```text
28°C
```

---

### Cidade

Exibir:

```text
Belém
BR
```

Ou uma representação equivalente:

```text
Belém, BR
```

---

### Data atual

Exibir o dia atual relacionado aos dados apresentados.

Exemplo:

```text
17 de setembro de 2026
```

---

### Dia ou noite

Utilizar o campo:

```text
is_day
```

Regra:

```text
is_day = 1 → Dia
is_day = 0 → Noite
```

A interface poderá apresentar:

```text
☀️ Dia
```

ou

```text
🌙 Noite
```

---

### Condição climática

Utilizar o:

```text
weather_code
```

O código deverá ser convertido para uma descrição compreensível.

Exemplo:

```text
weather_code → 61
```

Resultado visual:

```text
🌧️ Chuva
```

---

# 10. Área principal

A área principal deverá apresentar informações climáticas complementares.

## Umidade relativa

Utilizar:

```text
relative_humidity_2m
```

Exemplo:

```text
💧 Umidade

82%
```

---

## Temperatura aparente

Utilizar:

```text
apparent_temperature
```

Exemplo:

```text
🌡️ Sensação térmica

31°C
```

---

## Precipitação

Utilizar:

```text
precipitation
```

Exemplo:

```text
🌧️ Precipitação

0.4 mm
```

---

## Vento

Utilizar:

```text
wind_speed_10m
```

e:

```text
wind_direction_10m
```

Exemplo:

```text
💨 Vento

12 km/h
```

e:

```text
Direção: 180°
```

---

# 11. Estado inicial

Ao abrir a aplicação, nenhum clima precisa estar sendo exibido.

A interface poderá apresentar uma mensagem orientando o usuário:

```text
Pesquise uma cidade para visualizar as condições climáticas.
```

---

# 12. Loading

Durante a comunicação com as APIs, a aplicação deverá informar ao usuário que os dados estão sendo carregados.

Exemplo:

```text
Carregando informações climáticas...
```

O estado de carregamento deverá impedir que o usuário tenha a impressão de que a aplicação não respondeu.

---

# 13. Tratamento de erros

A aplicação deverá tratar possíveis erros durante o fluxo.

### Campo vazio

Caso o usuário tente pesquisar sem informar uma cidade:

```text
Digite o nome de uma cidade.
```

### Cidade não encontrada

Caso a API não encontre resultados:

```text
Cidade não encontrada.
```

### Erro na API

Caso ocorra algum problema de comunicação:

```text
Não foi possível obter os dados climáticos.
Tente novamente.
```

### Erro inesperado

Erros inesperados também deverão ser tratados para evitar que a aplicação quebre silenciosamente.

---

# 14. Responsividade

Embora o container tenha no máximo **800px**, a aplicação deverá funcionar em dispositivos menores.

Em telas pequenas:

```text
Desktop

┌──────────────┬────────────────────┐
│   Sidebar    │      Principal     │
└──────────────┴────────────────────┘
```

poderá se transformar em:

```text
Mobile

┌────────────────────────────┐
│          Sidebar           │
├────────────────────────────┤
│         Principal          │
└────────────────────────────┘
```

A sidebar deverá passar para cima da área principal.

---

# 15. Requisitos funcionais

### RF01 — Pesquisar cidade

O usuário deverá conseguir pesquisar uma cidade pelo nome.

### RF02 — Obter localização

A aplicação deverá obter latitude e longitude da cidade pesquisada.

### RF03 — Obter clima

A aplicação deverá consultar os dados climáticos utilizando as coordenadas.

### RF04 — Exibir temperatura

A temperatura atual deverá ser exibida em destaque.

### RF05 — Exibir localização

A cidade e o código do país deverão ser exibidos.

### RF06 — Exibir data

A data atual deverá ser apresentada.

### RF07 — Identificar dia/noite

A aplicação deverá utilizar `is_day` para determinar se é dia ou noite.

### RF08 — Exibir condição climática

O `weather_code` deverá ser convertido em uma descrição compreensível.

### RF09 — Exibir umidade

Deverá apresentar a umidade relativa atual.

### RF10 — Exibir temperatura aparente

Deverá apresentar a temperatura aparente.

### RF11 — Exibir precipitação

Deverá apresentar o valor de precipitação retornado pela API.

### RF12 — Exibir vento

Deverá apresentar velocidade e direção do vento.

### RF13 — Exibir loading

A aplicação deverá informar quando estiver buscando dados.

### RF14 — Tratar erros

A aplicação deverá apresentar mensagens amigáveis em caso de falha.

---

# 16. Requisitos técnicos

### RT01 — Vite

O projeto deverá utilizar Vite como ferramenta de desenvolvimento.

### RT02 — TypeScript

O código da aplicação deverá ser desenvolvido em TypeScript.

### RT03 — Vanilla

Não utilizar frameworks de interface como React, Vue ou Angular.

### RT04 — Desacoplamento

A camada de interface não deverá realizar `fetch()` diretamente.

### RT05 — Funções de API

As requisições deverão ser realizadas através de funções específicas.

Exemplo:

```text
getCity()
getWeather()
```

### RT06 — Tipagem

As respostas utilizadas pela aplicação deverão possuir interfaces ou `type` apropriados.

### RT07 — Separação de responsabilidades

Cada módulo deverá possuir uma responsabilidade clara.

### RT08 — Tratamento de erros

As funções responsáveis pelas APIs deverão tratar erros de requisição.

---

# 17. Fluxo principal da aplicação

```text
                    USUÁRIO
                       │
                       ▼
              Digita uma cidade
                       │
                       ▼
                  Buscar cidade
                       │
                       ▼
              getCity(cityName)
                       │
                       ▼
             API Geocoding Open-Meteo
                       │
                       ▼
             Latitude + Longitude
                       │
                       ▼
          getWeather(lat, longitude)
                       │
                       ▼
              API Weather Open-Meteo
                       │
                       ▼
                 Dados climáticos
                       │
                       ▼
              Processar informações
                       │
                       ▼
                Atualizar interface
                       │
                       ▼
                    USUÁRIO
```

---

# 18. Critérios de aceite

O projeto será considerado funcional quando:

* [ ] O usuário conseguir digitar uma cidade.
* [ ] A busca consultar a API de geocodificação.
* [ ] A aplicação obter latitude e longitude.
* [ ] A aplicação utilizar as coordenadas para consultar o clima.
* [ ] A interface não realizar `fetch()` diretamente.
* [ ] As requisições estiverem encapsuladas em funções/módulos.
* [ ] A temperatura atual for exibida.
* [ ] Nome da cidade e código do país forem exibidos.
* [ ] A data for exibida.
* [ ] Dia/noite for determinado através de `is_day`.
* [ ] O `weather_code` for convertido em uma descrição.
* [ ] A umidade relativa for exibida.
* [ ] A temperatura aparente for exibida.
* [ ] A precipitação for exibida.
* [ ] A velocidade do vento for exibida.
* [ ] A direção do vento for exibida.
* [ ] Existir estado de carregamento.
* [ ] Existirem mensagens de erro.
* [ ] O layout possuir no máximo 800px de largura.
* [ ] O container principal possuir fundo branco e bordas arredondadas.
* [ ] O background da página for cinza escuro.
* [ ] A interface funcionar em telas menores.
* [ ] O projeto estiver desenvolvido com Vite + TypeScript + Vanilla.

---

# 19. Objetivo de aprendizado

Além de entregar uma aplicação funcional, o projeto deverá servir para praticar:

* TypeScript.
* Vite.
* Consumo de APIs.
* `fetch`.
* `async/await`.
* Promises.
* Tratamento de erros.
* Tipagem de respostas de APIs.
* Manipulação do DOM.
* Eventos.
* Separação de responsabilidades.
* Desacoplamento.
* Organização de arquivos.
* Funções e módulos.
* Transformação de dados.
* Estados de loading e erro.

O foco principal do projeto será **aprender a construir uma aplicação consumindo APIs de maneira organizada e desacoplada**, evitando colocar toda a lógica dentro do arquivo principal ou diretamente nos eventos da interface.
