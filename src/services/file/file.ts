import { IError } from "@/utils/CustomError";
import { findFtpById } from "../ftp/ftp";
import { closeFtpConnection, connectFtp, downloadFile } from "../connector/ftpConnector";
import path from 'path';
import os from 'os';

export const downloadFileFromFtp = async (ftpId: string) => {
   try {
    const remotePath = './ftp-test/products_export_1.csv';
    const localPath = path.join(os.homedir(), 'Desktop', path.basename(remotePath));
    const ftpConfig = await findFtpById(ftpId);
    console.log('FTP config:', ftpConfig);
    // if (ftpConfig) {
    //     await connectFtp(ftpConfig);
    // } else {
    //     await connectFtp();
    // }
    await connectFtp();
    const downloadedFile = await downloadFile(remotePath, localPath);
    closeFtpConnection();
    return downloadedFile;
   } catch (error) {
       console.error('FTP operation failed:', error);
   }
}