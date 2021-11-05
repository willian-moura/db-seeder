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
