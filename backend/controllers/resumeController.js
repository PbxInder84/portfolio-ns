const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const uploadResume = (req, res) => {
    res.status(201).json({ message: "Resume uploaded successfully.", file: req.file });
};

const getResume = (req, res) => {
    res.download(`uploads/resumes/${req.params.filename}`);
};

module.exports = { upload, uploadResume, getResume }; 