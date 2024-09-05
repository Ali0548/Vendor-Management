import { closeFtpConnection, connectFtp, downloadFile, listFiles, uploadFile } from '@/services/connector/ftpConnector';
import { findFtpById } from '@/services/ftp/ftp';
import { ApiResponse } from "@/shared";
import { Response } from "express";
import _ from "lodash";
import { AuthenticatedRequest } from "@/middlewares/types";

export const ftpTest = async (req: AuthenticatedRequest, res: Response) => {

    console.log('FTP test');
    
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
        // console.log('Files:', files);

        const downloadedFile = await downloadFile('./ftp-test/products_export_1.csv', './Desktop'); 
        console.log('Downloaded file:', downloadedFile);
    } catch (error) {
        console.error('FTP operation failed:', error);
    } finally {
        closeFtpConnection();
    }
    return ApiResponse(true, "test", {}, 201, res);
};