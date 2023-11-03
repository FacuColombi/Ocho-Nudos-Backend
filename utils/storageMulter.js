import multer from "multer";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
});