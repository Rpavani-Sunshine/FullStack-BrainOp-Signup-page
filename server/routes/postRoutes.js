// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /api/posts
router.get('/', postController.getPosts);

module.exports = router;
