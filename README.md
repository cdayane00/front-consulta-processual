Front-end feito em ReactJs.


* Foi criado um componente "Home" que contém uma página de busca.
* Foi criado um componente "Processo" que contém uma página de busca e a exibição dos dados do processo.

* A função fetchProcessos faz uma requisição para url do deploy do back-end passando como parâmetro o número do cnj. -> https://consulta-processual.herokuapp.com/:cnj



# Para rodar o projeto:

- Digite no terminal:

    ```jsx
    npm start
    ```
- irá abrir no navegador http://localhost:3000/

# Rotas

- A rota "/" é a página Home
- A rota "/:cnj é a página Processo. Você deve inserir no input ou na url o número do processo para ele ser exibido.


Foi feito deploy do Front-end na ferramenta "Vercel".
Link: https://vercel.com
# Deploy

- Acesse o site https://www.vercel.com
- Clique no botão "Start Deploying"
- Clique no botão "Continue with GitHub"
- Clique em "Add Github Org or Account" e adicione sua conta
- Selecione o projeto que deseja fazer deploy
- Selecione sua conta pessoal
- Clique no botão "Deploy"
- Clique no botão "Visit" para ver seu site no ar :)
