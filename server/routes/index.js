const express = require('express');
const authRoutes = require('./authRoute')
const taskRoutes = require('./taskRoute')

const router = express.Router();

/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
 */

router.use('/auth', authRoutes)
router.use('/tasks', taskRoutes)

module.exports = router;