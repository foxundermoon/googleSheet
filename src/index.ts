import { google } from 'googleapis';


const credentialsContent = process.env['GOOGLE_CREDENTIALS'];


export class GoogleSheet {
  static credentials = Buffer.from(credentialsContent as string, 'base64').toString();
  static auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(this.credentials),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  static googleSheets = google.sheets({ version: 'v4', auth: this.auth });
  static transformData<DT>(data: any[][] | null | undefined, headerIndex = 0): DT[] {
    if (!data) return [];
    if (data && data.length > 0) {
      const headers = data[headerIndex];
      const rows = data.slice(headerIndex + 1);
      return rows.map(row => {
        let obj: any = {};
        row.forEach((value, index) => {
          obj[headers[index]] = value;
        });
        return obj;
      });
    } else {
      throw new Error(`data empoty ${data}`);
    }
  }
  static async getSheets(spreadsheetId: string, range: string) {
    if (!credentialsContent) throw new Error(`GOOGLE_CREDENTIALS  env not set`)
    return await this.googleSheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range
    });
  }

  static async parseSheet<Item>(id: string, sheetName: string, headerCol: number) {
    const data = await this.getSheets(id, 'address');
    return this.transformData<Item>(data.data.values, headerCol);
  }

  static async getSheetNames(id: string) {
    const data = await this.googleSheets.spreadsheets.get({
      spreadsheetId: id,
      includeGridData: false
    });
    return data?.data?.sheets?.map(sheet => sheet?.properties?.title) as string[] | undefined;
  }


}


export async function getSheetRemote<DT>(id: string, sheetName: string, headerCol: number = 0) {

  const data = await fetch(`https://sheet.fox.mn/api/sheet/${id}?name=${sheetName}&headIndex=${headerCol}`).then(res => res.json());
  return data as DT[];
}