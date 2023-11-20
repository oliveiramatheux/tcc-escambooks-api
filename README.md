#### Back-end para web site, plataforma Rede social para troca de livros

- 💬 Descrição e objetivo: Criar o serviço da rede social.

#### 🚧 Status do Projeto 🚀 Em andamento, início dia 12/04/2023 🚧

# Tabela de conteúdos

<!--ts-->

- [Tabela de Conteudo](#Tabela-de-conteúdos)
- [Pré-Requisitos Front-End](#Pré-requisitos-Front_End)
- [Pré-Requisitos Back_End](#Pré-requisitos-Back_End)
- [Configurações](#🎲-Configurações) -> [NodeMailer](#NodeMailer); [MongoDB](#MongoDB); [.env](#.env)
- [Tecnologias](#🛠-Tecnologias)
- [Autores](#autores)
  <!--te-->
  <br>


### Pré-Requisitos Back_End

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Nodejs](https://nodejs.org/en/).<br>
Ter um editor para trabalhar com o código é recomendado, como o [Visual Studio Code](https://code.visualstudio.com/).<br><br>

Para o back-end é necessário criar uma conta e um cluster no [mongoDB Atlas](https://www.mongodb.com/) para isso siga <br> o passo a passo nas [Configurações](#MongoDB) do MongoDB

### Pré-Requisitos Front_End

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Nodejs](https://nodejs.org/en/).<br>
Além disto é bom ter um editor para trabalhar com o código como o [Visual Studio Code](https://code.visualstudio.com/).<br><br>

Após finalizar as configurações do back-end, veja as configurações do front <a href="https://github.com/oliveiramatheux/tcc-escambooks-front#readme">aqui</a>


### 🎲 Configurações

Todas as configurações necessárias estão nessa seção

#### NodeMailer

O projeto está configurado para mandar email através de um endereço de uma conta do google criada por nós, mas deve ser utilizada uma outra conta. Para isso deve-se seguir o passo a passo abaixo:

- Criar uma conta do google do projeto (Pode-se utilizar a mesma do firebase)
- Acesse o arquivo na auth.ts na pasta src/config e troque o defaultEmailForm pelo email do projeto que deseja utilizar.
- Vá nas configurações de conta do google, ative a verificação em 2 fatores (2FA) caso não tenha ativado e gere uma senha de APP
- Coloque-a no .env SEM ESPAÇOS no campo APP_EMAIL_SENDER_PASS.

#### MongoDB

Para conectar o projeto a uma base de dados é necessário criar uma conta e um cluster no mongoDB atlas, segue o passo a passo:

-------Usuário-------
- Crie uma conta no MongoDB (pode ser utilizado login com o google)
- Crie uma organização (que pode conter vários projetos)
- Crie um projeto dentro da organização criada
- No projeto, no menu lateral clique em "Database Access", será possível ver o usuário que possui acesso ao projeto
- Clique em "ADD NEW DATABASE USER" para criar um novo usuário (Aplicação)
- Insira o nome de usuário (Recomenda-se associar com a aplicação)
- Gere uma senha segura clicando em "Autogenerate Secure Password" e anote-a (não é possível recuperá-la) somente criando outra editando-a caso perca. E clique em "Add User".

-------Cluster-------
- Clique em Database no menu lateral do projeto e clique em "+ Create" para criar um Cluster
- Escolha tipo de servidor (Dedicado ou compartilhado(<strong>grátis</strong>)) e o provedor Cloud (Azure, AWS ou Google Cloud)
- No cluster clique em "Connect"
- Selecione a primera opção "Drivers" e selecione Driver "Node.js" e Version "5.5 or later"
- Para instalar utilize yarn install mongoDB (item 2)
- Uma string será dada dessa forma para AWS (item 3): mongodb+srv://nomedoUsuario:<password>@nomeDoCluster.nbbnesd.mongodb.net/?retryWrites=true&w=majority
- Para finalizar as configurações veja o [.env](#.env) abaixo


#### .env

```bash
APP_PORT=PORTAbackend
DB_USER=nomedoUsuario-MongoDB
DB_PASSWORD=Senha #Definida junto com nome do usuario no mongo
DB_NAME=nomeCluster #Definido na criação desse
DB_HOST=nomedoCluster.URL #URL definida pelo provedor cloud (dada na tela de conexão)
APP_TOKEN_SECRET=TOKENSECRET #Contactar devs owners para obter
APP_FRONT_URL=http://localhost:FrontPORT
APP_EMAIL_SENDER_PASS=SenhaAppEmail #Obter na conta do google (vide config nodemailer)
APP_ENV=PRD #Para funcionar database requer essa Env
```

Após setar as variáveis no .env abra um terminal e digite o comando "yarn dev" para rodar o back-end, <br>
no terminal deve aparecer as seguintes mensagens (Server up, listening on "Numero da Porta" | "Connected to MongoDB").

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Nodejs](https://nodejs.org/en/)
- [MongoDB Atlas](https://www.mongodb.com/)
- [NodeMailer](https://nodemailer.com/)
- [Express.js](https://expressjs.com/pt-br/)
- [Middleware-Celebrate](https://www.npmjs.com/package/celebrate)
- [Jest](https://jestjs.io/pt-BR/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Autores

<div>
  <img style="border-radius: 50%;" src="https://media.licdn.com/dms/image/C4D03AQEN5MndpcR7Rg/profile-displayphoto-shrink_800_800/0/1613396220155?e=1706140800&v=beta&t=wD-6BuaUEHSPPBVLZbQcSuMQjX3tQdU2D5W94x_K0jY" width="100px;" alt=""/> <!-- Matheus  -->
  <img style="border-radius: 50%;" src="https://media.licdn.com/dms/image/C4D03AQE_XlWds1qORg/profile-displayphoto-shrink_800_800/0/1646512221130?e=1706140800&v=beta&t=SsnJRaf9MaFCpMUjBahLMSF02BmxBnDPkJU5q_NkCbE" width="100px;" alt=""/> <!-- Eric  -->
  <img style="border-radius: 50%;" src="https://media.licdn.com/dms/image/D4D03AQFSRHVNtz9Fjg/profile-displayphoto-shrink_800_800/0/1685025769328?e=1706140800&v=beta&t=fvz6PxqFlXbIEFdI50qQSzjn_CSAKtuku1rkjUyYIFs" width="100px;" alt=""/> <!-- João  -->
</div>
<a href="https://www.linkedin.com/in/oliveiramatheux/">
<sub><b>Matheus de Oliveira</b></sub></a>🚀
<a href="https://www.linkedin.com/in/eric-nielsen-frança-65273914a/">
<sub><b>Eric França</b></sub></a>🚀
<a href="https://www.linkedin.com/in/joao-guis/">
<sub><b>João Guilherme</b></sub></a>🚀

Feito por Matheus de Oliveira, Eric Nielsen e João Guilherme 👋🏽 Entre em contato!
