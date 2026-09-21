# Checklist de implementação — Projeto Clima

Base de referência: [prd.md](./prd.md)

Este documento é um guia de execução incremental. Ele não repete todo o PRD; ele organiza as entregas em tarefas pequenas, cada uma com critérios de aprovação claros para que cada agente IA conclua uma etapa específica antes de seguir para a próxima.

Importante:
- Cada tarefa abaixo deve ser entregue de forma isolada, em sequência.
- Cada item deve ficar com checkbox `[ ]` para marcação de progresso.
- Antes de marcar como concluída, o agente deve validar o critério de aprovação da tarefa.
- A referência oficial da regra de negócio continua sendo [prd.md](./prd.md).

---

## Tarefa 1 — Configuração inicial do projeto

- [x] Verificar que o projeto Vite + TypeScript está funcionando.
- [x] Confirmar que `npm install` e `npm run dev` iniciam corretamente.
- [x] Criar a estrutura sugerida da aplicação conforme seção 5 do PRD.
- [x] Garantir que existam as pastas `src/api`, `src/services`, `src/types`, `src/utils` e `src/components`.
- [x] Ajustar o `src/main.ts` para receber a interface inicial.

Critério de aprovação:
- O projeto roda localmente sem erros no terminal.
- A estrutura de pastas está em conformidade com a proposta do PRD.
- A aplicação inicia com o ambiente básico pronto para receber a lógica da feature.

Referência: [prd.md](./prd.md) — seções 2, 5, 16, 18.

---

## Tarefa 2 — Definição de tipos e utilitários

- [x] Criar tipos para a resposta da geocodificação.
- [x] Criar tipos para a resposta climática.
- [x] Definir um tipo central para os dados da UI que serão exibidos ao usuário.
- [x] Implementar a conversão de `weather_code` para descrição legível.
- [x] Implementar a formatação da data para o padrão brasileiro.
- [x] Definir a regra de exibição de dia/noite com base em `is_day`.

Critério de aprovação:
- Todas as respostas da API possuem interfaces ou tipos explícitos.
- O código consegue transformar `weather_code` em texto humano, como "Chuva".
- A data e o status de dia/noite são tratados de forma consistente.

Referência: [prd.md](./prd.md) — seções 3, 5, 9, 10, 16.

---

## Tarefa 3 — API de geocodificação

- [x] Criar `src/api/geocoding.ts`.
- [x] Implementar a função `getCity(cityName)`.
- [x] Construir a URL com os parâmetros da API de geocodificação.
- [x] Fazer a requisição com `fetch()`.
- [x] Validar a resposta HTTP.
- [x] Tratar erro quando a cidade não for encontrada.
- [x] Retornar `name`, `countryCode`, `latitude` e `longitude`.

Critério de aprovação:
- A função realiza a busca de forma isolada e sem lógica de interface.
- Quando a cidade existe, retorna as coordenadas corretamente.
- Quando não existe, retorna erro amigável conforme o PRD.

Referência: [prd.md](./prd.md) — seções 3.1, 4, 13, 15, 16.

---

## Tarefa 4 — API climática

- [x] Criar `src/api/weather.ts`.
- [x] Implementar a função `getWeather(latitude, longitude)`.
- [x] Construir a URL com os parâmetros climáticos exigidos.
- [x] Incluir os campos de temperatura, umidade, sensação térmica, vento, precipitação e `weather_code`.
- [x] Fazer a requisição com `fetch()`.
- [x] Validar resposta e tratar falhas de comunicação.
- [x] Retornar os dados em formato tipado.

Critério de aprovação:
- A camada de API não depende de DOM ou eventos da interface.
- O retorno contém os campos necessários para renderizar a tela.
- Falhas na API são tratadas sem quebrar a aplicação.

Referência: [prd.md](./prd.md) — seções 3.2, 4, 13, 15, 16.

---

## Tarefa 5 — Serviço de orquestração do fluxo de busca

- [x] Criar `src/services/weatherService.ts`.
- [x] Implementar o fluxo: nome da cidade → geocodificação → coordenadas → clima.
- [x] Validar se o nome da cidade foi informado.
- [x] Tratar erro de cidade vazia.
- [x] Tratar erro de cidade não encontrada.
- [x] Tratar erro de falha na API.
- [x] Retornar um objeto organizado para a UI.

Critério de aprovação:
- A interface não faz `fetch()` diretamente.
- O serviço centraliza o fluxo principal da aplicação.
- A resposta final está pronta para ser renderizada na tela.

Referência: [prd.md](./prd.md) — seções 4, 5, 13, 15, 16, 17.

---

## Tarefa 6 — Estado inicial, loading e mensagens de erro

- [x] Exibir mensagem inicial quando a aplicação abrir: "Pesquise uma cidade para visualizar as condições climáticas."
- [x] Implementar o estado de loading com mensagem: "Carregando informações climáticas..."
- [x] Bloquear múltiplas buscas simultâneas durante o carregamento.
- [x] Exibir validação para campo vazio: "Digite o nome de uma cidade."
- [x] Exibir erro de cidade não encontrada: "Cidade não encontrada."
- [x] Exibir erro genérico de API: "Não foi possível obter os dados climáticos. Tente novamente."

Critério de aprovação:
- A interface informa claramente ao usuário o status atual.
- O carregamento aparece enquanto a busca está em andamento.
- As mensagens de erro seguem o comportamento previsto pelo PRD.

Referência: [prd.md](./prd.md) — seções 11, 12, 13, 15, 18.

---

## Tarefa 7 — Estrutura visual e layout principal

- [x] Criar o container principal centralizado com largura máxima de 800px.
- [x] Definir fundo da página em cinza escuro.
- [x] Criar a área de busca no topo.
- [x] Criar a sidebar esquerda e a área principal direita.
- [x] Definir bordas arredondadas, espaçamento interno e visual limpo.
- [x] Preparar o layout para responsividade.

Critério de aprovação:
- O layout está centralizado e com visual consistente com o PRD.
- A estrutura visual mantém a divisão de sidebar e conteúdo principal.
- O design funciona em desktop e se prepara para mobile.

Referência: [prd.md](./prd.md) — seções 6, 7, 9, 10, 14.

---

## Tarefa 8 — Busca por cidade e interação do usuário

- [x] Criar campo de texto para nome da cidade.
- [x] Criar botão de busca.
- [x] Capturar o valor digitado pelo usuário.
- [x] Validar input vazio antes da consulta.
- [x] Disparar a busca ao clicar no botão.
- [x] Permitir a busca também ao pressionar Enter.
- [x] Chamar o serviço de busca e atualizar a interface com o resultado.

Critério de aprovação:
- O usuário consegue pesquisar uma cidade e a aplicação responde corretamente.
- O fluxo respeita as regras de validação e erro.
- O comportamento da busca está alinhado ao requisito RF01.

Referência: [prd.md](./prd.md) — seções 8, 15, 17, 18.

---

## Tarefa 9 — Renderização da sidebar

- [x] Exibir a temperatura atual em destaque.
- [x] Exibir cidade e código do país.
- [x] Exibir a data atual formatada em português.
- [x] Exibir se é dia ou noite com base em `is_day`.
- [x] Mostrar a descrição do clima convertida por `weather_code`.

Critério de aprovação:
- A sidebar mostra as informações principais solicitadas no PRD.
- Os dados estão visíveis e bem organizados.
- Os requisitos RF04, RF05, RF06, RF07 e RF08 estão atendidos.

Referência: [prd.md](./prd.md) — seções 9, 15, 18.

---

## Tarefa 10 — Renderização da área principal

- [x] Exibir umidade relativa com unidade `%`.
- [x] Exibir sensação térmica.
- [x] Exibir precipitação.
- [x] Exibir velocidade do vento.
- [x] Exibir direção do vento.
- [x] Formatar os valores para leitura do usuário.

Critério de aprovação:
- A área principal mostra todos os dados complementares solicitados.
- Os valores aparecem com unidades legíveis e visíveis.
- Os requisitos RF09, RF10, RF11 e RF12 são atendidos.

Referência: [prd.md](./prd.md) — seções 10, 15, 18.

---

## Tarefa 11 — Responsividade e ajustes finais

- [x] Ajustar o layout para telas menores.
- [x] Empilhar a sidebar e área principal em mobile.
- [x] Garantir que o container continue centralizado.
- [x] Ajustar espaçamento e tamanhos para mobile.
- [x] Validar a aparência em desktop e mobile.

Critério de aprovação:
- O layout funciona em telas pequenas sem quebra visual.
- A interface mantém a lógica e a organização esperadas do PRD.
- A responsividade está funcional e consistente com o requisito de UX.

Referência: [prd.md](./prd.md) — seções 14, 18.

---

## Tarefa 12 — Validação final contra o PRD

- [x] Verificar RF01 a RF14.
- [x] Confirmar que não há `fetch()` na camada de interface.
- [x] Confirmar que a aplicação usa Vite + TypeScript + Vanilla.
- [x] Validar que a comunicação com as APIs está desacoplada em módulos específicos.
- [x] Validar tratamento de erros e estados de loading.
- [x] Testar uma busca bem-sucedida e uma falha.

Critério de aprovação:
- Todos os requisitos funcionais e técnicos do PRD foram conferidos.
- A implementação está pronta para entrega.
- Não há inconsistências entre a aplicação e os critérios de aceite do projeto.

Referência: [prd.md](./prd.md) — seções 15, 16, 18, 19.

---

## Ordem de execução recomendada

1. Tarefa 1
2. Tarefa 2
3. Tarefa 3
4. Tarefa 4
5. Tarefa 5
6. Tarefa 6
7. Tarefa 7
8. Tarefa 8
9. Tarefa 9
10. Tarefa 10
11. Tarefa 11
12. Tarefa 12

Essa sequência evita entregar funcionalidade sem base sólida e respeita o princípio de desenvolvimento incremental exigido pelo projeto.
