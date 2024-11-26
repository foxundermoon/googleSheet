
import { GoogleSheet } from "../src/index";


async function main() {
  const names = await GoogleSheet.getSheetNames(`1c-4TBgwOuZE7RbX9HIo_5ivjty4YT1ZXxg3FSUg4m3I`);

  console.log(names);
}

main();