window.addEventListener("load", showTitle);

let lives;
let points;

let foxRnd;
let hunterRnd;

const gameSound = document.querySelector("#game_sound");
const loseSound = document.querySelector("#lose_sound");
const winSound = document.querySelector("#win_sound");
const shootSound = document.querySelector("#shoot_sound");

function showTitle() {
  console.log("showTtile");
  hideAll();
  gameSound.play();
  gameSound.currentTime = 0;
  gameSound.muted = false;
  gameSound.autoplay = true;
  document.querySelector("#start").classList.remove("hide");
  document.querySelector("#play_btn").classList.add("moveUpDown");

  document.querySelector("#play_btn").addEventListener("click", infoScreen);
}

function infoScreen() {
  console.log("infoscreen");
  hideAll();
  document.querySelector("#infoScreen").classList.remove("hide");
  document.querySelector("#play_btn_info").classList.add("moveUpDown");
  document
    .querySelector("#play_btn_info")
    .addEventListener("click", startFunction);
}

function startFunction() {
  console.log("start game");
  document.querySelector("#bunny_container").classList = "";
  document.querySelector("#hunter2_container").classList = "";

  hideAll();
  gameSound.play();
  document.querySelector("#game_background").classList.remove("hide");

  lives = 3;
  points = 0;
  document.querySelector("#my_points").textContent = points;
  document.querySelector("#my_lives").textContent = lives;

  //sets initial animation
  document
    .querySelector("#fox_sprite")
    .classList.add("speed" + generateRandomNumber());
  document.querySelector("#fox_sprite").classList.add("hop");
  document
    .querySelector("#hunter_sprite")
    .classList.add("speed" + generateRandomNumber());
  document.querySelector("#hunter_sprite").classList.add("hop");

  //handles that positions dont overlap
  foxRnd = generateRandomNumber();
  hunterRnd = generateRandomNumber();
  let rnd = generateRandomNumber2();

  if (foxRnd === hunterRnd) {
    if (hunterRnd === 4) {
      hunterRnd = hunterRnd - 1;
    } else {
      hunterRnd = hunterRnd + 1;
    }
  }

  if (rnd === 1) {
    document
      .querySelector("#hunter2_container")
      .classList.add("speed" + generateRandomNumber());
    document.querySelector("#hunter2_container").classList.add("run");
    document.querySelector("#hunter2_container").classList.add("opt");
    document.querySelector("#bunny_container").classList.add("hide");
  }
  if (rnd === 2) {
    document
      .querySelector("#bunny_container")
      .classList.add("speed" + generateRandomNumber());
    document.querySelector("#bunny_container").classList.add("run");
    document.querySelector("#bunny_container").classList.add("opt");
    document.querySelector("#hunter2_container").classList.add("hide");
  }

  document.querySelector("#fox_container").classList.add("pos" + foxRnd);
  document.querySelector("#hunter_container").classList.add("pos" + hunterRnd);

  document.querySelector("#timer_sprite").classList.add("shrink");
  document.querySelector("#timer_container").classList.add("shake");

  // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen endGame
  document
    .querySelector("#timer_sprite")
    .addEventListener("animationend", endGame);
  // Udskriv i konsollen: Tiden er startet

  document
    .querySelector("#fox_container")
    .addEventListener("mousedown", foxFunction);

  document
    .querySelector("#hunter_container")
    .addEventListener("mousedown", hunter1Function);

  document
    .querySelector("#hunter2_container")
    .addEventListener("mousedown", hunter2Function);

  document
    .querySelector("#bunny_container")
    .addEventListener("mousedown", bunnyFunction);

  document
    .querySelector("#fox_sprite")
    .addEventListener("animationiteration", foxReset);

  document
    .querySelector("#hunter_sprite")
    .addEventListener("animationiteration", losePoints);

  document
    .querySelector("#hunter2_container")
    .addEventListener("animationiteration", hunter2Reset);

  document
    .querySelector("#bunny_container")
    .addEventListener("animationiteration", hunter2Reset);
}

function foxFunction() {
  document
    .querySelector("#fox_container")
    .removeEventListener("mousedown", foxFunction);

  lives = lives - 1;
  document.querySelector("#my_lives").textContent = lives;

  console.log("animalFunction");
  shootSound.currentTime = 0;
  shootSound.play();
  document.querySelector("#fox_container").classList.add("gone");

  document
    .querySelector("#fox_container")
    .addEventListener("animationend", foxReset);
  if (lives <= 0) {
    endGame(); // Call endGame when lives reach 0
  }
}

function bunnyFunction() {
  document
    .querySelector("#bunny_container")
    .removeEventListener("mousedown", bunnyFunction);

  lives = lives - 1;
  document.querySelector("#my_lives").textContent = lives;

  console.log("bunnyFunction");
  document.querySelector("#bunny_container").classList.add("pause");
  document.querySelector("#bunny_sprite").classList.add("gone");

  document
    .querySelector("#bunny_container")
    .addEventListener("animationend", hunter2Reset);
  if (lives <= 0) {
    endGame(); // Call endGame when lives reach 0
  }
}

function hunter1Function() {
  document
    .querySelector("#hunter_sprite")
    .removeEventListener("animationiteration", losePoints);
  console.log("hunter1Function");
  shootSound.currentTime = 0;
  shootSound.play();
  document
    .querySelector("#hunter_container")
    .removeEventListener("mousedown", hunter1Function);

  points = points + 1;
  document.querySelector("#my_points").textContent = points;
  //   console.log("hunter1Function");
  document.querySelector("#hunter_container").classList.add("gone");

  document
    .querySelector("#hunter_container")
    .addEventListener("animationend", hunterReset);
}

function hunter2Function() {
  console.log("hunter2Function");
  document
    .querySelector("#hunter2_container")
    .removeEventListener("mousedown", hunter2Function);
  shootSound.currentTime = 0;
  shootSound.play();
  points = points + 3;
  document.querySelector("#my_points").textContent = points;
  //   console.log("hunter1Function");
  document.querySelector("#hunter2_container").classList.add("pause");
  document.querySelector("#hunter2_sprite").classList.add("gone");

  document
    .querySelector("#hunter2_container")
    .addEventListener("animationend", hunter2Reset);
}

function hunter2Reset() {
  console.log("hunter2Reset");
  //fjerner alle klasser fra containers class list (pos1 og frys, hop)
  document.querySelector("#hunter2_container").classList = "";
  document.querySelector("#hunter2_sprite").classList = "";

  //sætter hop på igen
  document.querySelector("#hunter2_container").offsetHeight;

  document.querySelector("#hunter2_container").classList.remove("gone");

  document.querySelector("#bunny_container").classList = "";
  document.querySelector("#bunny_sprite").classList = "";

  //sætter hop på igen
  document.querySelector("#bunny_container").offsetHeight;

  document.querySelector("#bunny_container").classList.remove("gone");

  //flytter til ny tilfældig position
  let rnd4 = generateRandomNumer3();
  if (rnd4 === 1) {
    document
      .querySelector("#hunter2_container")
      .classList.add("delay" + generateRandomNumber());
    document.querySelector("#hunter2_container").classList.add("run");
    document.querySelector("#hunter2_container").classList.add("opt");
    document.querySelector("#bunny_container").classList.add("hide");
  }
  if (rnd4 === 2) {
    document
      .querySelector("#bunny_container")
      .classList.add("delay" + generateRandomNumber());
    document.querySelector("#bunny_container").classList.add("run");
    document.querySelector("#bunny_container").classList.add("opt");
    document.querySelector("#hunter2_container").classList.add("hide");
  }

  //Viser figur-element igen(spirte), ved at fjerne .forsvind

  document
    .querySelector("#hunter2_container")
    .addEventListener("mousedown", hunter2Function);

  document
    .querySelector("#hunter2_sprite")
    .addEventListener("animationiteration", hunter2Reset);

  document
    .querySelector("#bunny_container")
    .addEventListener("mousedown", foxFunction);

  document
    .querySelector("#bunny_sprite")
    .addEventListener("animationiteration", hunter2Reset);
}

function foxReset() {
  //   console.log("animalReset");
  //fjerner alle klasser fra containers class list (pos1 og frys, hop)
  document.querySelector("#fox_container").classList = "";
  document.querySelector("#fox_sprite").classList = "";

  //sætter hop på igen
  document.querySelector("#fox_container").offsetHeight;

  //flytter til ny tilfældig position
  foxRnd = generateRandomNumber();

  if (foxRnd === hunterRnd) {
    if (hunterRnd === 4) {
      foxRnd = 3;
    } else {
      foxRnd = hunterRnd + 1;
    }
  }

  document.querySelector("#fox_container").classList.add("pos" + foxRnd);

  document
    .querySelector("#fox_sprite")
    .classList.add("speed" + generateRandomNumber());
  document.querySelector("#fox_sprite").classList.add("hop");

  //Viser figur-element igen(spirte), ved at fjerne .forsvind
  document.querySelector("#fox_sprite").classList.remove("gone");

  document
    .querySelector("#fox_sprite")
    .addEventListener("animationiteration", foxReset);

  document
    .querySelector("#fox_container")
    .addEventListener("mousedown", foxFunction);
}

function hunterReset() {
  console.log("hunterReset");
  //fjerner alle klasser fra containers class list (pos1 og frys, hop)

  document.querySelector("#hunter_container").classList = "";
  document.querySelector("#hunter_sprite").classList = "";
  //sætter hop på igen
  document.querySelector("#hunter_container").offsetHeight;

  //flytter til ny tilfældig position
  hunterRnd = generateRandomNumber();

  if (foxRnd === hunterRnd) {
    if (foxRnd === 4) {
      hunterRnd = 3;
    } else {
      hunterRnd = foxRnd + 1;
    }
  }

  document.querySelector("#hunter_container").classList.add("pos" + hunterRnd);

  document
    .querySelector("#hunter_sprite")
    .classList.add("speed" + generateRandomNumber());
  document.querySelector("#hunter_sprite").classList.add("hop");

  //Viser figur-element igen(spirte), ved at fjerne .forsvind
  document.querySelector("#hunter_container").classList.remove("gone");
  document.querySelector("#hunter_container").classList.remove("gone2");

  document
    .querySelector("#hunter_container")
    .addEventListener("mousedown", hunter1Function);

  document
    .querySelector("#hunter_sprite")
    .addEventListener("animationiteration", losePoints);
}

function losePoints() {
  document
    .querySelector("#hunter_sprite")
    .removeEventListener("animationiteration", losePoints);

  document
    .querySelector("#hunter2_container")
    .removeEventListener("animationiteration", losePoints);

  document.querySelector("#hunter_container").offsetHeight;
  console.log("losePoints");
  points = points - 2;
  document.querySelector("#my_points").textContent = points;

  document.querySelector("#hunter_container").classList.add("gone2");

  document
    .querySelector("#hunter_container")
    .addEventListener("animationend", hunterReset);
}

function generateRandomNumber() {
  //sæt funktioner der gør, at figurene sætter sig random steder
  let rndNumber = Math.random();
  rndNumber = rndNumber * 4;
  rndNumber = Math.floor(rndNumber);
  rndNumber = rndNumber + 1;
  //   console.log(rndNumber);

  return rndNumber;
}

function generateRandomNumber2() {
  console.log("generateRandomNumer2");
  //sæt funktioner der gør, at figurene sætter sig random steder
  let rndNumber2 = Math.random();
  rndNumber2 = rndNumber2 * 2;
  rndNumber2 = Math.floor(rndNumber2);
  rndNumber2 = rndNumber2 + 1;
  console.log(rndNumber2);

  return rndNumber2;
}

function generateRandomNumer3() {
  console.log("generateRandomNumer2");
  //sæt funktioner der gør, at figurene sætter sig random steder
  let rndNumber4 = Math.random();
  rndNumber4 = rndNumber4 * 2;
  rndNumber4 = Math.floor(rndNumber4);
  rndNumber4 = rndNumber4 + 1;
  console.log(rndNumber4);

  return rndNumber4;
}

function endGame() {
  console.log("endGame");

  if (lives <= 0) {
    gameOver();
  }
  if (points >= 40) {
    gameComplete();
  }
  if ((points >= 45, lives <= 0)) {
    gameOver();
  } else if (points < 45) {
    gameOver();
  }
}

function gameOver() {
  console.log("gameOver");
  resetTimer();
  hideAll();
  stopAllSounds();
  loseSound.play();
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#playagain_gameover_btn").classList.add("moveUpDown");
  document
    .querySelector("#playagain_gameover_btn")
    .addEventListener("click", startFunction);

  document.querySelector("#bunny_container").classList.add("hide");
  document.querySelector("#hunter2_container").classList.add("hide");
  document
    .querySelector(".startscreen_btn")
    .addEventListener("click", showTitle);
}

function gameComplete() {
  console.log("gameComplete");
  resetTimer();
  hideAll();
  stopAllSounds();
  winSound.play();
  document.querySelector("#game_complete").classList.remove("hide");
  document.querySelector("#playagain_complete_btn").classList.add("moveUpDown");
  document
    .querySelector(".startscreen_btn")
    .addEventListener("click", showTitle);
  document
    .querySelector("#playagain_complete_btn")
    .addEventListener("click", startFunction);
  document.querySelector("#bunny_container").classList.add("hide");
  document.querySelector("#hunter2_container").classList.add("hide");
}

function hideAll() {
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_background").classList.add("hide");
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#infoScreen").classList.add("hide");
}

function resetTimer() {
  document.querySelector("#timer_sprite").classList.remove("shrink");
  document.querySelector("#timer_sprite").offsetHeight;
}

function stopAllSounds() {
  gameSound.pause();
  loseSound.pause();
  shootSound.pause();
  winSound.pause();
}
