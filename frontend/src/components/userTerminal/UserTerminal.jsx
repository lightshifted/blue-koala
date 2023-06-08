import React, { useEffect, useRef, useState } from "react";
import { handleKeyDown, handleChange, handlePaste, handleSubmitTextArea } from "./handlers";
import "./UserTerminal.css";


const UserTerminal = ({ onSubmit }) => {
  const inputRef = useRef();
  const breakpoint = 768;

  return (
    <div className="user__terminal">
      <form
        id="message-form"
        autoComplete="off"
        className="input__form"
        onSubmit={(event) => handleSubmitTextArea(event, onSubmit, inputRef)}
      >
        <textarea
          autoComplete="off"
          id="message-input"
          ref={inputRef}
          className="input__field"
          type="text"
          placeholder="Type a message..."
          rows="1"
          onKeyDown={(event) => handleKeyDown(event, inputRef, breakpoint, (e) => handleSubmitTextArea(e, onSubmit, inputRef))}
          onInput={handleChange}
          onPaste={(event) => handlePaste(event, inputRef)}
        />
        <button id="button-submit" className="input__button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default UserTerminal;
