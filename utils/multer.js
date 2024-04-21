import multer from "multer";
const upload = multer({
  dest: "/public/uploads",
  limits: {
    files: 1,
    fileSize: 10 ** 6, // 1MB
  },
});

export default upload;
