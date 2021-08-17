import { NameFixer } from './NameFixer';

/**
 * When combining text as variabel or class names we must ensure the values are unique.
 * This class evaluate the uniquness of the name.
 * If the name is present there will be created a new name with the number as suffix
 */

export class UniqueNameController {
  private nameMap: Record<string, number> = {};

  private getUnique(name: string, level = 0): string {
    const currentName = level > 0 ? name + '' + level : name;
    if (this.nameMap[currentName]) {
      return this.getUnique(name, level + 1);
    } else {
      this.nameMap[currentName] = 1;
      return currentName;
    }
  }

  public getNameFromName(name: string): string {
    const fixedName = NameFixer.toConstantCase(name);
    return this.getUnique(fixedName);
  }
}
