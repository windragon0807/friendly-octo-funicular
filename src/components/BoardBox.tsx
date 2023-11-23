import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import DeleteBox from "./DeleteBox";

export default function BoardBox() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    /* 올바른 위치로 Drop 되지 않은 경우 */
    if (!destination) return;

    /* 같은 Droppable 내 이동한 경우 */
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]; // [현재 Droppable]에 해당하는 ToDo 노드들의 리스트
        const taskObj = boardCopy[source.index]; // Drag 중인 ToDo 노드
        boardCopy.splice(source.index, 1); // Drag 중인 노드를 기존 리스트에서 삭제
        boardCopy.splice(destination?.index, 0, taskObj); // 이동한 index에 노드를 삽입
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    /* 다른 Droppable로 이동한 경우 */
    if (destination.droppableId !== source.droppableId && destination.droppableId !== "trash") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; // [출발 Droppable]에 해당하는 ToDo 노드들의 리스트
        const taskObj = sourceBoard[source.index]; // Drag 중인 ToDo 노드
        const destinationBoard = [...allBoards[destination.droppableId]]; // [도착 Droppable]에 해당하는 ToDo 노드들의 리스트
        sourceBoard.splice(source.index, 1); // [출발 Droppable]에서 Drag 했던 노드를 삭제
        destinationBoard.splice(destination?.index, 0, taskObj); // [도착 Droppable]의 [도착 index]에 노드를 삽입
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }

    /* 휴지통으로 이동한 경우 */
    if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; // [출발 Droppable]에 해당하는 ToDo 노드들의 리스트
        sourceBoard.splice(source.index, 1); // // Drag 중인 ToDo 노드 삭제
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Boards>
        {/* ["To_Do", "Doing", "Done"] */}
        {Object.keys(toDos).map((boardId) => (
          <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
        ))}
      </Boards>
      <DeleteBox />
    </DragDropContext>
  );
}

const Boards = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
