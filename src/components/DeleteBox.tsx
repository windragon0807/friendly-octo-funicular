import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const DeleteBox = () => {
    return (
        <Droppable droppableId="trash">
            {(magic, info) => (
                <Area
                    isDraggingOver={info.isDraggingOver} // 📌 드래그 출발 지점
                    isDraggingFromThis={Boolean(info.draggingFromThisWith)} // 📌 드래그 도착 예상 지점
                    ref={magic.innerRef} // 📌 드래그 공간 지정
                    {...magic.droppableProps}
                >
                    {magic.placeholder}
                </Area>
            )}
        </Droppable>
    );
};

export default DeleteBox;

const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver ? "#636e72" : props.isDraggingFromThis ? "" : "transparent"};
    /* flex-grow: 1; // 📌 드래그 공간 확장 */
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
    width: 300px;
    height: 70px;
    border: 5px solid white;
    border-radius: 30px;
`;
