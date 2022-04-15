

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

## Create Module

1. Generate module / lib (gui is folder, titlebar is module name). You might want to rename the module name from gui-titlebar to just titlebar <br>
  `yarn nx generate @nrwl/angular:library --name=gui/titlebar`
2. Create component <br>`yarn nx generate @nrwl/angular:component --name=titlebar --project=gui-titlebar --flat`
3. Add compodoc (required for Controls and Actions tabs in storybook)<br>
  `yarn nx g @twittwer/compodoc:config gui-titlebar`
4. Add storybook config <br>
  `yarn nx g @nrwl/angular:storybook-configuration --no-configureCypress --no-generateCypressSpecs --no-interactive gui-titlebar`
5. Edit preview.js and add:
```typescript
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '/dist/compodoc/gui-titlebar/documentation.json';

setCompodocJson(docJson);
```
6. Add Root Styles to the component storybook config in `libs/gui/titlebar` to `build-storybook->options`
```json
"assets": [
  {
    "glob": "**",
    "input": "apps/app/src/assets",
    "output": "./assets"
  },
  {
    "glob": "**/*.svg",
    "input": "node_modules/ionicons/dist/ionicons/svg",
    "output": "./svg"
  }
],
"styles": ["apps/app/src/styles.scss"],
```
7. Start compodoc and then storybook. Just copy the intellij runtime configs :D
