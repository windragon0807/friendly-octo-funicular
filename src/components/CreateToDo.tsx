import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        console.log(category);
        const newToDo = {
            id: Date.now(),
            text: toDo,
            category,
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [category]: [newToDo, ...allBoards[category]], // 새로운 객체를 맨 위에 추가
            };
        });
        setValue("toDo", ""); // input 값 초기화
    };
    useEffect(() => {
        console.log("  🔔", toDos);
    }, [toDos]);
    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input
                {...register("toDo", {
                    required: "Please write your plans",
                })}
                placeholder="Please write your plans"
            />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;
