import { FormDefinition } from './model/FormDefinition';
import { FormContainer } from './model/FormContainer';

export class FormExtractor {
  private readonly containerType = [
    'OBSERVATION',
    'ACTION',
    'CLUSTER',
    'INSTRUCTION',
    'EVALUATION',
    'SECTION',
    // "GENERIC_FIELDSET",
    // "ISM_TRANSITION"
  ];

  private containers: FormContainer[];

  constructor(private root: FormDefinition) {
    this.containers = [];
  }
  public getContainers(): FormContainer[] {
    return this.containers;
  }
  public walk(): void {
    const c = new FormContainer(this.root);
    const d = this.walkDefinition(this.root, c);
    this.containers = [d];
  }

  private walkDefinition(d: FormDefinition, container: FormContainer): FormContainer {
    if (this.isContainer(d)) {
      const newContainer = new FormContainer(d);
      if (d.children) {
        d.children.forEach((child) => {
          this.walkDefinition(child, newContainer);
        });
      }
      container.addChild(newContainer);
      return container;
    } else {
      container.addNode(d);
      if (d.children) {
        d.children.forEach((child) => {
          this.walkDefinition(child, container);
        });
      }
    }

    return container;
  }

  private isContainer(d: FormDefinition): boolean {
    return this.containerType.filter((c) => c === d.rmType).length > 0;
  }
}
