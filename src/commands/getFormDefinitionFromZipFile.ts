import AdmZip from 'adm-zip';
import { FormDefinition } from '../model/FormDefinition';

/**
 * Load a form zip file and extract the formdefinition
 *
 * @param fileNamePath path to the zip file
 * @returns the form definition within the form, or NULL if one is found
 */
export function getFormDefinitionFromZipFile(fileNamePath: string): FormDefinition | null {
  const zip = new AdmZip(fileNamePath);
  let formDescription: FormDefinition | null = null;
  zip.getEntries().forEach((entry) => {
    // console.log(entry.name);
    if ('form_description.json' === entry.name) {
      const content = entry.getData().toString('utf8');
      formDescription = JSON.parse(content);
    }
  });
  return formDescription;
}
