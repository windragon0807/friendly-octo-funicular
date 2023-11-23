import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { Todo } from "../atoms";

interface Props {
  toDos: Todo[];
  boardId: string;
}

interface AreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

export default function Board({ toDos, boardId }: Props) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area // Drag 공간 생성
            ref={provided.innerRef} // Drag 공간 지정
            isDraggingOver={snapshot.isDraggingOver} // Drag 출발 지점
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} // Drag 도착 예상 지점
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {/* Drag하는 동안 Drag 위치 마련하기 위한 공간 */}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${({ theme }) => theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<AreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#74b9ff" : props.isDraggingFromThis ? "#fab1a0" : "transparent"};
  flex-grow: 1; // Drag 공간 확장
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
