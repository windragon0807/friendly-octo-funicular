import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface AreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const DeleteBox = () => {
  return (
    <Droppable droppableId="trash">
      {(provided, snapshot) => (
        <Area
          ref={provided.innerRef} // 드래그 공간 지정
          isDraggingOver={snapshot.isDraggingOver} // 드래그 출발 지점
          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} // 드래그 도착 예상 지점
          {...provided.droppableProps}
        >
          {provided.placeholder}
        </Area>
      )}
    </Droppable>
  );
};

export default DeleteBox;

const Area = styled.div<AreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#636e72" : props.isDraggingFromThis ? "" : "transparent"};
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  width: 300px;
  height: 70px;
  border: 5px solid white;
  border-radius: 30px;
`;
