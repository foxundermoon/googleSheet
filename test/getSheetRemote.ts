
import { getSheetRemote } from "../src/index";


async function main() {
  const data = await getSheetRemote(`1c-4TBgwOuZE7RbX9HIo_5ivjty4YT1ZXxg3FSUg4m3I`, 'address');

  console.log(data);
}

main();