import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    console.log("Incoming field name:", file.fieldname);
    cb(null, true);
  },
});

export default upload;

// Update your multer config
