from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel


class Task(BaseModel):
    task_name: str | None = None
    is_done: bool = False


tasks: list[Task] = [
    Task(task_name="Buy milk"),
    Task(task_name="Walk the dog"),
    Task(task_name="Finish FastAPI tutorial"),
    Task(task_name="Clean the desk"),
    Task(task_name="Call mom"),
]

app = FastAPI()


@app.get("/", response_model=list[Task])
def all_tasks():
    return tasks


@app.post("/")
def create_task(task: Task):
    tasks.append(task)
    return task


@app.put("/{task_id}", response_model=Task)
def replace_task(task_id: int, task: Task):
    new_task_encoded = jsonable_encoder(task)
    tasks[task_id] = new_task_encoded
    return new_task_encoded


@app.patch("/{task_id}", response_model=Task)
def update_task(task_id: int, task: Task):
    task_in_db_model = tasks[task_id]
    request_data = task.model_dump(exclude_unset=True)
    updated_task = task_in_db_model.model_copy(update=request_data)
    tasks[task_id] = updated_task
    return updated_task
