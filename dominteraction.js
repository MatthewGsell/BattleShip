import {
  testfunction,
  ship,
  gameboard,
  Player,
  Computer,
} from "./gamemodules.js";
const playagain = document.querySelector('#playagainbutton')
playagain.addEventListener('click', () => {
  location.reload()
})
const coordonates = {
  placeship: [],
  possiblecoordonates: [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
  [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],],
  playeralreadyentered: [],
  computeralreadyentered: [],
  computerattackstack: [],
  shipsdropped: 0

};

let Playerboard = Player("Player");
let Computerboard = Computer("Computer");
let AttackButton = document.querySelector("#attackbutton");
AttackButton.addEventListener("click", firethenenemyfires);
rendergrids();
rotateships();
dragndrop();

function rendergrids() {
  const playergrid = document.querySelector("#playergrid");
  const computergrid = document.querySelector("#computergrid");
  coordonates.placeship = [12];
  for (let i = 0; i < 64; i++) {
    const ycor = Math.trunc(i / 8);
    const xcor = i - ycor * 8;
    const playergridsquare = document.createElement("div");
    playergridsquare.id = `p${xcor}${ycor}`;
    playergridsquare.classList.add(".dropable");
    playergridsquare.addEventListener("dragenter", () => {
      playergridsquare.classList.add("selected");
      const id = playergridsquare.id;
      const xcor = Number(id.charAt(1));
      const ycor = Number(id.charAt(2));
      coordonates.placeship = [xcor, ycor];
      
    });
    playergridsquare.addEventListener("dragleave", () => {
      playergridsquare.classList.remove("selected");
    });
    playergrid;
    const compgridsquare = document.createElement("div");
    compgridsquare.id = `c${xcor}${ycor}`;
    playergrid.appendChild(playergridsquare);
    computergrid.appendChild(compgridsquare);
  }
}

function dragndrop() {
  const playerships = document.querySelectorAll(".draggable");
  let n = 0;
  let highlightedgrids = document.querySelectorAll(".shiplaced");
  let newhighlightedgrids = [];
  playerships[n].classList.remove("hidden");
  playerships.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      ship.classList.add("beingdragged");
    });
  });

  playerships.forEach((ship) => {
    ship.addEventListener("dragend", () => {
      let shiplength = 0;
      let shipname = "";
      let canplace = true;
      const squarelist = [];

      if (ship.id === "carrierh" || ship.id === "carrierv") {
        shipname = "Carrier";
        shiplength = 5;
      } else if (ship.id === "battleh" || ship.id === "battlev") {
        shipname = "Battleship";
        shiplength = 4;
      } else if (
        ship.id === "cruiserh" ||
        ship.id === "cruiserv" ||
        ship.id === "submarineh" ||
        ship.id === "submarinev"
      ) {
        shipname = "cruiser&sub";
        shiplength = 3;
      } else {
        shipname = "Destroyer";
        shiplength = 2;
      }
      if (ship.id.slice(-1) === "h") {
        if (
          coordonates.placeship[0] - shiplength >= -1 &&
          coordonates.placeship[0] <= 7
        ) {
          for (
            let i = coordonates.placeship[0];
            i > coordonates.placeship[0] - shiplength;
            i--
          ) {
            const square = document.querySelector(
              `#p${i}${coordonates.placeship[1]}`
            );
            squarelist.push(square);
          }
          squarelist.forEach((square) => {
            let hightlightedarray = Array.from(highlightedgrids);
            if (hightlightedarray.includes(square)) {
              canplace = false;
              return;
            }
          });
          if (canplace === true) {
            let shiphead = [
              Number(squarelist[0].id.charAt(1)),
              Number(squarelist[0].id.charAt(2)),
            ];
            let shiptail = [
              Number(squarelist[squarelist.length - 1].id.charAt(1)),
              Number(squarelist[squarelist.length - 1].id.charAt(2)),
            ];

            Playerboard.board.placeship(
              shipname,
              shiplength,
              shiphead,
              shiptail
            );
            placecomputershipswithalgorithm(
              shipname,
              shiplength,
              shiphead,
              shiptail
            );
            renderinputsandattackbutton()
            squarelist.forEach((square) => {
              square.classList.add("shipplaced");
            });
            newhighlightedgrids = document.querySelectorAll(".shipplaced");
            if (newhighlightedgrids.length > highlightedgrids.length) {
              playerships[n].classList.add("hidden");
              if (n < 4) {
                n++;
                playerships[n].classList.remove("hidden");
              }
              highlightedgrids = newhighlightedgrids;
            }
          }
        }
      } else if (ship.id.slice(-1) === "v") {
        if (
          coordonates.placeship[1] - shiplength >= -1 &&
          coordonates.placeship[1] <= 7
        ) {
          for (
            let i = coordonates.placeship[1];
            i > coordonates.placeship[1] - shiplength;
            i--
          ) {
            const square = document.querySelector(
              `#p${coordonates.placeship[0]}${i}`
            );
            squarelist.push(square);
          }
          squarelist.forEach((square) => {
            let hightlightedarray = Array.from(highlightedgrids);
            if (hightlightedarray.includes(square)) {
              canplace = false;
              return;
            }
          });
          if (canplace === true) {
            let shiphead = [
              Number(squarelist[0].id.charAt(1)),
              Number(squarelist[0].id.charAt(2)),
            ];
            let shiptail = [
              Number(squarelist[squarelist.length - 1].id.charAt(1)),
              Number(squarelist[squarelist.length - 1].id.charAt(2)),
            ];

            Playerboard.board.placeship(
              shipname,
              shiplength,
              shiphead,
              shiptail
            );
            placecomputershipswithalgorithm(
              shipname,
              shiplength,
              shiphead,
              shiptail
            );
            renderinputsandattackbutton()

            squarelist.forEach((square) => {
              square.classList.add("shipplaced");
            });
            newhighlightedgrids = document.querySelectorAll(".shipplaced");
            if (newhighlightedgrids.length > highlightedgrids.length) {
              playerships[n].classList.add("hidden");
            
              if (n < 4) {
                n++;
                playerships[n].classList.remove("hidden");
              }
              highlightedgrids = newhighlightedgrids;
            }
          }
        }
      }
      Computerboard.board.shiplist.forEach((ship) => {
        console.log(ship.coordonates)
      })
      
    });
  });
  
}

function rotateships() {
  const ships = document.querySelectorAll(".draggable");
  window.addEventListener("keydown", (e) => {
    if (e.key === "v") {
      ships.forEach((ship) => {
        let a = ship.id;
        let b = a.replace("h", "v");
        ship.id = b;
        
      });
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "h") {
      ships.forEach((ship) => {
        let a = ship.id;
        let b = a.replace("v", "h");
        ship.id = b;
        
      });
    }
  });
}

function placecomputershipswithalgorithm(
  shipname,
  shiplength,
  shiphead,
  shiptail
) {
  
    shiphead = [shiphead[1], shiphead[0]];
    shiptail = [shiptail[1], shiptail[0]];

  Computerboard.board.placeship(shipname, shiplength, shiphead, shiptail);
  
  
}

function firethenenemyfires() {
  let xcor = parseInt(document.querySelector("#xcor").value);
  let ycor = parseInt(document.querySelector("#ycor").value);
  let enteredbefore = false 
  coordonates.playeralreadyentered.forEach((cor) => {
    if (cor[0] === xcor && cor[1] === ycor) {
      enteredbefore = true
    }
  })
  
  if (
    coordonates.playeralreadyentered.length >= 1 &&
    enteredbefore === true
    || xcor > 7 || xcor < 0 || ycor > 7 || ycor < 0
  ) {
    alert("Coordonates already attacked or coordonates are invalid. Please reference ruler above and to the side of grid for coordonates of squares.");
  } else {
    let sunkships = 0;
    let newssunkships = 0;
    let hits = 0;
    let newhits = 0;
    Computerboard.board.shiplist.forEach((ship) => {
      hits = hits + ship.hits;
      if (ship.isSunk() === true) {
        sunkships++;
      }
    });
   
    Playerboard.attackEnemy(Computerboard, [xcor, ycor]);
    Computerboard.board.shiplist.forEach((ship) => {
      newhits = newhits + ship.hits;
      if (ship.isSunk() === true) {
        newssunkships++;
      }
    });

    if (newssunkships > sunkships) {
     
      alert("Sunk a ship!");
    }
    if (newhits > hits) {
      let gridtohighlight = document.querySelector(`#c${xcor}${ycor}`);
      gridtohighlight.classList.add("attackedlocation");
      gridtohighlight.classList.add("hitlocation");
    } else {
      let gridtohighlight = document.querySelector(`#c${xcor}${ycor}`);
      gridtohighlight.classList.add("attackedlocation");
    }
    coordonates.playeralreadyentered.push([xcor, ycor]);
    checkforwin()
    computerattacks()
    checkforwin()
  }
  


}


function computerattacks () {
  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomn = randomNumber(0, coordonates.possiblecoordonates.length - 1)
  let computerattacks = coordonates.possiblecoordonates[randomn]
  coordonates.computeralreadyentered.push(computerattacks)
  coordonates.possiblecoordonates.splice(randomn, 1)
  Computerboard.attackEnemy(Playerboard, computerattacks)
  let gridtohighlight = document.querySelector(`#p${computerattacks[0]}${computerattacks[1]}`);
  gridtohighlight.classList.add('attackedlocation')
}


function renderinputsandattackbutton () {
  coordonates.shipsdropped++
  if (coordonates.shipsdropped === 5) {
    const attackbutton = document.querySelector('#attackbutton')
    const xcor = document.querySelector('#xcor')
    const ycor = document.querySelector('#ycor')
    attackbutton.classList.remove('hidden')
    xcor.classList.remove('hidden')
    ycor.classList.remove('hidden')
    const instructions = document.querySelector('h5')
    instructions.classList.add('hidden')
  }
}


function checkforwin() {
  if (Playerboard.board.allShipsSunk() === true) {
    const winnerdiv = document.querySelector('#winnerdiv')
    const playagain = document.querySelector('#playagainbutton')
    winnerdiv.innerHTML = "Computer Wins!"
    winnerdiv.classList.remove('hidden')
    winnerdiv.classList.add('displaywinner')
    playagain.classList.remove('hidden')
    playagain.classList.add('playagainbutton')
  }
  else if (Computerboard.board.allShipsSunk() === true) {
    const winnerdiv = document.querySelector('#winnerdiv')
    const playagain = document.querySelector('#playagainbutton')
    winnerdiv.innerHTML = "Player Wins!"
    winnerdiv.classList.remove('hidden')
    winnerdiv.classList.add('displaywinner')
    playagain.classList.remove('hidden')
    playagain.classList.add('playagainbutton')
  }
}