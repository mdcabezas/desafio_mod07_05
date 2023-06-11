const express = require('express');
const router = express.Router();
const { paginatedItems, filteredItems, notRoute } = require('../controllers/indexController');
const { queryReport } = require('../middlewares/indexMiddlewares');

// Paginated route
router.get('/joyas', queryReport, paginatedItems);

// Filtered route
router.get('/joyas/filtros', queryReport, filteredItems);

// Not route
router.get('*', queryReport, notRoute);

module.exports = router;