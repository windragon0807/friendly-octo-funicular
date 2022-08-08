import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import DeleteBox from "./DeleteBox";

const BoardBox = () => {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const { destination, source } = info;
        if (!destination) return; // 같은 공간에서 이동한 경우
        if (destination?.droppableId === source.droppableId) {
            // 같은 "공간" 내 이동
            setToDos((allBoards) => {
                // splice를 사용하면 배열 자체가 변하기 때문에 복사본을 가지고 작업
                const boardCopy = [...allBoards[source.droppableId]]; // "출발 공간"에 있는 모든 ToDo 객체들을 불러오기
                const taskObj = boardCopy[source.index]; // "출발 공간"의 ToDo 객체들 중 현재 드래그 중인 ToDo 객체 불러오기
                boardCopy.splice(source.index, 1); // "출발 공간"의 드래그 중인 노드의 배열 요소를 삭제
                boardCopy.splice(destination?.index, 0, taskObj); // "도착 공간"의 "도착 위치"에 해당하는 곳에 배열 요소를 삽입
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy, // 데이터 이동이 완료된 배열을 덮어쓰기
                };
            });
        }
        if (destination.droppableId !== source.droppableId && destination.droppableId !== "trash") {
            // 다른 공간으로 이동한 경우
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]]; // "출발 공간"에 있는 모든 ToDo 객체들을 불러오기
                const taskObj = sourceBoard[source.index]; // "출발 공간"의 ToDo 객체들 중 현재 드래그 중인 ToDo 객체 불러오기
                const destinationBoard = [...allBoards[destination.droppableId]]; // "도착 공간"에 있는 모든 ToDo 객체들을 불러오기
                sourceBoard.splice(source.index, 1); // "출발 공간"의 드래그 중인 노드의 배열 요소를 삭제
                destinationBoard.splice(destination?.index, 0, taskObj); // "도착 공간"의 "도착 위치"에 해당하는 곳에 배열 요소를 삽입
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard, // 데이터 이동이 완료된 배열을 덮어쓰기
                    [destination.droppableId]: destinationBoard, // 데이터 이동이 완료된 배열을 덮어쓰기
                };
            });
        }
        if (destination.droppableId === "trash") {
            // 쓰레기통에 넣을 경우
            console.log("trash here");
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]]; // "출발 공간"에 있는 모든 ToDo 객체들을 불러오기
                sourceBoard.splice(source.index, 1); // "출발 공간"의 드래그 중인 노드의 배열 요소를 삭제
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard, // 데이터 이동이 완료된 배열을 덮어쓰기
                };
            });
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Boards>
                {/* 📌 Object를 map으로 순회하는 방법 */}
                {Object.keys(toDos).map((boardId) => (
                    <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
                ))}
            </Boards>
            <DeleteBox />
        </DragDropContext>
    );
};

const Boards = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
`;

export default BoardBox;
