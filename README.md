# capcore api

## api endpoints

### USER:

- `GET - /users` descripción del endpoint

### CLIENT:

- `GET - /clients` descripcion del endpoint

### PROJECT:

- `GET - /projects` descripcion del endpoint

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
