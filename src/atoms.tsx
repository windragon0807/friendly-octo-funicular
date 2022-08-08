import { atom } from "recoil";

// 📌 지정된 타입을 사용할 때 enum 활용
// enum은 기본적으로 숫자와 매칭되며, 값을 추가로 적어줘야 값과 매칭된다.
export enum Categories {
    To_Do = "To_Do",
    Doing = "Doing",
    Done = "Done",
}

export interface ITodo {
    id: number;
    text: string;
    category: Categories;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.To_Do,
});

interface IToDoState {
    [key: string]: ITodo[]; // 📌
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        To_Do: [],
        Doing: [],
        Done: [],
    },
});
