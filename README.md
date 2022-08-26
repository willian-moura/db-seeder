🇧🇷 [Versão em português](./README.pt-br.md)

# db-seeder

The project is being developed in NodeJS and its goals is to be a database seeder for web applications. The features already developed are:
- create a project with name, description, base URL and token for authentication;
- create a seeder for a project, with name, description, HTTP method and URL (create the seeder will only generate a pre-formated JSON file in the project's directory, this file must be updated adding the payloads for each request);
- execute a specific seeder passing its path;
- authenticate an user for the project, inserting its credentials (the login fields names can also be changed in the project's configuration file). With a logged user, all seeder requests will be sent using the authenticated token of the user;
- execute all project's seeders;

## How it's works
To use this tool, clone the github repository and, in the root project's directory, run `node ./src/inde.js {commands...}` to execute the commands.
Also it's possible use the command `dbseeder {commands...}` globally running before `npm link` inside the root project's directory.

## Commands
`create_project`: creates a project
  Parameters:
  - `-p` or `--path`: path where the project's directory will be stored
  - `-n` or `--name`: project's name
  - `-d` or `--description`: project's description
  - `-b` or `--baseUrl`: base URL of the API which will be receive the requests (e.g.: `"localhost:3333"`)
  - `-a` or `--auth_type`: token type used for authentication (e.g.: `"bearer"`)

 `create_seeder`: creates a seeder for the project
  Parameters
  - `-p` or `--project_path`: project's path
  - `-n` or `--name`: seeder's path
  - `-d` or `--description`: seeder's description
  - `-t` or `--method`: HTTP method that will be used for the requests
  - `-r` or `--url`: request URL (e.g.: `"/cars/create"`)

 `seeder`: runs a specific seeder
  Parameters
  - `-p` or `--seeder_path`: seeder's path
 
 `login`: authenticates an user for the project
  Parameters
  - `-p` or `--project_path`: project's file
  - `-u` or `--user`: user to be authenticated (e.g.: `"user@test.com"`, `"111.111.111-11"`)
  - `-w` or `--pass`: user's password

 `project`: runs all seeders of the project
  Parameters
  - `-p` or `--project_path`: project's path

## Generated files explanation
  `{projectDirectory}/config.json`: project's configuration file
  ```
  {
    "name": "New project", //.....................................| project's name
    "description": "Imagine a beautiful description here :)", //..| project's description
    "baseUrl": "http://localhost:8080", //........................| project's base URL
    "authType": null, // .........................................| authentication token type
    "authKey": null, // ..........................................| authentication key used in requests
    "login": { // ................................................| authentication feature settings:
      "url": "", // .................................................| API authentication URL
      "responseAccessKey": "token", // ..............................| data key that will contains the token on response
      "userFieldName": "user", // ...................................| field's name that will be sent containing the user (e.g.: user, email)
      "userFieldData": "admin", // ..................................| field's value containing the user that will be authenticated (e.g.: user@test.com, 111.111.111-11, myUserName)
      "passwordFieldName": "password", // ...........................| field's name that will be sent containing the password for authentication (e.g.: password, pass)
      "passwordFieldData": "admin" // ...............................| field's value containing the password for authentication
    },
    "seeders": [] // .............................................| seeders that will be runned ordered (case you don't want run a specific seeder during the command for entire project seeder, we recommend just to set "_active: false" in the seeder's file desired
  }
  ```
  
  `{projectDirectory}/seeders/{seederDirectory}.json`
  ```
  {
    "_help": "Use the requests array to put the body of your seeder. Each payload inserted will be a request on this route", //.. just a help message :)
    "_active": true, //..................................................| seeder's status, use false for disable its execution when uses the entire project seeder command
    "name": "deadline", //...............................................| seeder's name
    "description": "Imagine a beautiful description here :)", //.........| seeder's description
    "method": "POST", //.................................................| HTTP method used in the requests
    "url": "http://localhost:8080/deadline/1", //........................| request URL
    "requests": [ // ....................................................| Array containing the requests to be sent
      {
        "_active": true, // ...............................................| request's status, use false for disable its execution during the seeder
        "_id": null, // ...................................................| request's unique identificator (must to be inserted manually)
        "_database_id": null, // ..........................................| id returned after the request (shouldn't be changed)
        "data": { // ........................................................| request's body
          "some_atrubute": "some_value",
          "some_atrubute2": "some_value2"
        }
      }
    ]
  }
  ```
  
## Future features or enhancements
- [ ] make the feature of use another seeder's requests as foreign keys stable
- [ ] implements graphic interface using Electron

---
Feel free to sugest changes and enhancements for the project :)
