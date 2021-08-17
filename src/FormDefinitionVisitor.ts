import { createSimpleFormId } from './Emitter';
import { FormDefinition } from './model/FormDefinition';

export class FormDefinitionVisitor {
  private fields: Record<string, FormDefinition>;
  constructor() {
    this.fields = {};
  }
  public visit(d: FormDefinition): void {
    if (d.formId) {
      const id = createSimpleFormId(d.formId);
      if (this.fields[id]) {
        console.error('There is already a name like this....');
      }
      this.fields[id] = d;
    } else {
      console.log('No form id for ' + d.rmType);
    }
  }
  public numberOfFields(): number {
    let n = 0;
    // tslint:disable-next-line: forin
    for (const key in this.fields) {
      n += 1;
    }
    return n;
  }
  public getFormKeys(): string[] {
    const n: string[] = [];
    // tslint:disable-next-line: forin
    for (const k in this.fields) {
      n.push(k);
    }
    return n;
  }
  public getFields(): Record<string, FormDefinition> {
    return this.fields;
  }
}
