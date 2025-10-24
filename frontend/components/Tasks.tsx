import { useEffect, useState } from "react";
import axios from "axios";
import { Archive, ArchiveRestore, FileCheck2, PartyPopper, RotateCcw, SquareCheckBig, Trash2 } from "lucide-react";

type Task = {
    task_name: string;
    is_done: boolean;
};

type TasksList = {
    title: string;
    tasks: Task[];
    is_archived: boolean;
};

type TasksProps = {
    menuSelection: string;
};

const Tasks = ({ menuSelection }: TasksProps) => {
    const [tasksLists, setTasksLists] = useState<TasksList[]>();

    const getTasks = () => {
        axios
            .get(`${import.meta.env.VITE_API_ENDPOINT}`)
            .then(function (responseAxios) {
                setTasksLists(responseAxios.data);
            })
            .catch(function (error) {
                console.error("During getting the tasks, error occurred: ", error);
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    const markTaskDoneOrUndone = (list_id: number, task_id: number, is_done: boolean): void => {
        axios
            .patch(`${import.meta.env.VITE_API_ENDPOINT}/task/${list_id}/${task_id}/`, {
                is_done: is_done,
            })
            .then(function () {
                getTasks();
            });
    };

    const deleteTask = (list_id: number, task_id: number) => {
        axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/task/${list_id}/${task_id}/`).then(function () {
            getTasks();
        });
    };

    const archiveOrRestoreList = (list_id: number, archive: boolean): void => {
        axios
            .patch(`${import.meta.env.VITE_API_ENDPOINT}/list/${list_id}/`, {
                is_archived: archive,
            })
            .then(function () {
                getTasks();
            });
    };

    const renderContent = () => {
        if (!tasksLists) {
            return;
        }
        switch (menuSelection) {
            case "tasks":
                return (
                    <div className="flex flex-col gap-3">
                        {tasksLists.map(
                            (task_list, list_index) =>
                                task_list.is_archived == false && (
                                    <div className="bg-white rounded-2xl p-3" key={list_index}>
                                        <h3 className="text-3xl mb-3 flex pl-2 justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <FileCheck2 />
                                                {task_list.title}
                                            </div>
                                            <div className="cursor-pointer">
                                                <Archive onClick={() => archiveOrRestoreList(list_index, true)} />
                                            </div>
                                        </h3>

                                        {/* List uncompleted */}
                                        <div className="flex flex-col gap-2">
                                            <input
                                                type="text"
                                                className="bg-yellow-100 rounded-2xl w-full px-3 py-1 border border-black"
                                            />
                                            {/* TODO add `tick` to confirm input, `x` to delete */}
                                            {task_list.tasks.map(
                                                (task, task_index) =>
                                                    !task.is_done && (
                                                        <div
                                                            className="bg-yellow-100 rounded-2xl px-3 py-1 flex justify-between"
                                                            key={task_index}
                                                        >
                                                            {task.task_name}
                                                            <div className="flex gap-2 items-center">
                                                                <SquareCheckBig
                                                                    onClick={() =>
                                                                        markTaskDoneOrUndone(
                                                                            list_index,
                                                                            task_index,
                                                                            true
                                                                        )
                                                                    }
                                                                    className="h-5 cursor-pointer"
                                                                />
                                                                <Trash2
                                                                    onClick={() => deleteTask(list_index, task_index)}
                                                                    className="h-5 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                            )}
                                        </div>

                                        {/* List completed */}
                                        {task_list.tasks.some((task) => task.is_done) && (
                                            <div className="flex items-center mt-3">
                                                <PartyPopper className="h-4" />
                                                <div>Already done</div>
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-2">
                                            {task_list.tasks.map(
                                                (task, task_index) =>
                                                    task.is_done && (
                                                        <div
                                                            className="bg-yellow-100 rounded-2xl px-3 py-1 flex justify-between"
                                                            key={task_index}
                                                        >
                                                            <div className="line-through">{task.task_name}</div>
                                                            <div className="flex gap-2 items-center">
                                                                <RotateCcw
                                                                    className="h-5 cursor-pointer"
                                                                    onClick={() =>
                                                                        markTaskDoneOrUndone(
                                                                            list_index,
                                                                            task_index,
                                                                            false
                                                                        )
                                                                    }
                                                                />
                                                                <Trash2
                                                                    onClick={() => deleteTask(list_index, task_index)}
                                                                    className="h-5 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                            )}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                );

            case "archived":
                return (
                    <div className="flex flex-col gap-3">
                        {tasksLists.map(
                            (task_list, list_index) =>
                                task_list.is_archived == true && (
                                    <div className="bg-white rounded-2xl p-3" key={list_index}>
                                        <h3 className="text-3xl mb-3 flex pl-2 justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <FileCheck2 />
                                                {task_list.title}
                                            </div>
                                            <div className="cursor-pointer">
                                                <ArchiveRestore
                                                    onClick={() => archiveOrRestoreList(list_index, false)}
                                                />
                                            </div>
                                        </h3>

                                        {/* List uncompleted */}
                                        <div className="flex flex-col gap-2">
                                            {task_list.tasks.map(
                                                (task, task_index) =>
                                                    !task.is_done && (
                                                        <div
                                                            className="bg-yellow-100 rounded-2xl px-3 py-1 flex justify-between"
                                                            key={task_index}
                                                        >
                                                            {task.task_name}
                                                            <div className="flex gap-2 items-center">
                                                                <SquareCheckBig
                                                                    onClick={() =>
                                                                        markTaskDoneOrUndone(
                                                                            list_index,
                                                                            task_index,
                                                                            true
                                                                        )
                                                                    }
                                                                    className="h-5 cursor-pointer"
                                                                />
                                                                <Trash2
                                                                    onClick={() => deleteTask(list_index, task_index)}
                                                                    className="h-5 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                            )}
                                        </div>

                                        {/* List completed */}
                                        <div className="flex items-center mt-3">
                                            <PartyPopper className="h-4" />
                                            <div>Already done</div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {task_list.tasks.map(
                                                (task, task_index) =>
                                                    task.is_done && (
                                                        <div
                                                            className="bg-yellow-100 rounded-2xl px-3 py-1 flex justify-between"
                                                            key={task_index}
                                                        >
                                                            <div className="line-through">{task.task_name}</div>
                                                            <div className="flex gap-2 items-center">
                                                                <RotateCcw
                                                                    className="h-5 cursor-pointer"
                                                                    onClick={() =>
                                                                        markTaskDoneOrUndone(
                                                                            list_index,
                                                                            task_index,
                                                                            false
                                                                        )
                                                                    }
                                                                />
                                                                <Trash2
                                                                    onClick={() => deleteTask(list_index, task_index)}
                                                                    className="h-5 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                            )}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                );
        }
    };

    useEffect(() => {
        renderContent();
    }, [menuSelection, tasksLists]);

    return <div>{renderContent()}</div>;
};

export default Tasks;
