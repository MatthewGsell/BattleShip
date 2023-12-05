export function testfunction() {
  return 4;
}

export function ship(name, length) {
  return {
    name: name,
    length: length,
    hits: 0,
    hit: function () {
      this.hits++;
    },
    isSunk: function () {
      if (this.hits === this.length) {
        return true;
      } else {
        return false;
      }
    },
  };
}

export function gameboard(name) {
  return {
    name: name,
    shiplist: [],
    coordonates:
      // prettier-ignore
      [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
      [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
    [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],],
    hitattacks: [],
    missedattacks: [],

    placeship: function (name, length, shiphead, shiptail) {
      let newship = ship(name, length);
      newship.coordonates = [];
      if (shiphead[0] === shiptail[0]) {
        for (let i = 0; i < newship.length; i++) {
          newship.coordonates.push([shiphead[0], shiphead[1] - i]);
        }
      } else if (shiphead[1] === shiptail[1]) {
        for (let i = 0; i < newship.length; i++) {
          newship.coordonates.push([shiphead[0] - i, shiphead[1]]);
        }
      }

      this.shiplist.push(newship);
    },
    receiveAttack: function (position) {
      this.shiplist.forEach((element) => {
        element.coordonates.forEach((cor) => {
          if (cor[0] === position[0] && cor[1] === position[1]) {
            element.hit();
            this.hitattacks.push(position);
            return;
          }
        });
      });
      if (!this.hitattacks.includes(position)) {
        this.missedattacks.push(position);
      }
    },
    allShipsSunk: function () {
      let sunkships = 0;
      this.shiplist.forEach((element) => {
        if (element.isSunk() === true) {
          sunkships++;
        }
      });
      if (sunkships === this.shiplist.length) {
        return true;
      } else {
        return false;
      }
    },
  };
}

export function Player(name) {
  return {
    name: name,
    board: gameboard(name + "s board"),
    attackEnemy: function (computer, position) {
      computer.board.receiveAttack(position);
    },
  };
}

export function Computer(name) {
  return {
    name: name,
    board: gameboard(name + "s board"),
    attackEnemy: function (player, position) {
      player.board.receiveAttack(position);
    },
  };
}
