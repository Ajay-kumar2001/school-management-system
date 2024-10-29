import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import fs from 'fs';
import path from 'path';
import RESPONSE ,{ErrorHandler} from '../utils/errorHandler';

// Function to create directory if it doesn't exist
const createIfNotExists = (dirPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Multer storage configuration
const multerStorage = multer.diskStorage({
    destination: async (req: Request, file: Express.Multer.File, cb) => {
        try {
            const uploadDir = path.join(__dirname, '../../src/public/images');
            await createIfNotExists(uploadDir);
            cb(null, uploadDir);
        } catch (error) {
            cb(error as Error,'');
        }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileExtension = path.extname(file.originalname);
        const fileNameWithoutExtension = path.basename(file.originalname, fileExtension).replace(/ /g, '_');
        cb(null, `${fileNameWithoutExtension}_${uniqueSuffix}${fileExtension}`);
    },
});

// Allowed MIME types
const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];


// File filter for validating file types
const multerFilter = (req: Request, file: Express.Multer.File, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ErrorHandler({statusCode: 400,message:'Unsupported file format. Only JPEG, PNG, and PDF files are allowed.'}));
    }
};

// Multer middleware configuration
 export const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 12 * 1024 * 1024, files: 10 }, // Limit file size to 12MB and maximum files to 10
});

// Middleware to handle Multer errors
export const multerErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof MulterError) {
        // Handle specific Multer errors
        switch (err.name) {
            case 'LIMIT_FILE_SIZE':
                return RESPONSE.errorReResponse({ next, error: { statusCode: 413, message: 'File size limit exceeded. Maximum allowed is 12MB.' } });
            case 'LIMIT_FILE_COUNT':
                return RESPONSE.errorReResponse({ next, error: { statusCode: 400, message: 'The maximum number of files allowed is 10.' } });
            case 'LIMIT_UNEXPECTED_FILE':
                return RESPONSE.errorReResponse({ next, error: { statusCode: 400, message: 'Unexpected file field. Please check your request.' } });
            default:
                return RESPONSE.errorReResponse({ next, error: { statusCode: 400, message: err.message } });
        }
    } else {
        // Handle other errors
        return RESPONSE.errorReResponse({ next, error: { statusCode: 400, message: err.message } });
    }
    next();
};

// Export upload middleware for single or multiple files
