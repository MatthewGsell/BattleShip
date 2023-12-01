import { testfunction, ship, gameboard, Player, Computer } from "./gamemodules.js";

const coordonates = {
    placeship: []
}

function rendergrids() {
    const playergrid = document.querySelector("#playergrid");
    const computergrid = document.querySelector('#computergrid');
    coordonates.placeship = [12]
    for (let i = 0; i < 64; i++) {
        const ycor = Math.trunc(i / 8)
        const xcor = i - (ycor * 8) 
        const playergridsquare = document.createElement('div')
        playergridsquare.id = `p${xcor}${ycor}`
        playergridsquare.classList.add('.dropable')
        playergridsquare.addEventListener('dragenter', () => {
            playergridsquare.classList.add('selected')
            const id = playergridsquare.id
            const xcor = Number(id.charAt(1))
            const ycor = Number(id.charAt(2))
            coordonates.placeship = [xcor, ycor]
            console.log(coordonates.placeship)
        })
        playergridsquare.addEventListener('dragleave', () => {
            playergridsquare.classList.remove('selected')
        })
        playergrid
        const compgridsquare = document.createElement('div')
        compgridsquare.id = `c${xcor}${ycor}`
        playergrid.appendChild(playergridsquare)
        computergrid.appendChild(compgridsquare)
    }
}


function dragndrop () {
    const playerships = document.querySelectorAll('.draggable')
    let n = 0
    playerships[n].classList.remove('hidden')
    playerships.forEach((ship) => {
        ship.addEventListener('dragstart', (e) => {
            ship.classList.add('beingdragged')
        })  

    })
    
    playerships.forEach((ship) => {
        ship.addEventListener('dragend', () => {
            console.log('wtf')
           let shiplength = 0
           if(ship.id === "carrierh" || ship.id === "carrierv") {
            shiplength = 5
           }
           else if (ship.id === 'battleh' || ship.id === "battlev") {
            shiplength = 4
           }else if (ship.id === 'cruiserh' || ship.id === 'cruiserv' || ship.id === 'submarineh' || ship.id === 'submarinev') {
            shiplength = 3
           } else {
            shiplength = 2
           }
           console.log(ship.id)
           if (ship.id.slice(-1) === 'h') {
            console.log('wtffff')
            if (coordonates.placeship[0] - shiplength >= -1 && coordonates.placeship[0] <= 7) {
                for (let i = coordonates.placeship[0] ; i > coordonates.placeship[0] - shiplength; i--) {
                    const square = document.querySelector(`#p${i}${coordonates.placeship[1]}`)
                    square.classList.add('selected')
                }
            }
           } else if (ship.id.slice(-1) === 'v') {
            if (coordonates.placeship[1] - shiplength >= -1 && coordonates.placeship[1] <= 7) {
                for (let i = coordonates.placeship[1]; i > coordonates.placeship[1] - shiplength; i--) {
                    const square = document.querySelector(`#p${coordonates.placeship[0]}${i}`)
                    square.classList.add('selected')
                }
            }
           }
        
            
            


        })
    })

    
 
}


function rotateships() {
    const ships = document.querySelectorAll('.draggable')
    window.addEventListener('keydown', (e) => {
        if (e.key === 'v') {
        ships.forEach((ship) => {
            let a = ship.id
            let b = a.replace('h', 'v')
            ship.id = b
            console.log(ship.id)
        })}
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'h') {
        ships.forEach((ship) => {
            let a = ship.id
            let b = a.replace('v', 'h')
            ship.id = b
            console.log(ship.id)
        })}

    })
}



rendergrids()
rotateships()
dragndrop()