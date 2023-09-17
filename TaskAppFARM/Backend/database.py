from motor.motor_asyncio import AsyncIOMotorClient
from models import Task

client = AsyncIOMotorClient('mongodb+srv://fernando:9885123.asdx@cluster0.py0t8my.mongodb.net/?retryWrites=true&w=majority')
database = client.taskdatabase
collection = database.tasks

async def get_one_task_id(id):
    task = await collection.find_one({'_id': id})
    return task 

async def get_one_task(title):
    task = await collection.find_one({'title': title})
    return task 

async def get_all_tasks():
    tasks = []
    cursor = collection.find({})
    async for docuemnt in cursor:
        tasks.append(Task(**docuemnt))
    return tasks 

async def create_task(task):
    new_task = await collection.insert_one(task)
    create_task = await collection.find_one({'_id': new_task.inserted_id})
    return create_task 

async def update_task(id: str, task):
    await collection.update_one({'_id': id}, {'$set': task})
    document = await collection.find_one({'_id': id})
    return document 

async def delete_task(id: str):
    await collection.delete_one({'_id': id})
    return True 