require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Collection = require('../models/Collection');

async function seedDatabase() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from environment variables. Cannot seed database.');
    }

    console.log('Connecting to MongoDB...', process.env.MONGO_URI.split('@')[1] || '(local)');
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('Clearing existing products and collections...');
    await Product.deleteMany({});
    await Collection.deleteMany({});

    console.log('Inserting Collections...');
    const collectionsData = [
      {
        handle: 'signature-collection',
        title: 'Signature Collection',
        description: 'Experience premium responsive web design translating high-end fashion natively.',
        image: 'https://picsum.photos/1200/600?random=100'
      },
      {
        handle: 'summer-fits',
        title: 'Summer Fits',
        description: 'Lightweight essentials built for the perfect warm weather outfitting.',
        image: 'https://picsum.photos/1200/600?random=101'
      }
    ];

    const insertedCollections = await Collection.insertMany(collectionsData);
    const signatureId = insertedCollections[0]._id;
    const summerId = insertedCollections[1]._id;

    console.log('Inserting Products...');
    const productsData = [
      {
        handle: 'oversized-cotton-tee',
        title: 'Oversized Cotton Tee',
        vendor: 'NCUT',
        productType: 'Shirts',
        description: 'A structural masterpiece cut from ultra-heavyweight cotton.',
        images: [
          'https://picsum.photos/800/1000?random=1',
          'https://picsum.photos/800/1000?random=2',
          'https://picsum.photos/800/1000?random=3'
        ],
        tags: ['cotton', 'oversized', 'tee', 'summer'],
        collectionIds: [signatureId, summerId],
        isAvailable: true,
        price: 4500,
        options: [
          { name: 'Size', values: ['S', 'M', 'L', 'XL'] },
          { name: 'Color', values: ['Black', 'White', 'Dust'] }
        ],
        variants: [
          { title: 'Black / M', price: 4500, inventory: 50, options: new Map([['Size', 'M'], ['Color', 'Black']]) },
          { title: 'White / M', price: 4500, inventory: 12, options: new Map([['Size', 'M'], ['Color', 'White']]) },
          { title: 'Dust / M', price: 4500, inventory: 0, options: new Map([['Size', 'M'], ['Color', 'Dust']]) } // Sold out Variant
        ]
      },
      {
        handle: 'structured-cargo-pants',
        title: 'Structured Cargo Pants',
        vendor: 'NCUT',
        productType: 'Pants',
        description: 'Multi-pocket tactical trousers featuring reinforced knees and adjustable hems.',
        images: [
          'https://picsum.photos/800/1000?random=4',
          'https://picsum.photos/800/1000?random=5'
        ],
        tags: ['cargo', 'pants', 'utility'],
        collectionIds: [signatureId],
        isAvailable: true,
        price: 8900,
        compareAtPrice: 12000, // ON SALE!
        options: [
          { name: 'Size', values: ['28', '30', '32', '34'] }
        ],
        variants: [
          { title: '30', price: 8900, compare_at_price: 12000, inventory: 5, options: new Map([['Size', '30']]) },
          { title: '32', price: 8900, compare_at_price: 12000, inventory: 0, options: new Map([['Size', '32']]) }
        ]
      },
      {
        handle: 'heavyweight-hoodie-ash',
        title: 'Heavyweight Hoodie - Ash',
        vendor: 'NCUT',
        productType: 'Outerwear',
        description: 'Dense 500gsm French Terry hoodie with dropped shoulders and a hidden kangaroo pocket.',
        images: [
          'https://picsum.photos/800/1000?grayscale',
          'https://picsum.photos/800/1000?random=6'
        ],
        tags: ['hoodie', 'sweatshirt', 'heavyweight'],
        collectionIds: [signatureId],
        isAvailable: false, // ENTIRELY SOLD OUT
        price: 11000,
        options: [
          { name: 'Size', values: ['M', 'L'] }
        ],
        variants: [
          { title: 'M', price: 11000, inventory: 0, options: new Map([['Size', 'M']]) },
          { title: 'L', price: 11000, inventory: 0, options: new Map([['Size', 'L']]) }
        ]
      },
      {
        handle: 'ncut-signature-beanie',
        title: 'NCUT Signature Beanie',
        vendor: 'NCUT',
        productType: 'Accessories',
        description: 'Rib-knit wool blend beanie featuring a subtle tonal NCUT rubber patch.',
        images: [
          'https://picsum.photos/800/1000?random=7'
        ],
        tags: ['accessories', 'beanie', 'headwear'],
        collectionIds: [summerId],
        isAvailable: true,
        price: 3500,
        compareAtPrice: 5000, // ON SALE!
        options: [
          { name: 'Color', values: ['Navy', 'Olive'] }
        ],
        variants: [
          { title: 'Navy', price: 3500, compare_at_price: 5000, inventory: 200, options: new Map([['Color', 'Navy']]) },
          { title: 'Olive', price: 3500, compare_at_price: 5000, inventory: 15, options: new Map([['Color', 'Olive']]) }
        ]
      }
    ];

    await Product.insertMany(productsData);
    console.log(`Successfully seeded ${productsData.length} Products and ${collectionsData.length} Collections!`);
    
    console.log('Disconnecting from MongoDB...');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation Error Details:');
      for (let field in error.errors) {
        console.error(`- ${field}: ${error.errors[field].message} (Type: ${error.errors[field].kind})`);
      }
    } else {
      console.error('Error seeding database:', error);
    }
    process.exit(1);
  }
}

seedDatabase();
