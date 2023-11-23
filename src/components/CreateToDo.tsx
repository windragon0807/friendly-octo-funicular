import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const [, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
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
