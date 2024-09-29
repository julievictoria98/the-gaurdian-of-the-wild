window.addEventListener("load", showTitle);

// deklarer variablerne point og tid
let point;
let liv;

function showTitle() {}

function startGame() {
  console.log("startGame");

  // nulstil liv og point (sæt til startværdien)
  point = 0;
  liv = 2;

  // start timer

  document.querySelector("#sand").classList.add("timer");

  // gå til endGame når tiden er gået

  document.querySelector("#sand").addEventListener("animationend", endGame);

  // opdater point og liv på siden
  document.querySelector("#mine_points").textContent = point;
  document.querySelector("#mine_liv").textContent = liv;

  // start hoppe-animation på CJ svamp
  document.querySelector("#carljohan_container").classList.add("hop");
  let rnd = generateRandomNumber(10);
  document.querySelector("#carljohan_container").classList.add("pos" + rnd);
  rnd = generateRandomNumber(3);
  document.querySelector("#carljohan_container").classList.add("speed" + rnd);

  // start falde-animation på FL svamp
  document.querySelector("#fluesvamp_container").classList.add("fald");
  rnd = generateRandomNumber(5);
  document.querySelector("#fluesvamp_container").classList.add("posFall" + rnd);
  rnd = generateRandomNumber(2);
  document.querySelector("#fluesvamp_container").classList.add("speed" + rnd);
  rnd = generateRandomNumber(4);
  document.querySelector("#fluesvamp_container").classList.add("delay" + rnd);

  // lyt efter klik på carljohan, gå til funktionen clicCarlJohan hvis der klikkes
  document
    .querySelector("#carljohan_container")
    .addEventListener("click", clickCarlJohan);
  // lyt efter klik på fluesvamp, gå til funktionen clicFlueSvamp hvis der klikkes
  document
    .querySelector("#fluesvamp_container")
    .addEventListener("click", clickFlueSvamp);

  // når carljohan har hoppet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  document
    .querySelector("#carljohan_container")
    .addEventListener("animationiteration", resetCarlJohan);
  // når fluesvamp har hoppet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  document
    .querySelector("#fluesvamp_container")
    .addEventListener("animationiteration", resetFlueSvamp);
}

function clickCarlJohan() {
  console.log("clickCarlJohan");

  // stopper med at lytte efter klik (fjerner eventlistener)
  document
    .querySelector("#carljohan_container")
    .removeEventListener("click", clickCarlJohan);

  // afspil carljohan lyd

  // Tæl op på point (kan også skrives: point++;)
  point = point + 1;
  // Skriv point ud (vis nyt pointtal på siden)
  document.querySelector("#mine_points").textContent = point;

  // Stop hoppe-animation på container (sæt på pause ved at tilføje klassen frys)
  document.querySelector("#carljohan_container").classList.add("frys");

  // Start forsvind-animation på sprite
  document.querySelector("#carljohan_sprite").classList.add("forsvind");

  // Går til reset funktionen når forsvind-animationen er færdig
  document
    .querySelector("#carljohan_container")
    .addEventListener("animationend", resetCarlJohan);
}

function clickFlueSvamp() {
  console.log("clickFlueSvamp");

  // stopper med at lytte efter klik (fjerner eventlistener)
  document
    .querySelector("#fluesvamp_container")
    .removeEventListener("click", clickFlueSvamp);

  // afspil fluesvamp lyd

  // Tæl ned på liv (kan også skrives: liv--;)
  liv = liv - 1;

  // Vis opdateret antal liv på siden
  document.querySelector("#mine_liv").textContent = liv;

  if (liv <= 0) {
    endGame();
  }

  // Stop falde-animation på container (sæt på pause ved at tilføje klassen frys)
  document.querySelector("#fluesvamp_container").classList.add("frys");

  // Start forsvind-animation på sprite
  document.querySelector("#fluesvamp_sprite").classList.add("forsvind");

  // Går til reset funktionen når forsvind-animationen er færdig
  document
    .querySelector("#fluesvamp_container")
    .addEventListener("animationend", resetFlueSvamp);
}

function resetCarlJohan() {
  console.log("carlJohanReset");

  //fjern alle klasser fra carljohans container (hop, frys og pos)
  document.querySelector("#carljohan_container").classList = "";
  //fjern alle klasser fra carljohans sprite (forsvind)
  document.querySelector("#carljohan_sprite").classList = "";
  document.querySelector("#carljohan_container").offsetHeight;

  // genstart hoppe-animation (hoppeanimation sættes på igen)
  document.querySelector("#carljohan_container").classList.add("hop");
  // ny random position
  let rnd = generateRandomNumber(10);
  document.querySelector("#carljohan_container").classList.add("pos" + rnd);
  // Ny random speed
  rnd = generateRandomNumber(3);
  document.querySelector("#carljohan_container").classList.add("speed" + rnd);

  // lyt efter klik på CarlJohan, gå til funktionen clicCarlJohan hvis der klikkes
  document
    .querySelector("#carljohan_container")
    .addEventListener("click", clickCarlJohan);
}

function resetFlueSvamp() {
  console.log("flueSvampReset");

  //fjern alle klasser fra carljohans container (hop, frys og pos)
  document.querySelector("#fluesvamp_container").classList = "";
  //fjern alle klasser fra carljohans sprite (forsvind)
  document.querySelector("#fluesvamp_sprite").classList = "";

  // Giv containeren en ny random position/speed/delay
  let rnd = generateRandomNumber(5);
  document.querySelector("#fluesvamp_container").classList.add("posFall" + rnd);
  rnd = generateRandomNumber(2);
  document.querySelector("#fluesvamp_container").classList.add("speed" + rnd);
  rnd = generateRandomNumber(4);
  document.querySelector("#fluesvamp_container").classList.add("delay" + rnd);

  // genstart hoppe-animation (hoppeanimation sættes på igen)
  document.querySelector("#fluesvamp_container").offsetHeight;
  document.querySelector("#fluesvamp_container").classList.add("fald");

  // lyt efter klik på CarlJohan, gå til funktionen clicCarlJohan hvis der klikkes
  document
    .querySelector("#fluesvamp_container")
    .addEventListener("click", clickFlueSvamp);
}

function endGame() {
  console.log("endGame");

  if (liv <= 0) {
    gameOver();
  }
  if (point >= 2) {
    gameComplete();
  } else if (point < 2) {
    gameOver();
  }
}

function gameOver() {
  console.log("gameOver");
}

function gameComplete() {
  console.log("gameComplete");
}

function generateRandomNumber(num) {
  let rndNumber = Math.random();
  rndNumber = rndNumber * num;
  rndNumber = Math.floor(rndNumber);
  rndNumber = rndNumber + 1;

  return rndNumber;

  // return Math.floor(Math.random()*num)+1;
}
