

# Stockeer

## Setup (Already done)
```shell
# create workspace
yarn create nx-workspace --package-manager=yarn # preset: apps, no nx cloud

# add dependencies
yarn add -D --exact @nrwl/nest @nrwl/angular @nrwl/storybook @storybook/addon-essentials @twittwer/compodoc @nxtend/ionic-angular @storybook/addon-docs @capacitor/core @ionic/angular @ionic/storage-angular @nxtend/capacitor

# create app
yarn nx generate @nxtend/ionic-angular:application --name=app # template: blank
```

## Create UI Module

1. Use the workspace generator. Folder Name is optional.
```shell
yarn nx workspace-generator module <moduleName> <folderName>
# example
yarn nx workspace-generator module titlebar gui
```

2. Usually: Add `IonicModule.forRoot()` to the imports of `moduleMetadata` in `<component-name>.component.stories.ts`.

## General Rules

Here are some general rules for development.

- [Stores](./libs/store/README.md)

## Database Information

Interaction with the Database is handled by TypeORM. The Database scheme is created by migrations, which have to be generated.
The file ormconfig.env configures the connection string to the database and contains the path to the migration files / entity definitions.
The initial migration has been created using `yarn run typeorm:migration:generate -n InitDB`. What happens is that a script looks up the entities and
the current state of the specified database. It then generates sql commands that would sync the state of the database to the current state of the entity definitions.
For example: 
- Database contains relation User
- Entity folder contains User AND Product
-> Migration will see that the Database differs from the specified entities and generate sql commands that will create the Product relation.
- The migrations that have to be run will be specified in the DatabaseModule!

# Workflow

1. Start angular: `nx run app:serve`
2. Start backend: `nx run backend:serve` # Backend integration is still WIP.
3. Open Android Studio with `nx run app:open:android` and run the app from there.
4. (Optional) Debugging: Go to chrome://inspect and select your connected device to see the logs.
