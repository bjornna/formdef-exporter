import * as fs from 'fs';
import rimraf from 'rimraf';

export class FormDefSerializer {
  constructor(private exportDirectory: string) {}
  public createExportDirIfNotExist(): boolean {
    if (!fs.existsSync(this.exportDirectory)) {
      fs.mkdirSync(this.exportDirectory);
    }
    return true;
  }
  public cleanExportDirectory(): boolean {
    if (fs.existsSync(this.exportDirectory)) {
      rimraf.sync(this.exportDirectory);
    }
    return true;
  }
  public writeJson(localPath: string, data: any) {
    const path = this.exportDirectory + '/' + localPath;
    fs.writeFileSync(path, JSON.stringify(data, null, 1), { encoding: 'utf8' });
  }
  public writeRaw(localPath: string, data: string) {
    const path = this.exportDirectory + '/' + localPath;
    fs.writeFileSync(path, data, { encoding: 'utf-8' });
  }
}
