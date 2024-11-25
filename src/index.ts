import { google } from 'googleapis';


const credentialsContent = process.env['GOOGLE_CREDENTIALS'];
if (!credentialsContent) throw new Error(`GOOGLE_CREDENTIALS  env not set`)


export class GoogleSheet {
  static credentials = Buffer.from(credentialsContent as string, 'base64').toString();
  static auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(this.credentials),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  static googleSheets = google.sheets({ version: 'v4', auth: this.auth });
  static transformData(data: any[][], headerIndex = 0): any[] {
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
  static async getSheets(spreadsheetId: string) {
    return await this.googleSheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });
  }

  static async  parseAllSheet<Item>(id: string, headerCol: number) {
    const data = await this.getSheets(id);
    // return data.map((x) => {
    //   const { data }: { data: any[][] } = x as any;
    //   const columns = <string[]>data[headerCol];
    //   return data.map((r: any[]) => {
    //     return <Item>r.reduce((u, v, i) => {
    //       if (columns[i]) {
    //         u[columns[i]] = v;
    //       }
    //       return u;
    //     }, {})
    //   })
    // });

  }


}
