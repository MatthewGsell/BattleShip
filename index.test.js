import { experiments } from "webpack";
import { testfunction, ship, gameboard, Player, Computer } from "./index";

test("checking if this works", () => {
  expect(testfunction()).toBe(4);
});

test("shipcreation", () => {
  expect(ship("Carrier", 5).length).toBe(5);
});

test("ship gets hit", () => {
  const carrier = ship("Carrier", 5);
  carrier.hit();
  carrier.hit();
  expect(carrier.hits).toBe(2);
});

test("is ship sunk", () => {
  const carrier = ship("Carrier", 5);
  carrier.hit();
  carrier.hit();
  expect(carrier.isSunk()).toBe(false);
  carrier.hit();
  carrier.hit();
  carrier.hit();
  expect(carrier.isSunk()).toBe(true);
});

test("is ship placed on grid in vertical orientation", () => {
  const board = gameboard();
  board.placeship("Carrier", 5, [0, 1], [0, 5]);
  expect(board.shiplist[0].coordonates).toEqual([
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
  ]);
});

test("is ship placed on grid in horizontal orientation", () => {
  const board = gameboard();
  board.placeship("Carrier", 5, [1, 0], [5, 0]);
  expect(board.shiplist[0].coordonates).toEqual([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ]);
});

test("did ship get hit via gameboard", () => {
  const board = gameboard();
  board.placeship("Carrier", 5, [1, 0], [5, 0]);
  board.receiveAttack([3, 0]);
  board.receiveAttack([4, 0]);
  board.receiveAttack([5, 0]);
  board.receiveAttack([7, 0]);
  board.receiveAttack([6, 0]);
  expect(board.shiplist[0].hits).toBe(3);
});

test("does the board keep track of missed and hit shots", () => {
  const board = gameboard();
  board.placeship("Destroyer", 2, [0, 1], [0, 2]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);
  board.receiveAttack([0, 3]);
  board.receiveAttack([0, 4]);
  expect(board.hitattacks).toEqual([
    [0, 1],
    [0, 2],
  ]);
  expect(board.missedattacks).toEqual([
    [0, 3],
    [0, 4],
  ]);
});

test("board function that declares if all ships are sunk", () => {
  const board = gameboard();
  board.placeship("Destroyer", 2, [0, 1], [0, 2]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);
  expect(board.allShipsSunk()).toBe(true);
  board.placeship("Destroyer", 2, [0, 4], [0, 5]);
  expect(board.allShipsSunk()).toBe(false);
});

test("user can attack computer and computer can attack user", () => {
  const PlayerOne = Player("Player");
  const ComputerOne = Computer("Player");
  PlayerOne.placeship("Destroyer", 2, [0, 1], [0, 2]);
  ComputerOne.placeship("Destroyer", 2, [0, 1], [0, 2]);
  PlayerOne.attackEnemy([0, 1]);
  expect(Computer.board.shiplist[0].hits).toBe(1);
});
