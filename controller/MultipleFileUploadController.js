import { validationResult } from "express-validator"
import HttpError from "../middlewares/httpError.js"
import * as fs from 'fs'
import uploads from "../models/upload.js"

// file uploading controller
export const uploadMultipleFiles = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors, "error");
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
                const files = req.files;
                const filePaths = [];

                files.forEach((file) => {
                    const filePath = `uploads/employees/profile/${file.filename}`;
                    fs.rename(file.path, filePath, (err) => {
                    if (err) {
                        // Handle error appropriately and send an error response
                        return res.status(500).json({ error: 'Failed to store the file' });
                    }
                    });
                    filePaths.push(filePath);
                });

                // Save file paths to MongoDB
                const newFiles = new uploads({
                    images: filePaths.map(path => process.env.BASE_URL + "/" + path.slice(8))
                });

                await newFiles.save();
                res.status(200).json({
                    status: true,
                    message: 'Multiple images successfully added...!',
                    data: null,
                    access_token: null
                });
            }
    } catch (err) {
        console.error(err);
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};