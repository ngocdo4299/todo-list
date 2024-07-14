const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authorize } = require('../middlewares/auth');
const { USER_ROLE } = require('../constant');

/**
 * @swagger
 * /tasks:
 *   get:
 *     description: Get all tasks
 *     responses:
 *       200:
 *         description: Success 
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authorize([USER_ROLE.ADMIN, USER_ROLE.USER]), taskController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     description: Get task by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authorize([USER_ROLE.ADMIN, USER_ROLE.USER]), taskController.getTaskById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     description: Create a new task
 *     parameters:
 *       - name: task
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             location:
 *               type: string
 *             completed:
 *               type: boolean
 *     responses:
 *       201:
 *         description: Created
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authorize([USER_ROLE.ADMIN]), taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     description: Update a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: task
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             location:
 *               type: string
 *             completed:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Updated
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authorize([USER_ROLE.ADMIN, USER_ROLE.USER]), taskController.updateTask); // did user allow to mark task as complete?

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     description: Delete a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authorize([USER_ROLE.ADMIN, USER_ROLE.USER]), taskController.deleteTask);
module.exports = router;
