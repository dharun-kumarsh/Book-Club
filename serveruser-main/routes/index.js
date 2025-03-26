const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
// Import other route files here

router.use('/api/users', userRoutes);
// router.use('/api/books', bookRoutes);
// router.use('/api/reviews', reviewRoutes);
// router.use('/api/clubs', clubRoutes);

module.exports = router;