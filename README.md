# capcore api

## api endpoints

### USER:

- `GET - /users` descripción del endpoint

### CLIENT:

- `GET - /clients` descripcion del endpoint

### PROJECT:

- `GET - /projects/` get all projects

- `GET - /projects/:id` get a project by id

- `POST - /projects/` post a new project with a budgetBlock associated

- `PUT - /projects/:id` get a project by id

- `DELETE - /projects/:id` delete a project by id

### BUDGETBLOCK:

- `GET - /budgetBlocks/` get all budgetBlocks

- `GET - /budgetBlocks/:id` get BudgetBlocks by id

- `POST - /budgetBlocks/:projectId` create a budgetBlock related with a project

- `PUT - /budgetBlocks/:id` update a budgetBlock if the user is allowed

- `DELETE - /budgetBlocks/` delete a budgetBlock


## how to run

- pull corresponding and `npm i`

- generate prisma client

```bash
$ npx prisma generate
```

- run `npm run dev`

## Sync schema with db (only during development and prototyping)

If there's any change `schema.prisma` run (this will trigger `npx prisma generate` again):

```bash
$ npx prisma db push
```

Read the [command docs](https://www.prisma.io/docs/guides/migrate/prototyping-schema-db-push)
