"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Offer_1 = require("./models/Offer");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const Image_1 = require("./models/Image");
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
// MongoDB Connection
const dbUri = 'mongodb://127.0.0.1:27017/testdb';
mongoose_1.default.connect(dbUri)
    .then(() => {
    console.log('Database connected successfully');
})
    .catch((error) => {
    console.error('Database connection error:', error);
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); // Save images in the "public/images" directory
    },
    filename: (req, file, cb) => {
        const originalName = path_1.default.parse(file.originalname).name.replace(/\s+/g, '_'); // Remove spaces
        const extension = path_1.default.extname(file.originalname); // Get file extension
        const uniqueId = (0, uuid_1.v4)(); // Generate unique ID
        cb(null, `${originalName}_${uniqueId}${extension}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// POST Route
app.post('/upload', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request Body:', req.body); // Log the form data
        console.log('Uploaded File:', req.file); // Log the uploaded file data
        const { title, description, price } = req.body;
        let imageId;
        if (req.file) {
            const image = new Image_1.Image({
                filename: req.file.filename,
                path: `/images/${req.file.filename}`,
            });
            const savedImage = yield image.save();
            imageId = savedImage._id; // Get the image ID
        }
        // Save the offer
        const offer = new Offer_1.Offer({ title, description, price, imageId });
        yield offer.save();
        res.status(201).send('Offer and image saved successfully!');
    }
    catch (error) {
        console.error('Error saving offer or image:', error);
        res.status(500).send('Failed to save offer and image');
    }
}));
// get route 
app.get('/offers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all offers and populate the image information
        const offers = yield Offer_1.Offer.find().populate('imageId');
        // Transform the offers into the desired format
        const response = offers.map((offer) => {
            const image = offer.imageId;
            return {
                title: offer.title,
                description: offer.description,
                price: offer.price,
                imagePath: image ? image.path : null,
            };
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).send('Failed to fetch offers');
    }
}));
// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
