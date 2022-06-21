# Challenge Space Flight News

Este é um desafio concluído da plataforma coodesh. Foi proposto construir uma API Restful com as melhores práticas de desenvolvimento, baseada na [API Space Flight News](https://api.spaceflightnewsapi.net/v3/documentation).

## Tecnologias utilizadas
- [Docker](https://www.docker.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Redis](https://redis.io/)
- [TypeORM](https://typeorm.io/#/)
- [Swagger](https://swagger.io/)
- [Node Cron](https://www.npmjs.com/package/node-cron)
- [Nodemailer](https://nodemailer.com/about/)
- [Amazon SES](https://aws.amazon.com/pt/ses/)
- [PostgreSQL](https://www.postgresql.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Jest](https://jestjs.io/pt-BR/)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Tsyringe](https://www.npmjs.com/package/tsyringe)
- [Celebrate](https://www.npmjs.com/package/celebrate)
# Como rodar o projeto

Depois de clonar o repósitiorio no seu computador, é preciso instalar as dependências usando o [yarn](https://yarnpkg.com/) ou o [npm](https://www.npmjs.com/).

```bash
yarn
```
ou

```bash
npm install
```

## Docker

Depois de instalar todas as dependências, é necessário criar a imagem e subir o container. Para fazer isso você deve rodar o seguinte comando na raiz do projeto:

```javascript
docker-compose up -d
```

Para verificar o log da aplicação, rode este comando:

```javascript
docker logs space-flight-news_api -f
```

## Consumir a API
Depois de  estar  com a aplicação rodando você pode consultar a documentação API através do link [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

## Link do desafio

[https://lab.coodesh.com/public-challenges/back-end-challenge](https://lab.coodesh.com/public-challenges/back-end-challenge)

## Link do vídeo de apresentação

[https://www.loom.com/share/fcd154ae96744549ae1011dd3b0b7012](https://www.loom.com/share/fcd154ae96744549ae1011dd3b0b7012)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## This is a challenge by Coodesh

[https://coodesh.com/](https://coodesh.com/)
