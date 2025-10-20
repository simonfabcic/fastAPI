from fastapi import FastAPI
from pydantic import BaseModel


class Task(BaseModel):
    task_name: str
    is_done: bool = False


tasks: list[Task] = []

app = FastAPI()


@app.get("/")
def all_tasks():
    return tasks


@app.post("/")
def create_task(task: Task):
    tasks.append(task)
    return task
