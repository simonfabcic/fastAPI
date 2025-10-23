import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, EyeOff, FileCheck2, SquareCheckBig, Trash2 } from "lucide-react";

type Task = {
    task_name: string;
    is_done: boolean;
};

type TasksList = {
    title: string;
    tasks: Task[];
};

const Tasks = () => {
    const [tasksLists, setTasksLists] = useState<TasksList[]>();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_ENDPOINT}`)
            .then(function (responseAxios) {
                setTasksLists(responseAxios.data);
            })
            .catch(function (error) {
                console.error("During getting the tasks, error occurred: ", error);
            });
    }, []);

    return (
        <div className="flex flex-col gap-3">
            {tasksLists &&
                tasksLists.map((task_list, index) => (
                    <div className="bg-white rounded-2xl p-3" key={index}>
                        <h3 className="text-3xl mb-3 flex pl-2 justify-between">
                            <div className="flex items-center gap-2">
                                <FileCheck2 />
                                {task_list.title}
                            </div>
                            <div>
                                <Eye />
                                <EyeOff />
                            </div>
                        </h3>

                        <div className="flex flex-col gap-2">
                            {task_list.tasks.map((task, index) => (
                                <div className="bg-yellow-100 rounded-2xl px-3 py-1 flex justify-between" key={index}>
                                    {task.task_name}
                                    <div className="flex gap-2">
                                        <SquareCheckBig />
                                        <Trash2 />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Tasks;
