import { FormExtractor } from '../FormExtractor';
import { Emitter } from '../Emitter';

import { FormDefinition } from '../model/FormDefinition';
import { FormDefSerializer } from '../FormDefSerializer';

export function writeFormDefinitionsAsSeparateFiles(form: FormDefinition, serializer: FormDefSerializer) {
  const worker = new FormExtractor(form);
  worker.walk();

  const container = worker.getContainers()[0];
  const emitter = new Emitter(container);
  const result: Record<string, string> = emitter.emit();

  // tslint:disable-next-line: forin
  for (const name in result) {
    // console.log(`ClassName: ${name}`);
    serializer.writeRaw(name + '.ts', result[name]);
  }
}
