

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
