import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDragabbleCardProps {
    index: number;
    toDoId: number;
    toDoText: string;
}

const DraggableCard = ({ index, toDoId, toDoText }: IDragabbleCardProps) => {
    return (
        // 📌 드래그 객체 선언
        // draggableId는 string이어야 한다.
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging} // 📌 드래그 중인지 판별
                    ref={magic.innerRef} // 📌 드래그 객체 지정
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    {toDoText}
                </Card>
            )}
        </Draggable>
    );
};

const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px;
    background-color: ${(props) => (props.isDragging ? "#e4f2ff" : props.theme.cardColor)};
    box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none")};
`;

export default React.memo(DraggableCard);
// 📌
// Droppable, Board, DragDropContext 등 부모 State가 바뀌면 모든 children들까지 모두 refresh 된다.
// 불필요한 리렌더링이 발생하지 않기 위해서 Component의 props가 변하지 않으면 리렌더링을 시키지 않는 memo를 사용한다.
