"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = board.querySelectorAll(".cell");
  const message = document.getElementById("message");
  const restartButton = document.getElementsByClassName("reset");
  const modal = document.getElementById("modal");
  const X_CLASS = "x";
  const O_CLASS = "o";
  let TURN = X_CLASS; // X or O
  const CONDITIONS_WINNING = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const handleCellClick = async (e) => {
    const element = e.target;
    await drawMark(element, TURN);
    if (checkWin(TURN)) {
      modal.classList.add("active");
      if (TURN === O_CLASS) {
        message.classList.add("text-danger");
      }
      message.innerText = TURN.toUpperCase() + " win!";
      return;
    } else if (drawGame()) {
      modal.classList.add("active");
      message.innerText = "DRAW!!!";
    } else {
      TURN = swapTurn();
    }
  };

  const drawMark = (element, className) => {
    element.classList.add(className);
  };

  const drawGame = () => {
    return [...cells].every((item) => {
      return (
        item.classList.contains(X_CLASS) || item.classList.contains(O_CLASS)
      );
    });
  };

  const swapTurn = () => {
    return TURN === X_CLASS ? O_CLASS : X_CLASS;
  };

  const checkWin = (currentClass) => {
    return CONDITIONS_WINNING.some((conditionItem) => {
      return conditionItem.every((item) => {
        return cells[item].classList.contains(currentClass);
      });
    });
  };

  const restartGame = () => {
    TURN = X_CLASS;
    message.innerText = "";
    message.classList.remove("text-danger");
    modal.classList.remove("active");
    cells.forEach((item) => {
      item.classList.remove(X_CLASS);
      item.classList.remove(O_CLASS);
      item.removeEventListener("click", handleCellClick);
      item.addEventListener("click", handleCellClick, { once: true });
    });
  };

  for (let i = 0; i < restartButton.length; i++) {
    restartButton[i].addEventListener("click", () => {
      restartGame();
    });
  }

  restartGame();
});
