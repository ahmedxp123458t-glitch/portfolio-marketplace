const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const User = require('./models/User');
const Portfolio = require('./models/Portfolio');
const Project = require('./models/Project');
const Review = require('./models/Review');

const seed = async () => {
  await connectDB();
  await User.deleteMany({});
  await Portfolio.deleteMany({});
  await Project.deleteMany({});
  await Review.deleteMany({});

  const users = await User.insertMany([
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'freelancer', bio: 'Full-stack developer with 5 years experience' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'client', bio: 'Startup founder looking for talent' },
    { name: 'Carol Davis', email: 'carol@example.com', role: 'freelancer', bio: 'UI/UX designer and frontend dev' }
  ]);

  const portfolios = await Portfolio.insertMany([
    { userId: users[0]._id, title: 'Alice Portfolio', description: 'Full-stack projects', skills: ['React', 'Node.js', 'MongoDB'], rating: 4.5 },
    { userId: users[2]._id, title: 'Carol Portfolio', description: 'Design projects', skills: ['Figma', 'React', 'CSS'], rating: 4.8 }
  ]);

  await Project.insertMany([
    { portfolioId: portfolios[0]._id, title: 'E-commerce App', description: 'Full-stack e-commerce platform', link: 'https://github.com/alice/ecom', image: '' },
    { portfolioId: portfolios[0]._id, title: 'Chat App', description: 'Real-time chat application', link: 'https://github.com/alice/chat', image: '' },
    { portfolioId: portfolios[1]._id, title: 'Portfolio Design', description: 'Personal portfolio website design', link: 'https://dribbble.com/carol/portfolio', image: '' }
  ]);

  await Review.insertMany([
    { portfolioId: portfolios[0]._id, clientId: users[1]._id, rating: 5, comment: 'Excellent work!' },
    { portfolioId: portfolios[0]._id, clientId: users[1]._id, rating: 4, comment: 'Great communication' }
  ]);

  console.log('Portfolio Marketplace data seeded successfully');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
