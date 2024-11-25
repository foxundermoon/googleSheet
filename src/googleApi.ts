import { constants } from 'fs';
import { google } from 'googleapis';
import fs from 'fs';
import _ from 'lodash';

const credentialsContent = process.env['GOOGLE_CREDENTIALS'];
if (!credentialsContent) throw new Error(`GOOGLE_CREDENTIALS  env not set`)

export class GoogleSheetCfg {
  static credentials = Buffer.from(credentialsContent as string, 'base64').toString();
  static auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(this.credentials),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  static spreadsheetId = '1rIdkdYOdVeTrKqc0jIQZSXK52n-YNzbUbcEqErx0M90';
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
  static async getSheets() {
    return await this.googleSheets.spreadsheets.get({
      spreadsheetId: this.spreadsheetId,
    });
  }

  static async getSubscriptions() {
    const data = await this.googleSheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'proxySubList'
    })
    return this.transformData(data.data.values as any, 1)
      .filter(({ url }) => url)
      .map(({ disabled, excludeLoadbalance, ...rest }) => ({
        ...rest,
        disabled: disabled === 'TRUE',
        excludeLoadbalance: excludeLoadbalance === 'TRUE',
      })
      )
  }

  static async getProxiesOrigin() {
    const data = await this.googleSheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'proxy'
    });
    return this.transformData(data.data.values as any, 1)
      .filter(({ content, format }) => content && format)

  }


}