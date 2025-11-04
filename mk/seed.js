const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sizes: [String],
  inStock: Boolean
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    name: 'Elegant Evening Dress',
    price: 129.99,
    description: 'Perfect for special occasions and evening events',
    category: 'Evening',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    name: 'Summer Floral Dress',
    price: 79.99,
    description: 'Light and breezy for warm summer days',
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    name: 'Classic Black Dress',
    price: 99.99,
    description: 'Timeless elegance for any occasion',
    category: 'Formal',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true
  },
  {
    name: 'Bohemian Maxi Dress',
    price: 89.99,
    description: 'Flowing and comfortable boho style',
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    name: 'Cocktail Party Dress',
    price: 149.99,
    description: 'Stunning dress for cocktail parties',
    category: 'Party',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true
  },
  {
    name: 'Casual Day Dress',
    price: 59.99,
    description: 'Comfortable and stylish for everyday wear',
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  }
];

async function seedDatabase() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
