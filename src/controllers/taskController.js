import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  let completed;
  if (req.query.completed !== undefined) {
    if (req.query.completed !== 'true' && req.query.completed !== 'false') {
      const err = new Error('Invalid query parameter: completed must be true or false');
      err.status = 400;
      return next(err);
    }
    completed = req.query.completed === 'true';
  }

  const tasks = await taskService.getAllTasks(completed);
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
