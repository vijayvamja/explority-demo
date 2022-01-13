import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const slateObject = [
  {
    type: "paragraph",
    children: [
      { text: '' },
    ],
  },
];

const column1 = "col_1";
const column2 = "col_2";
const column3 = "col_3";
const column4 = "col_4";

const cardId1 = "68399664-bdb6-4f9b-9ea3-1acb1f5c250d";
const cardId2 = "e87aaf43-5a3e-4cd2-a5fc-e12ed511b0c6";
const cardId3 = "69ccbdbc-fd35-419a-acf3-4cd4d0ca23ae";

const initialData = {
  cards: {
    [cardId1]: {
      id: cardId1,
      content: slateObject,
    },
    [cardId2]: {
      id: cardId2,
      content: slateObject,
    },
    [cardId3]: {
      id: cardId3,
      content: slateObject,
    },
  },
  columns: {
    [column1]: {
      id: column1,
      title: "Backlog",
      cardIds: [cardId1, cardId2, cardId3],
    },
    [column2]: {
      id: column2,
      title: "In progress",
      cardIds: [],
    },
    [column3]: {
      id: column3,
      title: "Blocked",
      cardIds: [],
    },
    [column4]: {
      id: column4,
      title: "Completed",
      cardIds: [],
    },
  },
  columnOrder: [column1, column2, column3, column4],
};

export const reducer = createSlice({
  name: "dashboard",
  initialState: {
    ...initialData,
  },
  reducers: {
    addBlock: (state) => {
      const newUUID = uuid();
      state.cards[newUUID] = {
        id: newUUID,
        content: slateObject,
      };
      state.columns[column1].cardIds.push(newUUID);
    },
    setBlock: (state, { payload: { id, value } }) => {
      state.cards[id].content = value;
    },
    updateData: (state, { payload: { key, value } }) => {
      state[key] = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBlock, setBlock, updateData } = reducer.actions;

export default reducer.reducer;
