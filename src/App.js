import React, { useState } from "react";

function Square({ value, onClick, highlighted }) {
  return (
    <button
      className={`square ${highlighted ? "highlighted" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function TimesTable() {
  const [highlightedNumber, setHighlightedNumber] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const handleClick = (number) => {
    setHighlightedNumber(number);
    setSelectedNumbers([...selectedNumbers, number]);
  };

  const handleReset = () => {
    setHighlightedNumber(null);
    setSelectedNumbers([]);
  };

  const renderSelectedNumbers = () => {
    // 数字とカンマを含む文字列の配列を作成
    const numberElements = selectedNumbers.map((number, index) => (
      <span key={index}>
        {number}
        {index < selectedNumbers.length - 1 ? ", " : ""}{" "}
        {/* 最後の要素以外はカンマを追加 */}
      </span>
    ));
    return <div>{numberElements}</div>;
  };

  const rows = [];
  for (let i = 1; i <= 12; i++) {
    const cells = [];
    for (let j = 1; j <= 12; j++) {
      const number = i * j;
      cells.push(
        <Square
          key={`${i}-${j}`}
          value={number.toString()}
          onClick={() => handleClick(number)}
          highlighted={highlightedNumber === number}
        />
      );
    }
    rows.push(
      <div key={i} className="board-row">
        {cells}
      </div>
    );
  }

  return (
    <div>
      <div className="selected-numbers">
        <h2>Selected Numbers:</h2>
        {renderSelectedNumbers()}
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>{rows}</div>
    </div>
  );
}

export default function Board() {
  return (
    <div>
      <TimesTable />
    </div>
  );
}
