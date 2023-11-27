export function testfunction() {
    return 4
}


export function ship(name, length) {
    return {
        name: name,
        length: length,
        hits: 0,
        hit: function() {
            this.hits++
        },
        isSunk: function() {
            if (this.hits >= this.length){
                return true
            }else {
                return false
            }

        }
    }
}

export function gameboard(name) {
    return {
        name: name,
        shiplist: [],
        xcorlist: [0, 1, 2, 3, 4, 5, 6, 7],
        ycorlist: [0, 1, 2, 3, 4, 5, 6, 7],
        placeship: function(name, length, shiphead, shiptail) {
            let newship = ship(name, length)
            newship.cordonates = [[0, 1], [0, 2], [0, 3]]
            this.shiplist.push(newship)

        }
    }
}