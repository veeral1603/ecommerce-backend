import multer from "multer";

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 20,
  },
});

export default multerUpload;
