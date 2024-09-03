import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import fs from 'fs';
import { InputData } from './types';


const headers: (keyof InputData)[] = [
  "Handle", "Command", "Title", "Supplier Name", "Supplier Code", "Topline Code", "Barcode",
  "Safery Sheet Src", "Body (HTML)", "Selling Point 1", "Selling Point 2", "Selling Point 3",
  "topline-itembrand", "Metafield (Nested) Attributes", "topline-itemdesc", "Vendor",
  "Standardized Product Type", "Custom Product Type", "Tags", "Published", "Product Category",
  "Option1 Name", "Option2 Name", "Option3 Name", "Category ID", "Variant SKU", "Variant Price",
  "Variant Barcode", "Image Alt Text", "SEO Title", "SEO Description", "Cost per item", "Status",
  "Image Src"
];

export const uploadAndConvertFile = (req: Request, res: Response) => {
  console.log('Uploading file...',req);
    const file = req.file;
    console.log('File:', file);
 
    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    const sourceWorkbook = XLSX.readFile(file.path, { type: 'file', raw: true });
    const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
    const sourceData: any[] = XLSX.utils.sheet_to_json(sourceWorksheet);

    const formattedData = sourceData.map(row => {
      const formattedRow: Partial<InputData> = {};

      headers.forEach(header => {
        formattedRow[header] = row[header] || '';
      });

      return formattedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers as string[] });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const outputBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    fs.unlinkSync(file.path);

    res.setHeader('Content-Disposition', 'attachment; filename=converted_file.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(outputBuffer);

    return;
};
