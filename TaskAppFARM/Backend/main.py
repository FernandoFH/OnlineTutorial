from fastapi import FastAPI, HTTPException 
from database import get_all_tasks, create_task, get_one_task
from models import Task

app = FastAPI()

@app.get('/')
def welcome():
    return {'message': 'Hoal es un mensaje'}; 

@app.get('/api/tasks')
async def get_tasks():
    tasks = await get_all_tasks()
    return tasks

@app.post('/api/tasks', response_model=Task)
async def save_task(task: Task):
    taskFound = await get_one_task(task.title)
    if taskFound:
        raise HTTPException(409, "Task already exists")
    
    response = await create_task(task.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.get('/api/tasks/{id}')
async def get_task():
    return 'single task'

@app.put('/api/tasks/{id}')
async def update_task():
    return 'updating task'

@app.delete('/api/tasks/{id}')
async def delete_task():
    return 'dalete task'