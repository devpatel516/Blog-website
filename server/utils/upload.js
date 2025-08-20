import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

if (!USERNAME || !PASSWORD) {
    console.error("Missing DB_USERNAME or DB_PASSWORD in .env file!");
    process.exit(1);  // Stop execution if env variables are missing
}

// MongoDB Connection URL
const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.hbrnf.mongodb.net/blogDB?retryWrites=true&w=majority&appName=blog-app`;

const storage = new GridFsStorage({
    url: MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (!match.includes(file.mimetype)) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

const upload = multer({ storage });

export default upload;
