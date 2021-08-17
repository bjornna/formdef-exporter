import { FormContainer } from './model/FormContainer';
import { NameFixer } from './NameFixer';

export class Emitter {
  private pathName: string;
  constructor(private root: FormContainer, pathName?: string) {
    if (pathName) {
      this.pathName = pathName;
    } else {
      this.pathName = '';
    }
  }
  public emit(dictionary?: Record<string, string>): Record<string, string> {
    if (!dictionary) {
      dictionary = {};
    }

    const classname = createFulluQualifiedName(this.root);
    // const classDefinition = createClassDefinition(this.root);
    const exportDefinition = createExportDefinition(this.root);
    if (exportDefinition.length > 0) {
      const lines = exportDefinition.join('\n');
      dictionary[classname] = lines;
    }

    // tslint:disable-next-line: forin
    for (const k in this.root.children) {
      const currentPath = this.pathName + k;
      const childEmitter = new Emitter(this.root.children[k], currentPath);
      childEmitter.emit(dictionary);
    }
    return dictionary;
  }
}
function createVariabel(text: string): string {
  const n = NameFixer.toUpperCamelCase(text);
  return n.substr(0, 1).toLowerCase() + n.substr(1);
}

function createExportDefinition(container: FormContainer) {
  const name = createFulluQualifiedName(container);
  const fields = container.nodes;
  const lines: string[] = [];
  // tslint:disable-next-line: forin
  for (const key in fields) {
    const path = fields[key];
    // const variabelName = `${name}_${key}`.toUpperCase();
    const variabelName = NameFixer.toUpperCamelCase(key).toUpperCase();
    lines.push(`/**`);
    lines.push(` * Name: ${name}`);
    lines.push(` * AQL: ${path.aqlPath}`);
    lines.push(` * @type ${path.rmType}`);
    lines.push(` */`);
    const line = `export const ${variabelName} = "${path.formId}";`;
    lines.push(line);
  }
  return lines;
}

function createClassDefinition(container: FormContainer): string {
  const currentName = createFulluQualifiedName(container);
  const fields = container.nodes;
  const children = container.children;
  let result = '';
  // tslint:disable-next-line: forin
  for (const k in children) {
    const importName = createFulluQualifiedName(children[k]);
    result += `\nimport {${importName}} from "./${importName}" ;`;
  }

  result += `\nexport class ${currentName} {`;
  // tslint:disable-next-line: forin
  for (const k in fields) {
    const fValue = fields[k];
    result += `\n public static  readonly ${createVariabel(k)} = "${fValue}"; `;
  }

  // tslint:disable-next-line: forin
  for (const k in children) {
    const cValue = createFulluQualifiedName(children[k]);
    result += `\n public static readonly ${createVariabel(k)} = new ${cValue}();`;
  }

  result += '\n}';
  return result;
}
function createFulluQualifiedName(container: FormContainer): string {
  const p = container.basePath;
  const arr = p.split('/');
  const n: string[] = [];
  arr.forEach((f) => {
    n.push(f.split('@')[0]);
  });
  if (n.length > 1) {
    n.shift();
  }
  while (n.length > 3) {
    n.shift();
  }

  const almostThere = n.join('___');

  const finalResult = NameFixer.toUpperCamelCase(almostThere);

  return finalResult;
}
export function createSimpleFormId(path: string) {
  const arr = path.split('/');
  const n: string[] = [];
  arr.forEach((f) => {
    let t = f.split('@')[0];
    t = NameFixer.removeBlacklistedCharacters(t);
    // t = NameFixer.toUpperCamelCase(t);
    //        t = t.toUpperCase();
    n.push(t);
  });
  const result = n.join('/');
  return result;
}
