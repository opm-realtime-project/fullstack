import React from "react";
import Board from "../board/board";
import "./style.css";

class container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="color-picker-container">
          <input type="color" />
        </div>
        <div className="board-container">
          <Board />
        </div>
      </div>
    );
  }
}

export default container;
