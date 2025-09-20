import { Op } from "sequelize";
import Task from "../models/taskModels.js";

export const createTaskController = async (req, res)=>{
  try {
    const task = await Task.create(req.body);
    res.json(task)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}


export const getTask = async (req, res, next)=>{
  try {
    let {page=1, limit=10, status, due_date} = req.query;
    page= parseInt(page);
    limit = parseInt(limit);
    const offset = (page-1) * limit;
    const where = {};

    if(status) where.status = status;
    if(due_date) where.due_date = {[Op.lt]: new Date(due_date)};

    const {rows, count} = await Task.findAndCountAll({
      where,
      limit,
      offset,
      order:[["createdAt", "DESC"]]
    });

    res.json({
      total: count,
      page,
      limit,
      task: rows,
    })
    

    
  } catch (error) {
    next(error);
    
  }
}

export const getTaskById = async (req, res)=>{
  try {
    const task =await Task.findByPk(req.params.id);
    if(!task) return res.status(404).json({message: "Task not found"});
    res.json(task);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const updateTask = async (req, res)=>{
  try {
    const task = await Task.findByPk(req.params.id);
    if(!task) return res.status(404).json({message: "Task not found"});
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const deleteTask = async (req, res)=>{
  try {
    const task = await Task.findByPk(req.params.id);
    if(!task) return res.status(404).json({message: "Task not found"});
    await task.destroy();

    res.json({message: "The task was successfully deleted"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}