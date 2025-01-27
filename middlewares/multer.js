import multer from "multer";
import path from "path";
import fs from "fs";
const directory = path.resolve("/home/lelouch/Tech/Blogging/public/uploads/");
// if (!fs.existsSync(directory)) {
//   fs.mkdirSync(directory, { recursive: true });
//   console.log(`Created directory: ${directory}`);
// } else {
//   console.log(`Directory already exists: ${directory}`);
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });
export { upload };
