import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo } from "../atoms";

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
}

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            {/* 📌 드래그 공간 선언 */}
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area // 드래그 공간 생성
                        isDraggingOver={info.isDraggingOver} // 📌 드래그 출발 지점
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)} // 📌 드래그 도착 예상 지점
                        ref={magic.innerRef} // 📌 드래그 공간 지정
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard
                                key={toDo.id} // 📌 드래그하면 변하는 위치 감안
                                index={index}
                                toDoId={toDo.id}
                                toDoText={toDo.text}
                            />
                        ))}
                        {magic.placeholder}
                        {/* 📌 드래그하는 동안 드래그 위치 마련하기 위한 공간 */}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 300px;
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
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

const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver ? "#74b9ff" : props.isDraggingFromThis ? "#fab1a0" : "transparent"};
    flex-grow: 1; // 📌 드래그 공간 확장
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

export default Board;
