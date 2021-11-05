# db-seeder

O projeto está sendo desenvolvido em NodeJs, e tem como objetivo ser um seeder de dados para aplicações Web. Entre suas funcionalidades já implementadas, estão:
- criar um projeto com nome, descrição, URL base e token para autenticação
- criar um seeder para um projeto, com nome, descrição, metodo HTTP e URL (criar um seeder apenas irá gerar um arquivo JSON pré-definido no diretório do projeto, esse arquivo deve ser modificado adicionando os payloads para cada requisição)
- executar um seeder específico passando o caminho do mesmo
- autenticar um usuário para o projeto, passando as credenciais do mesmo (nomes dos campos de login podem ser alterados no arquivo de configuração do projeto). Com um usuário logado, todas requisições do seeder serão enviadas com o token autenticado do usuário logado
- executar todos os seeders de um projeto

## comandos
`create_project`: cria um projeto
  Parâmentros:
  - `-p` ou `--path`: caminho onde o diretório do projeto será salvo
  - `-n` ou `--name`: nome do projeto
  - `-d` ou `--description`: descrição do projeto
  - `-b` ou `--baseUrl`: URL base para qual serão feitas requisições (ex: `localhost:3333`)
  - `-a` ou `--auth_type`: tipo de toke usado na autenticação (ex: bearer)

 `create_seeder`: cria um seeder para um projeto
  Parâmetros
  - `-p` ou `--project_path`: caminho do projeto
  - `-n` ou `--name`: nome do seeder
  - `-d` ou `--description`: descrição do seeder
  - `-t` ou `--method`: o tipo de método HTTP usado nas requisições
  - `-r` ou `--url`: URL da requisição (ex: /cars/create)

 `seeder`: executa um seeder específico
  Parâmetros
  - `-p` ou `--seeder_path`: caminho do arquivo do seeder
 
 `login`: autentica um usuário para o projeto
  Parâmetros
  - `-p` ou `--project_path`: caminho do projeto
  - `-u` ou `--user`: usuário a ser autenticado (ex: usuario@teste.com, 111.111.111-11)
  - `-w` ou `--pass`: senha do usuário

 `project`: executa todos os seeders presentes no projeto
  Parâmetros
  - `-p` ou `--project_path`: caminho do projeto

## descrição dos arquivos gerados
  `{diretorioDoProjeto}/config.json`: arquivo de configuração do projeto
  ```
  {
    "name": "New project", //.....................................| nome do projeto
    "description": "Imagine a beautiful description here :)", //..| descrição do projeto
    "baseUrl": "http://localhost:8080", //........................| URL base para o projeto
    "authType": null, // .........................................| tipo de token de autenticação usado nas requisições
    "authKey": null, // ..........................................| chave de autenticação usada nas requisições
    "login": { // ................................................| configurações referentes a funcionalidade de autenticação:
      "url": "", // .................................................| URL para buscar o token de autenticação
      "responseAccessKey": "token", // ..............................| chave contendo o token na resposta
      "userFieldName": "user", // ...................................| nome do campo a ser enviado contendo o usuário (ex: user, cpf, email)
      "userFieldData": "admin", // ..................................| usuário a ser autenticado (ex: usuario@teste.com, 111.111.111-11, nomeDeUsuario)
      "passwordFieldName": "password", // ...........................| nome do campo a ser enviado contendo a senha do usuário (ex: password, pass, )
      "passwordFieldData": "admin" // ...............................| senha do usuário a ser autenticado
    },
    "seeders": [] // .............................................| seeders a serem executados na ordem de execução (caso não queira executar um seeder específico durante a execução do projeto inteiro, recomenda-se apenas setar "_active: false" no arquivo do seeder desejado)
  }
  ```
  
  `{diretorioDoProjeto}/seeders/{diretorioDoSeeder}.json`
  ```
  {
    "_help": "Use the requests array to put the body of your seeder. Each body inserted will be a request on this route", //.. apenas uma mensagem de ajuda :)
    "_active": true, //..................................................| situação do seeder, use false para que ele não seja executado automaticamente quando o projeto for "seedado"
    "name": "deadline", //...............................................| nome do seeder
    "description": "Imagine a beautiful description here :)", //.........| descrição do seeder
    "method": "POST", //.................................................| método usado nas requisições
    "url": "http://localhost:8080/deadline/1", //........................| URL da requisição (quando gerado automaticamente insere a URL base do projeto, então se for alterada deve-se lembrar de inseri-la novamente)
    "requests": [ // ....................................................| Array contendo as requisições a serem enviadas
      {
        "_active": true, // ...............................................| situação da requisição, use false para que ela não seja executada durante o seeder
        "_id": null, // ...................................................| identificador único da requisição (deve ser inserido manualmente)
        "_database_id": null, // ..........................................| id retornado após a requisição (não deve ser alterado)
        "data": { // ........................................................| payload que será enviado como body da requisição
          "some_atrubute": "some_value",
          "some_atrubute2": "some_value2"
        }
      }
    ]
  }
  ```
  
## Trabalhos futuros
- [ ] deixar estável funcionalidade de usar requisições de outro seeder como chaves estrangeiras
- [ ] implementar interface gráfica usando Electron

---
Fiquem livres para sugerirem mudanças e melhorias para o projeto :)
