# Clima

Aplicacao web para consultar as condicoes climaticas atuais de cidades brasileiras. O projeto foi desenvolvido com TypeScript e Vite e utiliza as APIs publicas da Open-Meteo.

## Funcionalidades

- Busca de cidades brasileiras por nome.
- Exibicao da temperatura atual.
- Sensacao termica e umidade relativa do ar.
- Precipitacao e velocidade do vento.
- Direcao do vento.
- Indicacao do periodo do dia e descricao das condicoes climaticas.
- Mensagens de carregamento, sucesso e erro.
- Layout responsivo para diferentes tamanhos de tela.

## Tecnologias

- TypeScript
- Vite
- HTML e CSS
- Open-Meteo Geocoding API
- Open-Meteo Weather API

## Requisitos

- Node.js 22 ou superior
- npm

## Executando localmente

1. Clone o repositorio:

   ```bash
   git clone https://github.com/maria-elane7/projeto-clima.git
   cd projeto-clima
   ```

2. Instale as dependencias:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra no navegador a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Scripts

| Comando | Descricao |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Executa a verificacao TypeScript e gera a versao de producao em `dist`. |
| `npm run preview` | Abre localmente uma previa do build de producao. |

## Build de producao

Para gerar os arquivos otimizados:

```bash
npm run build
```

O resultado sera criado no diretorio `dist`.

## Deploy

O projeto possui um workflow em `.github/workflows/deploy-pages.yml`. A cada push na branch `main`, o GitHub Actions:

1. Instala as dependencias com `npm ci`.
2. Executa `npm run build`.
3. Publica o diretorio `dist` no GitHub Pages.

O site publicado esta disponivel em:

<https://maria-elane7.github.io/projeto-clima/>

Para habilitar o deploy, no repositorio do GitHub acesse **Settings > Pages** e selecione **GitHub Actions** como fonte.

## APIs

- [Open-Meteo](https://open-meteo.com/)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Weather API](https://open-meteo.com/en/docs)

## Estrutura principal

```text
src/
├── api/                 # Comunicacao com as APIs externas
├── services/            # Regras de consulta e composicao dos dados
├── types/               # Tipos das respostas e do dominio
├── utils/               # Conversao de codigos meteorologicos
├── main.ts              # Interface e eventos da aplicacao
└── style.css            # Estilos da interface
```
