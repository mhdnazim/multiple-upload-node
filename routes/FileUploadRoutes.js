import { Router } from "express"
import authCheck from "../middlewares/authCheck.js"
import uploadMiddleware from "../middlewares/multer/multipleUpload.js"
import { uploadMultipleFiles } from "../controller/MultipleFileUploadController.js";

const router = Router()

// multiple file upload using multer
router.post('/upload', uploadMiddleware,uploadMultipleFiles);

router.use(authCheck)

export default router;