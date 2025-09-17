const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://gomaterial:gomaterial%40123@admin-gomaterial.r3p4ezm.mongodb.net/venfurner?retryWrites=true&w=majority&appName=Admin-Gomaterial';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    currentPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Perfume', 'Eau de Parfum', 'Eau de Toilette', 'Attar', 'Body Mist']
    },
    images: [{
        type: String,
        required: true
    }],
    sizes: [{
        type: String,
        required: true
    }],
    colors: [{
        type: String,
        required: true
    }],
    quantityAvailable: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    punctuation: {
        countOpinions: {
            type: Number,
            default: 0
        },
        punctuation: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        votes: [{
            value: {
                type: Number,
                min: 1,
                max: 5
            },
            count: {
                type: Number,
                min: 0
            }
        }]
    },
    reviews: [{
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        punctuation: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

const initialProducts = [
    {
        name: "Royal Oud Perfume",
        price: 8999,
        currentPrice: 6299,
        discount: 30,
        category: "Perfume",
        images: ["/images/products/product-1.jpg"],
        sizes: ["50ml", "100ml"],
        colors: ["#8B4513", "#D2691E", "#F4A460", "#DEB887"],
        quantityAvailable: 10,
        punctuation: {
            countOpinions: 81,
            punctuation: 4.5,
            votes: [
                { value: 1, count: 1 },
                { value: 2, count: 10 },
                { value: 3, count: 10 },
                { value: 4, count: 20 },
                { value: 5, count: 40 },
            ],
        },
        reviews: [
            {
                name: "Priya Sharma",
                avatar: "/images/featured-1.jpg",
                description: "This Royal Oud perfume is absolutely divine! The woody notes are perfectly balanced with the oriental spices. It's become my signature scent and I receive compliments every time I wear it.",
                punctuation: 5,
            },
            {
                name: "Rajesh Kumar",
                avatar: "/images/featured-1.jpg",
                description: "Excellent quality perfume with long-lasting fragrance. The packaging is luxurious and the scent is sophisticated. Perfect for special occasions.",
                punctuation: 4,
            },
        ],
    },
    {
        name: "Rose Garden Eau de Parfum",
        price: 7499,
        currentPrice: 7499,
        category: "Eau de Parfum",
        images: ["/images/products/product-2.jpg"],
        sizes: ["50ml", "100ml"],
        colors: ["#FF69B4", "#DC143C", "#FF1493", "#FFB6C1"],
        quantityAvailable: 15,
        punctuation: {
            countOpinions: 65,
            punctuation: 4.3,
            votes: [
                { value: 1, count: 2 },
                { value: 2, count: 8 },
                { value: 3, count: 15 },
                { value: 4, count: 25 },
                { value: 5, count: 15 },
            ],
        },
        reviews: [
            {
                name: "Meera Singh",
                avatar: "/images/featured-1.jpg",
                description: "Lovely floral fragrance with authentic rose notes. It's romantic and feminine without being overwhelming. Perfect for daily wear.",
                punctuation: 4,
            },
        ],
    },
    {
        name: "Sandalwood Mystique",
        price: 9999,
        currentPrice: 9999,
        category: "Perfume",
        images: ["/images/products/product-3.jpg"],
        sizes: ["50ml", "100ml"],
        colors: ["#8B4513", "#D2691E", "#F4A460", "#DEB887"],
        quantityAvailable: 8,
        punctuation: {
            countOpinions: 92,
            punctuation: 4.7,
            votes: [
                { value: 1, count: 1 },
                { value: 2, count: 5 },
                { value: 3, count: 12 },
                { value: 4, count: 30 },
                { value: 5, count: 44 },
            ],
        },
        reviews: [
            {
                name: "Arun Desai",
                avatar: "/images/featured-1.jpg",
                description: "Authentic Mysore sandalwood fragrance that brings back memories of traditional Indian temples. The scent is pure and spiritual.",
                punctuation: 5,
            },
        ],
    },
    {
        name: "Jasmine Dreams",
        price: 6499,
        currentPrice: 6499,
        category: "Perfume",
        images: ["/images/products/product-4.jpg"],
        sizes: ["50ml", "100ml"],
        colors: ["#FFD700", "#F0E68C", "#FFFFE0", "#FFFACD"],
        quantityAvailable: 12,
        punctuation: {
            countOpinions: 78,
            punctuation: 4.4,
            votes: [
                { value: 1, count: 2 },
                { value: 2, count: 8 },
                { value: 3, count: 15 },
                { value: 4, count: 28 },
                { value: 5, count: 25 },
            ],
        },
        reviews: [
            {
                name: "Lakshmi Iyer",
                avatar: "/images/featured-1.jpg",
                description: "Beautiful jasmine fragrance that captures the essence of Indian gardens. It's fresh, floral, and perfect for summer evenings.",
                punctuation: 4,
            },
        ],
    },
    {
        name: "Amber & Musk",
        price: 8499,
        currentPrice: 8499,
        category: "Perfume",
        images: ["/images/products/product-5.jpg"],
        sizes: ["50ml", "100ml"],
        colors: ["#8B4513", "#D2691E", "#F4A460", "#DEB887"],
        quantityAvailable: 6,
        punctuation: {
            countOpinions: 56,
            punctuation: 4.2,
            votes: [
                { value: 1, count: 3 },
                { value: 2, count: 8 },
                { value: 3, count: 15 },
                { value: 4, count: 20 },
                { value: 5, count: 10 },
            ],
        },
        reviews: [
            {
                name: "Deepak Sharma",
                avatar: "/images/featured-1.jpg",
                description: "Sophisticated amber and musk combination that's perfect for evening wear. The scent is warm and sensual.",
                punctuation: 4,
            },
        ],
    },
    {
        name: "Lavender Fields",
        price: 5499,
        currentPrice: 4124,
        discount: 25,
        category: "Perfume",
        images: ["/images/products/product-6.jpg"],
        sizes: ["50ml", "100ml"],
        colors: ["#9370DB", "#8A2BE2", "#9932CC", "#BA55D3"],
        quantityAvailable: 20,
        punctuation: {
            countOpinions: 45,
            punctuation: 4.1,
            votes: [
                { value: 1, count: 2 },
                { value: 2, count: 5 },
                { value: 3, count: 12 },
                { value: 4, count: 18 },
                { value: 5, count: 8 },
            ],
        },
        reviews: [
            {
                name: "Neha Kapoor",
                avatar: "/images/featured-1.jpg",
                description: "Soothing lavender fragrance that helps me relax after a long day. It's fresh and calming, perfect for stress relief.",
                punctuation: 4,
            },
        ],
    },
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        const products = await Product.insertMany(initialProducts);
        console.log(`Seeded ${products.length} products successfully`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedDatabase(); 