
import { GoogleSheet } from "../src/index";


async function main() {
  const cred = GoogleSheet.credentials;
  const j = JSON.parse(cred);
  console.log(j);
}

main();