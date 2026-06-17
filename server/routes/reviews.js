const router = require('express').Router();
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('clientId');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    const saved = await review.save();
    const reviews = await Review.find({ portfolioId: review.portfolioId });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const Portfolio = require('../models/Portfolio');
    await Portfolio.findByIdAndUpdate(review.portfolioId, { rating: Math.round(avg * 10) / 10 });
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
