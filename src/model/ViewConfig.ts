import { FormMultiplicity } from './FormMultiplicity';

export interface ViewConfig {
  multiplicity?: FormMultiplicity;
  annotations?: Record<string, string>;
}
