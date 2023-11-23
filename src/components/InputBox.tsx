import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState } from "../atoms";
import CreateToDo from "./CreateToDo";

export default function InputBox() {
  // const toDos = useRecoilValue(toDoSelector); // 카테고리에 맞는 ToDo만 가져옴
  const [category, setCategory] = useRecoilState(categoryState);

  // 📌 select는 onChange가 아닌 onInput을 사용합니다.
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    console.log(event.currentTarget.value);
  };

  return (
    <Wrapper>
      <select value={category} onInput={onInput}>
        <option value={Categories.To_Do}>To Do</option>
        <option value={Categories.Doing}>Doing</option>
        <option value={Categories.Done}>Done</option>
      </select>
      <Sizedbox />
      <CreateToDo />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Sizedbox = styled.div`
  width: 10px;
`;
