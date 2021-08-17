import _ from 'lodash';
export class NameFixer {
  public static toUpperCamelCase(text: string) {
    return this.toLowerCamelCase(text).toUpperCase();
  }
  public static removeBlacklistedCharacters(name: string): string {
    name = name
      .replace('(', ' ')
      .replace(')', ' ')
      .replace('æ', 'ae')
      .replace('ø', 'oe')
      .replace('å', 'aa')
      .replace('Æ', 'Ae')
      .replace('Ø', 'Oe')
      .replace('Å', 'Aa')
      .replace('#', ' ')
      .replace(':', '_')
      .replace('?', '_')
      .replace(',', '')
      .replace('/', ' ');
    return name;
  }
  public static toSnakeCase(text: string): string {
    const t = this.removeBlacklistedCharacters(text);
    return _.snakeCase(t);
  }
  public static toConstantCase(text: string): string {
    //        const t = this.removeBlacklistedCharacters(text);
    //      return _.upperCase(t).replace(/ /g, '_');
    return this.toSnakeCase(text).toUpperCase();
  }
  public static toLowerCamelCase(text: string): string {
    return _.camelCase(this.removeBlacklistedCharacters(text));
  }
}
