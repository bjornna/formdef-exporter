import { FormDefinition } from './FormDefinition';
import { NameFixer } from '../NameFixer';
import { FormId } from './FormId';
import { FormField } from './FormField';
export class FormContainer implements FormId {
  public baseName: string;
  public rmType: string;
  public basePath: string;

  public nodes: Record<string, FormField>;
  public children: Record<string, FormContainer>;

  constructor(d: FormDefinition) {
    this.baseName = d.name;
    this.rmType = d.rmType;
    this.basePath = d.formId + '';

    this.nodes = {};
    this.children = {};
  }
  public addNode(node: FormDefinition, level = 0) {
    let name = level === 0 ? node.name : node.name + level;
    name = NameFixer.toUpperCamelCase(name);

    if (this.nodes[name]) {
      this.addNode(node, level + 1);
    } else {
      const id: FormField = {
        formId: node.formId + '',
        aqlPath: node.aqlPath + '',
        name,
        rmType: node.rmType,
      };
      this.nodes[name] = id;
    }
  }
  public addChild(child: FormContainer, level = 0) {
    let name = level === 0 ? child.baseName : child.baseName + level;
    name = NameFixer.toUpperCamelCase(name);
    if (this.children[name]) {
      this.addChild(child, level + 1);
    } else {
      this.children[name] = child;
    }
  }
}
