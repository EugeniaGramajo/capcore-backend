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

- `DELETE - /budgetBlocks/:id` delete a budgetBlock

### BUDGETBLOCKVERSION:

- `GET - /budgetBlocksVersion/` get all budgetBlockVersion

- `GET - /budgetBlocksVersion/:id` get BudgetBlockVersion by id

- `POST - /budgetBlocksVersion/:projectId/:budgetBlockId` create a budgetBlockVersion

- `PUT - /budgetBlocksVersion/:id` update a budgetBlockVersion if the user is allowed

- `DELETE - /budgetBlocksVersion/:id` delete a budgetBlock

### SUBBUDGET

- `GET - /subBudget/` get all subBudgets

- `GET - /subBudget/:id` get a subbudget by id

- `POST - /subBudget/:id` need a budgetblockversion to create a new subbudget

- `PUT - /subBudget/` update a subbudget 

- `DELETE - /subBudget/` delete a subbudget

### TITLE

- `GET - /title/` get all titles

- `GET - /title/:id` get title by id

- `POST - /title/:subBudgetId` create a title connected with a subbdget

- `POST - /title/toTitle/:titleId` create a new title and save it in the title_ids array of the paret title

- `PUT - /title/`

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
