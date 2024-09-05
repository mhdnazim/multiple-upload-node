import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./Database/DB-connection.js"
import FileUploadRoutes from "./routes/FileUploadRoutes.js"
import { fileURLToPath } from 'url'
import { dirname, join } from "path"
import fs from 'fs'
import { errorHandler, notFound } from "./middlewares/errorMiddleWare.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

// Define the path for the uploads directory
const uploadsPath = join(__dirname, 'uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

dotenv.config()

const app = express()

const port = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res, next) => {
    res.send("Api is Running...!")
})

app.use('/multiple', FileUploadRoutes)
app.use('/', express.static(uploadsPath))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started running on port ${port}`))
