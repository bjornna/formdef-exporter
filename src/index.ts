#!/usr/bin/env node
import yargs, { env } from 'yargs';

import { getFormDefinitionFromZipFile } from './commands/getFormDefinitionFromZipFile';
import { FormDefinition } from './model/FormDefinition';
import { FormDefSerializer } from './FormDefSerializer';
import { getFormFieldAsExportConstWithComment } from './commands/getFormFieldAsExportConstWithComment';
import { writeFormDefinitionsAsSeparateFiles } from './commands/writeFormDefinitionsAsSeparateFiles';

type OutMode = 'simple' | 'multiple' | 'clean';
const outModes: ReadonlyArray<OutMode> = ['simple', 'multiple', 'clean'];

interface Arguments {
  [x: string]: unknown;
  form: string;
  cmd: OutMode;
  out: string;
}
const argv = yargs(process.argv.slice(2)).options({
  form: { type: 'string', demandOption: true, alias: 'formzip' },
  cmd: { choices: outModes, alias: 'command', default: 'simple' },
  out: { type: 'string', default: './export', alias: 'outdir' },
}).argv;

const keys = argv as Arguments;

console.log('Form file: ' + keys.form);
console.log('Command: ' + keys.cmd);
console.log('Outdir: ' + keys.out);

const formDefinitionJson = getFormDefinitionFromZipFile(keys.form);
if (!formDefinitionJson) {
  console.error('No form definition found in file ' + keys.form);
  process.exit(1);
} else {
  loadCommand(formDefinitionJson, keys.cmd);
  process.exit(0);
}

function loadCommand(formdef: FormDefinition, cmd: OutMode) {
  console.log('Loaded form.....');
  switch (cmd) {
    case 'simple':
      exportSimple(formdef, keys.out);
      break;
    case 'multiple':
      exportMultiple(formdef, keys.out);
      break;
    case 'clean':
      const serializer = new FormDefSerializer(keys.out);
      serializer.cleanExportDirectory();
      break;
    default:
      break;
  }
}

function exportSimple(formDefinition: FormDefinition, outDir: string) {
  const serializer = new FormDefSerializer(outDir);
  cleanAndRecreateExportDir(serializer);

  const txt = getFormFieldAsExportConstWithComment(formDefinition);
  serializer.writeRaw('formids.ts', txt);
}
function exportMultiple(formDefinition: FormDefinition, outDir: string) {
  const serializer = new FormDefSerializer(outDir);
  cleanAndRecreateExportDir(serializer);
  writeFormDefinitionsAsSeparateFiles(formDefinition, serializer);
}
function cleanAndRecreateExportDir(serializer: FormDefSerializer) {
  serializer.cleanExportDirectory();
  serializer.createExportDirIfNotExist();
}
