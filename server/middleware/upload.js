// const { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("../config/constants");
// const multer = require("multer");
import multer from "multer";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "../config/constants";
module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});
