const Task = require('../models/task');
const { getWeatherData } = require('../services/weather');

const tasks = [
  new Task(1, 'Sample Task', 'This is a sample task', 'Tallinn, Estonia', false),
  new Task(2, 'Sample Task2', 'This is a sample task', 'Tallinn, Estonia', false),
  new Task(3, 'Sample Task3', 'This is a sample task', 'Tallinn, Estonia', false),
  new Task(4, 'Sample Task4', 'This is a sample task', 'Tallinn, Estonia', false),
  new Task(5, 'Sample Task5', 'This is a sample task', 'Tallinn, Estonia', false),
  new Task(6, 'Sample Task6', 'This is a sample task', 'Tallinn, Estonia', false)
];

exports.getAllTasks = (req, res) => {
  res.json(tasks.sort((a, b) => b.id - a.id));
};

exports.getTaskById = async (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  try {
    if (task) {
      task.weather = await getWeatherData(task.location)
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong!');
  }
};

exports.createTask = (req, res) => {
  const { name, description, location } = req.body;
  const newTask = new Task(tasks.length + 1, name, description, location, false, req.user, null);
  tasks.push(newTask);
  res.status(200).json(newTask);
};

exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    const { name, description, location, completed } = req.body;
    task.name = name || task.name;
    task.description = description || task.description;
    task.location = location || task.location;
    task.completed = completed !== undefined ? completed : task.completed;
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
};

exports.deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1)
    res.json(tasks);
  } else {
    res.status(404).send('Task not found');
  }
};
