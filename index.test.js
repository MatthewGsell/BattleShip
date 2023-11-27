import { testfunction, ship, gameboard  } from "./index";

test('checking if this works' , () => {
    expect(testfunction()).toBe(4)
})


test('shipcreation', () => {
    expect(ship('Carrier', 5).length).toBe(5)
})

test('ship gets hit', () => {
    const carrier = ship('Carrier', 5)
    carrier.hit()
    carrier.hit()
    expect(carrier.hits).toBe(2)

})

test('is ship sunk', () => {
    const carrier = ship('Carrier', 5)
    carrier.hit()
    carrier.hit()
    expect(carrier.isSunk()).toBe(false)
    carrier.hit()
    carrier.hit()
    carrier.hit()
    expect(carrier.isSunk()).toBe(true)

})

test('is ship placed on grid', () => {
    const board = gameboard() 
    board.placeship('Submarine', 3, [0, 1], [0, 3])
    expect(board.shiplist[0].cordonates).toEqual([[0, 1], [0, 2], [0,3]])
})