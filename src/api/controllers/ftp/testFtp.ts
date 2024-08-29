import { closeFtpConnection, connectFtp, downloadFile, listFiles, uploadFile } from '@/services/connector/ftpConnector';
import { findFtpById } from '@/services/ftp/ftp';
import { ApiResponse } from "@/shared";
import { Response } from "express";
import _ from "lodash";
import { AuthenticatedRequest } from "@/middlewares/types";

export const ftpTest = async (req: AuthenticatedRequest, res: Response) => {

    console.log('FTP test');
    console.log('Request:', req.body);
    
    const ftpId = req.params.id;
    console.log('FTP ID:', ftpId);
    
    const ftpConfig = await findFtpById(ftpId);
    console.log('FTP config:', ftpConfig);

    if (!ftpConfig) {
        throw new Error('FTP configuration not found');
    }

    try {
        const connection = await connectFtp(ftpConfig);
        console.log('FTP connection:', connection);
        const files = await listFiles('/');
        console.log('Files:', files);

        // await downloadFile('/remote/path/file.txt', './local/path/file.txt');
        // await uploadFile('./local/path/file.txt', '/remote/path/file.txt');
    } catch (error) {
        console.error('FTP operation failed:', error);
    } finally {
        closeFtpConnection();
    }
    return ApiResponse(true, "test", {}, 201, res);
};