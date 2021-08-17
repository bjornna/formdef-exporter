import { ViewConfig } from './ViewConfig';

export interface FormDefinition {
  name: string;
  rmType: string;
  nodeId?: string;
  min: number;
  max: number;
  aqlPath?: string;
  formId?: string;
  viewConfig?: ViewConfig;

  children?: FormDefinition[];
}
