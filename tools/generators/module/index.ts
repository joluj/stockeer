import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit';
import {
  libraryGenerator,
  angularStoriesGenerator,
} from '@nrwl/angular/generators';
import angularComponentGenerator from './angularComponent.generator';

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

  angularStoriesGenerator(tree, {
    name: projectName,
    generateCypressSpecs: false,
  });

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
