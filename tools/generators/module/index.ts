import {
  formatFiles,
  installPackagesTask,
  Tree,
  updateJson,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
} from '@nrwl/devkit';
import {
  libraryGenerator,
  storybookConfigurationGenerator,
} from '@nrwl/angular/generators';
import { default as compodocGenerator } from '@twittwer/compodoc/src/generators/compodoc/generator';
import angularComponentGenerator from './angularComponent.generator';
import { StorybookConfigurationOptions } from '@nrwl/angular/src/generators/storybook-configuration/schema';
import * as path from 'path';

function updateProjectJson(tree: Tree, filePath: string) {
  updateJson(tree, filePath, (json) => {
    const options = json['targets']?.['build-storybook']?.['options'];
    if (!options) return json;

    const assets = [
      {
        glob: '**',
        input: 'apps/app/src/assets',
        output: './assets',
      },
      {
        glob: '**/*.svg',
        input: 'node_modules/ionicons/dist/ionicons/svg',
        output: './svg',
      },
    ];

    const styles = ['apps/app/src/styles.scss'];

    if (!options['assets']) {
      options['assets'] = assets;
    }
    if (!options['styles']) {
      options['styles'] = styles;
    }

    return json;
  });
}

function editStorybookPreviewJs(
  tree: Tree,
  projectName: string,
  filePath: string
) {
  let content = tree.read(filePath).toString();
  content += `
    import { setCompodocJson } from '@storybook/addon-docs/angular';
    import docJson from '/dist/compodoc/${projectName}/documentation.json';

    setCompodocJson(docJson);
  `;
  tree.write(filePath, content);
}

export default async function (
  tree: Tree,
  schema: { name: string; folder: string | undefined }
) {
  let projectName = schema.name;
  if (schema.folder) {
    projectName = schema.folder + '-' + projectName;
  }

  await libraryGenerator(tree, {
    name: schema.name,
    directory: schema.folder,
    simpleModuleName: true,
  });

  await angularComponentGenerator(tree, {
    name: schema.name,
    flat: true,
    project: projectName,
    export: true,
    style: 'scss',
  });

  await compodocGenerator(tree, {
    project: projectName,
    workspaceDocs: false,
  });

  await storybookConfigurationGenerator(tree, {
    name: projectName,
    generateStories: true,
    generateCypressSpecs: false,
    configureCypress: false,
  } as StorybookConfigurationOptions);

  const projectPath = readProjectConfiguration(tree, projectName).root;

  // const projectPath = path.join("libs", schema.folder, "")
  editStorybookPreviewJs(
    tree,
    projectName,
    path.join(projectPath, '.storybook', 'preview.js')
  );
  updateProjectJson(tree, path.join(projectPath, 'project.json'));

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    joinPathFragments('./.run'), // destination path of the files
    { libName: projectName } // config object to replace variable in file templates
  );

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
