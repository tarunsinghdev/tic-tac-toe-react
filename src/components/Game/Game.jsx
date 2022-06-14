import React, { useMemo, useRef, useState } from "react";

import "./Game.css";

let obj = {
  green: [], // stores player 1 marked cells
  greenScore: { cntDiagWin: 0, cntOffDiagWin: 0, cntColWin: 0, cntRowWin: 0 },
  red: [], // stores player 2 marked cells
  redScore: { cntDiagWin: 0, cntOffDiagWin: 0, cntColWin: 0, cntRowWin: 0 }
};

const Circle = ({ gridSize }) => {
  const [clickedBy, setClickedBy] = useState(false); // switching b/w players 1(green) & 2(red),  //false => chance of player 1 , true => player2
  const [isReset, setIsReset] = useState(false); // handling reset
  const totalGridElCount = useMemo(() => Array(gridSize).fill(1), [gridSize]); // total elts/cells in the grid
  const colRowSize = useMemo(() => Math.sqrt(gridSize), [gridSize]); // size of row/col of a square matrix
  let winFlag = useRef(null); // winFlag holds the winner

  /* Winning logic:
1. Create an obj that holds the cells marked by each player
2. Store the marked cells of each player in a 2D array, [(row1, col1), (row2, col2), ...] 
3. Iterate over the array and check if the current marked cell matches with the row, col, diagonal that has been marked before
4. Count the cells that matches the current marked cell
5. If any of the count, i.e cntColWin or cntDiagWin or CntOffDiagWin or cntRowWin equals the size of row/col
6. If the above count equals row/col size, that means either we found All diagonal, or all rows, or all cols match, we return true
7. otherwise return false and continue with the game
*/

  const computeWin = (row, col) => {
    if (clickedBy === false) {
      obj["greenScore"].cntColWin = 0;
      obj["greenScore"].cntDiagWin = 0;
      obj["greenScore"].cntOffDiagWin = 0;
      obj["greenScore"].cntRowWin = 0;

      for (let i = 0; i < obj["green"].length; i++) {
        if (obj["green"][i][0] === obj["green"][i][1]) {
          obj["greenScore"].cntDiagWin++;
          if (obj["green"][i][0] === row) {
            obj["greenScore"].cntRowWin++;
          }
          if (obj["green"][i][1] === col) {
            obj["greenScore"].cntColWin++;
          }
          if (obj["green"][i][1] === colRowSize - 1 - obj["green"][i][0]) {
            obj["greenScore"].cntOffDiagWin++;
          }
        } else if (obj["green"][i][1] === colRowSize - 1 - obj["green"][i][0]) {
          obj["greenScore"].cntOffDiagWin++;
          if (obj["green"][i][0] === row) {
            obj["greenScore"].cntRowWin++;
          }
          if (obj["green"][i][1] === col) {
            obj["greenScore"].cntColWin++;
          }
        } else if (obj["green"][i][0] === row) {
          obj["greenScore"].cntRowWin++;
          if (obj["green"][i][1] === col) {
            obj["greenScore"].cntColWin++;
          }
        } else if (obj["green"][i][1] === col) {
          obj["greenScore"].cntColWin++;
          if (obj["green"][i][0] === row) {
            obj["greenScore"].cntRowWin++;
          }
        }
        if (
          obj["greenScore"].cntRowWin === colRowSize ||
          obj["greenScore"].cntColWin === colRowSize ||
          obj["greenScore"].cntDiagWin === colRowSize ||
          obj["greenScore"].cntOffDiagWin === colRowSize
        ) {
          return true;
        }
      }
      return false;
    } else {
      obj["redScore"].cntColWin = 0;
      obj["redScore"].cntDiagWin = 0;
      obj["redScore"].cntRowWin = 0;
      obj["redScore"].cntOffDiagWin = 0;

      for (let i = 0; i < obj["red"].length; i++) {
        if (obj["red"][i][0] === obj["red"][i][1]) {
          obj["redScore"].cntDiagWin++;
          if (obj["red"][i][0] === row) {
            obj["redScore"].cntRowWin++;
          }
          if (obj["red"][i][1] === col) {
            obj["redScore"].cntColWin++;
          }
          if (obj["red"][i][1] === colRowSize - 1 - obj["red"][i][0]) {
            obj["redScore"].cntOffDiagWin++;
          }
        } else if (obj["red"][i][1] === colRowSize - 1 - obj["red"][i][0]) {
          obj["redScore"].cntOffDiagWin++;
          if (obj["red"][i][0] === row) {
            obj["redScore"].cntRowWin++;
          }
          if (obj["red"][i][1] === col) {
            obj["redScore"].cntColWin++;
          }
        } else if (obj["red"][i][0] === row) {
          obj["redScore"].cntRowWin++;
          if (obj["red"][i][1] === col) {
            obj["redScore"].cntColWin++;
          }
        } else if (obj["red"][i][1] === col) {
          obj["redScore"].cntColWin++;
          if (obj["red"][i][0] === row) {
            obj["redScore"].cntRowWin++;
          }
        }
        if (
          obj["redScore"].cntRowWin === colRowSize ||
          obj["redScore"].cntColWin === colRowSize ||
          obj["redScore"].cntDiagWin === colRowSize ||
          obj["redScore"].cntOffDiagWin === colRowSize
        ) {
          return true;
        }
      }
      return false;
    }
  };

  const handleClick = (e, index) => {
    if (winFlag.current) {
      alert("Please reset the game to continue.");
      return;
    }
    if (
      e.target.style.backgroundColor &&
      e.target.style.backgroundColor !== "transparent"
    ) {
      return;
    }
    let row = Math.floor(index / colRowSize);
    let col = index - row * colRowSize;

    if (clickedBy === false) {
      e.target.style.backgroundColor = "green";
      e.target.style.cursor = "not-allowed";
      obj["green"].push([row, col]);
      if (computeWin(row, col)) {
        winFlag.current = "Player 1 WON!";
        alert("Player 1 WON!");
      }
      setClickedBy((clickedBy) => !clickedBy); // change turn to player 2
    } else {
      e.target.style.backgroundColor = "red";
      e.target.style.cursor = "not-allowed";
      obj["red"].push([row, col]);
      if (computeWin(row, col)) {
        alert("Player 2 WON!");
        winFlag.current = "Player 2 WON!";
      }
      setClickedBy((clickedBy) => !clickedBy);
    }
  };

  const gameDesign = useMemo(() => Array(colRowSize).fill("60px").join(" "), [
    colRowSize
  ]);

  const handleReset = () => {
    setIsReset((isReset) => !isReset);
    setClickedBy(false);
    winFlag.current = null;
    obj = {
      green: [], // stores player 1 marked cells
      greenScore: {
        cntDiagWin: 0,
        cntOffDiagWin: 0,
        cntColWin: 0,
        cntRowWin: 0
      },
      red: [], // stores player 2 marked cells
      redScore: { cntDiagWin: 0, cntOffDiagWin: 0, cntColWin: 0, cntRowWin: 0 }
    };
  };

  return (
    <>
      {winFlag && <p>{winFlag.current}</p>}
      <button onClick={handleReset}> Reset game </button>
      <div
        className="circleContainer"
        style={{
          display: "grid",
          gridTemplateColumns: gameDesign,
          gridTemplateRows: gameDesign
        }}
      >
        {totalGridElCount.map((_, index) => (
          <div
            key={index}
            style={
              isReset
                ? { backgroundColor: "transparent", cursor: "pointer" }
                : {}
            }
            onClick={(e) => handleClick(e, index)}
            className="circle"
          ></div>
        ))}
      </div>
    </>
  );
};

export default Circle;
