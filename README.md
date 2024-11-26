# usage

`npm i @foxmn/googlesheet`

## service account email , share sheet to this account

```
fox-bot@universal-420909.iam.gserviceaccount.com
```

## getSheetRemote

```typescript
import { getSheetRemote } from "@foxmn/googlesheet";
async function main() {
  const data = await getSheetRemote(
    `1c-4TBgwOuZE7RbX9HIo_5ivjty4YT1ZXxg3FSUg4m3I`,
    "address"
  );
  console.log(data);
}

main();
```

## getSheetLocal

```typescript
import { GoogleSheet } from "@foxmn/googlesheet";

interface Address {
  tag: string;
  address: string;
}

async function main() {
  const sheets = await GoogleSheet.parseSheet<Address>(
    `1c-4TBgwOuZE7RbX9HIo_5ivjty4YT1ZXxg3FSUg4m3I`,
    `address`,
    0
  );
  console.log(sheets);
}

main();
```
