import { Archive, FileCheck2 } from "lucide-react";

type LeftMenuProps = {
    menuSelection: string;
    setMenuSelection: React.Dispatch<React.SetStateAction<string>>;
};

const LeftMenu = ({ menuSelection, setMenuSelection }: LeftMenuProps) => {
    return (
        <div className="bg-white rounded-xl p-3 gap-3 flex flex-col">
            <div
                className={`rounded-xl px-3 py-1.5 flex items-center gap-1.5 ${
                    menuSelection === "tasks"
                        ? "bg-yellow-300"
                        : "bg-yellow-100 hover:bg-yellow-400 hover:cursor-pointer"
                }`}
                onClick={() => setMenuSelection("tasks")}
            >
                <FileCheck2 className="h-5" />
                <div>Tasks</div>
            </div>
            <div
                className={`rounded-xl px-3 py-1.5 flex items-center gap-1.5 ${
                    menuSelection === "archived"
                        ? "bg-yellow-300"
                        : "bg-yellow-100 hover:bg-yellow-400 hover:cursor-pointer"
                }`}
                onClick={() => setMenuSelection("archived")}
            >
                <Archive className="h-5" />
                <div>Archived</div>
            </div>
        </div>
    );
};

export default LeftMenu;
