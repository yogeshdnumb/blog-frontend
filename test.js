require("dotenv").config();
const mongoose = require('mongoose');
const faker = require('faker');

// Define the Mongoose schema for articles
const articleSchema = mongoose.Schema({
  author: { type: String },
  title: { type: String },
  body: { type: String },
  created: { type: Date, default: Date.now },
});

// Create a Mongoose model for articles
const Article = mongoose.model('Article', articleSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL_PROD, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check for database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Generate dummy text for the article body
  function generateBody() {
    let body = '';
    // Generate multiple paragraphs to make the body large
    for (let i = 0; i < 10; i++) {
      body += faker.lorem.paragraph(); // Generate a paragraph of dummy text
      body += '\n\n'; // Add new lines between paragraphs
    }
    return body;
  }

  // Sample article data with large body
  const sampleArticles = [
    {
      author: 'John Doe',
      title: 'Introduction to MongoDB',
      body: generateBody(), // Generate large body
      created: new Date()
    },
    {
      author: 'Jane Smith',
      title: 'Getting Started with Mongoose',
      body: generateBody(), // Generate large body
      created: new Date()
    },
    // Add 10 more sample articles
    {
      author: 'Alice Johnson',
      title: 'Node.js Best Practices',
      body: generateBody(),
      created: new Date()
    },
    {
      author: 'Bob Thompson',
      title: 'React Hooks Tutorial',
      body: generateBody(),
      created: new Date()
    },
    {
      author: 'Emily Davis',
      title: 'JavaScript Promises Explained',
      body: generateBody(),
      created: new Date()
    },
    {
      author: 'David Brown',
      title: 'CSS Grid Layout Basics',
      body: generateBody(),
      created: new Date()
    },
    {
      author: 'Sophia Martinez',
      title: 'Vue.js vs React.js',
      body: generateBody(),
      created: new Date()
    },
    {
      author: 'Michael Wilson',
      title: 'Express.js Middleware Guide',
      body: generateBody(),
      created: new Date()
    },
    {
      author: 'Olivia Garcia',
      title: 'HTML5 Canvas Tutorial',
      body: generateBody(),
      created: new Date()
    },
    {
      author: 'William Rodriguez',
      title: 'Docker Basics for Developers',
      body: generateBody(),
      created: new Date()
    },
    {
      author: 'Emma Anderson',
      title: 'Responsive Web Design Principles',
      body: generateBody(),
      created: new Date()
    }
  ];

  try {
    // Insert sample articles into the database
    const insertedArticles = await Article.insertMany(sampleArticles);
    console.log('Sample articles inserted:', insertedArticles);
  } catch (error) {
    console.error('Error inserting sample articles:', error);
  }

  // Disconnect from MongoDB
  mongoose.disconnect();
});
