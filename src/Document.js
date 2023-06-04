import React, { useReducer } from "react";
import "./styles.css";
import useAutoSave from "./useAutosave";

export default function Document({ storageId = "m" }) {
  const [state, dispatch] = useReducer(reducer, initialState, init(storageId));
  function autoResize(e) {
    e.target.style.height = "auto";

    e.target.style.height = e.target.scrollHeight + "px";
  }

  useAutoSave(storageId, sanitizeState(state));


  return (
    <>
      <form>
        <textarea
          style={{ minHeight: "90vh" }}
          onInput={(e) => autoResize(e)}
          id="textarea"
          value={state.textarea}
          onChange={(e) =>
            dispatch({ type: "Textarea", textarea: e.target.value })
          }
        ></textarea>
      </form>
    </>
  );
}

const initialState = {
  textarea: ""
};
const reducer = (state, action) => {
  switch (action.type) {
    case "Textarea": {
      return { ...state, textarea: action.textarea };
    }

    default: {
      return state;
    }
  }
};

function init(storageId) {
  const localStorageData = localStorage.getItem(storageId);
  const parsedData = localStorageData ? JSON.parse(localStorageData) : {};
  return (initialState) => ({ ...initialState, ...parsedData });
}

function sanitizeState(state) {
  const { text, ...rest } = state;
  return rest;
}
