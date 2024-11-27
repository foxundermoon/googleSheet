export async function getSheetRemote<DT>(id: string, sheetName: string, headerCol: number = 0) {

  const data = await fetch(`https://sheet.fox.mn/api/sheet/${id}?name=${sheetName}&headIndex=${headerCol}`).then(res => res.json());
  return data as DT[];
}