
import { GoogleSheet } from "../src/index";


async function main() {
  const sheets = await GoogleSheet.parseSheet(`1c-4TBgwOuZE7RbX9HIo_5ivjty4YT1ZXxg3FSUg4m3I`, `address`, 0);
  console.log(sheets);
}

main();