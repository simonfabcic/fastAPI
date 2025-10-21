from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


class Task(BaseModel):
    task_name: str | None = None
    is_done: bool = False


class TasksList(BaseModel):
    title: str
    tasks: list[Task] = []
    is_hidden: bool = False


# seed data
tasks_lists: list[TasksList] = [
    TasksList(
        title="Home tasks",
        tasks=[
            Task(task_name="Buy milk"),
            Task(task_name="Walk the dog"),
            Task(task_name="Finish FastAPI tutorial"),
            Task(task_name="Clean the desk"),
            Task(task_name="Call mom"),
        ],
    ),
    TasksList(
        title="Work tasks",
        tasks=[
            Task(task_name="Review pull requests"),
            Task(task_name="Update documentation"),
            Task(task_name="Attend team meeting", is_done=True),
            Task(task_name="Fix bug #1234"),
        ],
    ),
    TasksList(
        title="Shopping list",
        tasks=[
            Task(task_name="Eggs"),
            Task(task_name="Bread"),
            Task(task_name="Cheese", is_done=True),
            Task(task_name="Coffee"),
            Task(task_name="Vegetables"),
        ],
    ),
    TasksList(
        title="Weekend plans",
        tasks=[
            Task(task_name="Go hiking"),
            Task(task_name="Watch a movie"),
            Task(task_name="Visit grandparents"),
        ],
    ),
]

app = FastAPI()


@app.get("/", response_model=list[TasksList])
def all_tasks_lists():
    return tasks_lists


@app.post("/list/")
def create_tasks_list(tasks_list: TasksList):
    tasks_lists.append(tasks_list)
    return tasks_list


@app.put("/list/{list_id}/", response_model=TasksList)
def replace_tasks_list(list_id: int, list: TasksList):
    if is_valid_tasks_list_id(list_id):
        tasks_lists[list_id] = list
        return list


@app.patch("/list/{list_id}/", response_model=TasksList)
def update_tasks_list(list_id: int, list: TasksList):
    if is_valid_tasks_list_id(list_id):
        list_in_db_model = tasks_lists[list_id]
        request_data = list.model_dump(exclude_unset=True)
        updated_list = list_in_db_model.model_copy(update=request_data)
        tasks_lists[list_id] = updated_list
        return updated_list


@app.post("/task/{list_id}/", response_model=Task)
def add_task_to_list(list_id: int, task: Task):
    if is_valid_tasks_list_id(list_id):
        tasks_lists[list_id].tasks.append(task)
        return task


@app.put("/task/{list_id}/{task_id}/", response_model=Task)
def replace_task(list_id: int, task_id: int, task: Task):
    if is_valid_task_id(list_id, task_id):
        tasks_lists[list_id].tasks[task_id] = task
        return task


@app.patch("/task/{list_id}/{task_id}/", response_model=Task)
def update_task(list_id: int, task_id: int, task: Task):
    if is_valid_task_id(list_id, task_id):
        task_in_db_model = tasks_lists[list_id].tasks[task_id]
        request_data = task.model_dump(exclude_unset=True)
        updated_task = task_in_db_model.model_copy(update=request_data)
        tasks_lists[list_id].tasks[task_id] = updated_task
        return updated_task


def is_valid_tasks_list_id(list_id: int):
    if list_id < 0 or list_id >= len(tasks_lists):
        raise HTTPException(status_code=404, detail="List not found")
    return True


def is_valid_task_id(list_id: int, task_id: int):
    if is_valid_tasks_list_id(list_id):
        if task_id < 0 or task_id >= len(tasks_lists[list_id].tasks):
            raise HTTPException(status_code=404, detail="Task not found")
        return True
