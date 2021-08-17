import { FormField } from './FormField';

export interface FormId {
  baseName: string;
  rmType: string;
  basePath: string;
  nodes: Record<string, FormField>;
  children: Record<string, FormId>;
}
