
import { GoogleSheet } from ".";


async function main() {
  const sheets = await GoogleSheet.parseAllSheet(`1c-4TBgwOuZE7RbX9HIo_5ivjty4YT1ZXxg3FSUg4m3I`, 0);
  console.log(sheets);
}