# Desafio de API de Tasks

## Introdução

Olá, Devs!

Este desafio tem como objetivo reforçar os conceitos aprendidos no módulo, além de promover o desenvolvimento prático das habilidades adquiridas.

Lembre-se de que, embora este seja um desafio, é uma oportunidade para aprender e aprimorar suas habilidades. Mantenha a calma e confie no seu processo de aprendizado.

## Sobre o desafio

Neste desafio, desenvolvemos uma API para realizar operações CRUD em suas tarefas (*tasks*).

A API deve oferecer as seguintes funcionalidades:

- Criação de uma tarefa
- Listagem de todas as tarefas
- Atualização de uma tarefa pelo `id`
- Remoção de uma tarefa pelo `id`
- Marcação de uma tarefa como completa pelo `id`
- Importação de tarefas em massa através de um arquivo CSV

### Estrutura da Tarefa e Rotas

Antes de definir as rotas, vamos entender a estrutura das tarefas:

- `id`: Identificador único de cada tarefa
- `title`: Título da tarefa
- `description`: Descrição detalhada da tarefa
- `completed_at`: Data de conclusão da tarefa. Inicialmente, deve ser `null`
- `created_at`: Data de criação da tarefa
- `updated_at`: Data da última atualização da tarefa

A seguir, as rotas da API:

- `POST - /tasks`
    
    Cria uma nova tarefa no banco de dados. Os campos `title` e `description` devem ser enviados no corpo da requisição.
    
    Os campos `id`, `created_at`, `updated_at` e `completed_at` são preenchidos automaticamente.
    
- `GET - /tasks`
    
    Lista todas as tarefas salvas no banco de dados.
    
    Permite a busca e filtragem das tarefas por `title` e `description`.
    
- `PUT - /tasks/:id`
    
    Atualiza uma tarefa existente pelo `id`.
    
    O corpo da requisição deve conter apenas o `title` e/ou `description` a serem atualizados.
    
    Se apenas o `title` for enviado, o `description` não será alterado e vice-versa.
    
    Antes da atualização, valida se o `id` corresponde a uma tarefa existente no banco de dados.
    
- `DELETE - /tasks/:id`
    
    Remove uma tarefa pelo `id`.
    
    Antes da remoção, valida se o `id` corresponde a uma tarefa existente no banco de dados.
    
- `PATCH - /tasks/:id/complete`
    
    Marca a tarefa como completa ou não. Se a tarefa estiver concluída, volta ao estado normal.
    
    Antes da alteração, valida se o `id` corresponde a uma tarefa existente no banco de dados.
    

### Importação de CSV

A importação de um CSV normalmente é feita enviando o arquivo através do formato `multipart/form-data`. Neste desafio, a importação será feita de outra forma. Consulte a [página de explicação](https://www.notion.so/Cria-o-via-CSV-com-Stream-21ba6d279991473792787d9265212181?pvs=21) para mais detalhes.

### Tecnologias usadas

- Nodejs
- Stream
- CSV-parser