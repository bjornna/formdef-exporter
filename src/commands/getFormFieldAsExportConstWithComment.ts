import { FormDefinition } from '../model/FormDefinition';
import { FormDefinitionVisitor } from '../FormDefinitionVisitor';
import { UniqueNameController } from '../UniqueNameController';

/**
 * Generate a typescript text with export const statements for all the fields
 * @param form
 * @returns
 */
export function getFormFieldAsExportConstWithComment(form: FormDefinition) {
  const visitor = new FormDefinitionVisitor();
  walk(form, visitor);
  const fieldsMap = visitor.getFields();
  const nameController = new UniqueNameController();
  let txt = '';
  // tslint:disable-next-line: forin
  for (const key in fieldsMap) {
    const d = fieldsMap[key];
    const varName = nameController.getNameFromName(d.name);
    const formId = d.formId + '';
    txt += '\n/**';
    txt += `\n* Name: ${d.name}`;
    txt += `\n* AQL: ${d.aqlPath}`;
    txt += `\n* Occurences: ${d.min}..${d.max}`;
    txt += `\n* @type ${d.rmType}`;
    txt += `\n*/`;
    txt += `\nexport const ${varName} = "${formId}"`;
  }
  return txt;
}

function walk(d: FormDefinition, v: FormDefinitionVisitor) {
  v.visit(d);
  if (d.children) {
    d.children.forEach((child) => walk(child, v));
  }
}
