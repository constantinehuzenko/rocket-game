const rocket = document.querySelector(".rocket");
const ufo = document.querySelector(".ufo");
const boom = document.querySelector(".boom");
const rangeTop = 85;
const rangeLeft = 45;
const power = 10;
let topCord = 55;
let leftCord = 45;
let gameOver = false;

const topKey = document.querySelector(".top_key");
const bottomKey = document.querySelector(".bottom_key");
const leftKey = document.querySelector(".left_key");
const rightKey = document.querySelector(".right_key");

// TODO: Create one function for this and rewrite to arrow;
function getCord(el) {
  const coordinate = el.getBoundingClientRect();
  return Math.round(coordinate.top);
}
function getCordLeft(el) {
  const coordinate = el.getBoundingClientRect();
  return Math.round(coordinate.left);
}

// TODO: Divide this function to smaller functions;
function moveUfo() {
  let start = Date.now();

  let timer = setInterval(function () {
    let timePassed = Date.now() - start;

    if (timePassed >= 2700) {
      clearInterval(timer);
      return;
    }
    draw(timePassed);

    // TODO: Move complex conditionals to variables with clear name;
    if (
      getCord(ufo) < getCord(rocket) + rangeTop &&
      getCord(ufo) > getCord(rocket) - rangeTop
    ) {
      if (
        getCordLeft(ufo) < getCordLeft(rocket) + rangeLeft &&
        getCordLeft(ufo) > getCordLeft(rocket) - rangeLeft
      ) {
        const cordForBoomTop = getCord(rocket) - 90 + "px";
        const cordForBoomLeft = getCordLeft(rocket) - 90 + "px";

        // TODO: Create facade to hide complex logic;
        gameOver = true;
        boom.style.top = cordForBoomTop;
        boom.style.left = cordForBoomLeft;
        ufo.style.display = "none";
        rocket.style.transition = "0s";
        rocket.style.opacity = "0";
        boom.style.display = "unset";
        setTimeout(
          () =>
            alert("Game Over \nFor continue click `ok` or `Enter` ")
              ? ""
              : location.reload(),
          1000
        );
      }
    }
    return gameOver;
  }, 5);

  function draw(timePassed) {
    if (window.screen.width < 500) {
      ufo.style.top = timePassed / 25 + "%";
    } else {
      ufo.style.top = timePassed / 15 + "%";
    }
  }
  ufo.style.left = getCordLeft(rocket) + 20 + "px";
}

if (gameOver === false) {
  let timerId = setInterval(() => moveUfo(), 3000);
}

moveUfo();

function rocketMoveBtns() {
  document.addEventListener("keydown", function (event) {
    // TODO: Create generic function;
    if (event.keyCode === 38 && topCord > -5) {
      topCord -= power;
      rocket.style.top = topCord + "%";
      topKey.classList.add("tap");
    }
    if (event.keyCode === 40 && topCord < 85) {
      topCord += power;
      rocket.style.top = topCord + "%";
      bottomKey.classList.add("tap");
    }
    if (event.keyCode === 37 && leftCord > -5) {
      leftCord -= power;
      rocket.style.left = leftCord + "%";
      leftKey.classList.add("tap");
    }
    if (event.keyCode === 39 && leftCord < 95) {
      leftCord += power;
      rocket.style.left = leftCord + "%";
      rightKey.classList.add("tap");
    }
  });
}
rocketMoveBtns();

function keyboardEffect() {
  // TODO: Create generic function;
  document.addEventListener("keyup", function () {
    if (event.keyCode === 38 && topCord > -5) {
      topKey.classList.remove("tap");
    }
    if (event.keyCode === 40 && topCord < 85) {
      bottomKey.classList.remove("tap");
    }
    if (event.keyCode === 37 && leftCord > -5) {
      leftKey.classList.remove("tap");
    }
    if (event.keyCode === 39 && leftCord < 95) {
      rightKey.classList.remove("tap");
    }
  });
}
keyboardEffect();

// TODO: Create generic function;
topKey.addEventListener("click", function () {
  if (topCord > -5) {
    topCord -= power;
    rocket.style.top = topCord + "%";
  }
});
bottomKey.addEventListener("click", function () {
  if (topCord < 85) {
    topCord += power;
    rocket.style.top = topCord + "%";
  }
});
leftKey.addEventListener("click", function () {
  if (leftCord > -5) {
    leftCord -= power;
    rocket.style.left = leftCord + "%";
  }
});
rightKey.addEventListener("click", function () {
  if (leftCord < 95) {
    leftCord += power;
    rocket.style.left = leftCord + "%";
  }
});
