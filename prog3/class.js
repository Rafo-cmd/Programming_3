class Game {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.eaterenergy = 3;
        this.predenergy = 150;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        } return found
    }
    move(newch){
		//sharjvel
		this.getNewDirections();
    	var emptyCells = this.chooseCells(0);
    	var coords = random(emptyCells);
    	if (coords) {
    		var x = coords[0];
    		var y = coords[1];
    		matrix[y][x] = newch;
    		matrix[this.y][this.x] = 0;
    		
    		this.x = x;
    		this.y = y;
    	}
	}
}
class Grass extends Game {
    constructor(x, y, multiply, directions) {
        super(x, y, multiply, directions);
    }
    getNewDirections(){
        return super.getNewDirections();
    }
    chooseCells(character) {
        return super.chooseCells(character);
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 8) {
            let emptyCells = this.chooseCells(0)
            let newcell = random(emptyCells);
            if (newcell) {
                var newx = newcell[0];
                var newy = newcell[1];
                matrix[newy][newx] = 1;
                var newgr = new Grass(newx, newy);
                grassarr.push(newgr);
            }
            this.multiply = 0;
        }
    }
}
class Eater extends Grass {
    constructor(x, y, multiply, directions, eaterenergy) {
        super(x, y, multiply, directions, eaterenergy)
    }
    getNewDirections() {
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCells(character);
    }
    move() {
        //move
        return super.move(2);
    }
    eat() {
        var grassCells = this.chooseCells(1);
        var grass = random(grassCells);
        if (grass) {
            //utel
            var x = grass[0];
            var y = grass[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 2;
            this.y = y;
            this.x = x;
            this.multiply++;
            this.energy++
            for (var i in grassarr) {
                if (grassarr[i].x == x && grassarr[i].y == y) {
                    grassarr.splice(i, 1)
                }
            }
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }
        } else {
            //sharjvel
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 8) {
            let emptyCells = this.chooseCells(0)
            let newcell = random(emptyCells);
            if (newcell) {
                var newx = newcell[0];
                var newy = newcell[1];
                matrix[newy][newx] = 2;
                var neweater = new Eater(newx, newy);
                eaters.push(neweater);
            }
            this.multiply = 0;
        }
    }
    die() {
        //die
        matrix[this.y][this.x] = 0;

        for (var i in eaters) {
            if (eaters[i].x == this.x && eaters[i].y == this.y) {
                eaters.splice(i, 1);
                break;
            }
        }
    }
}
class Predator extends Game {
    constructor(x, y, multiply, predenergy, directions) {
        super(x, y, multiply, predenergy, directions);
    }
    getNewDirections() {
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCells(character);
    }
    move() {
        //move
        return super.move(3);
    }
    eat() {
        //utel
        var rabbitCells = this.chooseCells(2);
        var rabbit = random(rabbitCells);
        if (rabbit) {
            var x = rabbit[0];
            var y = rabbit[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 3;
            this.y = y;
            this.x = x;
            this.multiply++;
            this.predenergy++
            for (var i in eaters) {
                if (eaters[i].x == x && eaters[i].y == y) {
                    eaters.splice(i, 1)
                }
            }
            if (this.predenergy > 0) {
                this.move();
                this.predenergy--;
                if (this.predenergy <= 0) {
                    this.die();
                }
            }
        }
    }
    die() {
        //satkel
        matrix[this.y][this.x] = 0;

        for (var i in predators) {
            if (predators[i].x == this.x && predators[i].y == this.y) {
                predators.splice(i, 1);
            }
        }
    }
}
class Farmer extends Game {
    constructor(x, y, directions) {
        super(x, y, directions);
    }
    getNewDirections() {
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCells(character);
    }
    create() {
        //sharjvel
        this.getNewDirections();
        var emptyCells = this.chooseCells(0);
        var coords = random(emptyCells);
        if (coords) {
            var x = coords[0];
            var y = coords[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 1;
            grassarr.push(new Grass(x, y));
            this.x = x;
            this.y = y;
        }
    }
}
class Hunter extends Game {
    constructor(x, y, directions) {
        super(x, y, directions);
    }
    getNewDirections() {
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCells(character);
    }
    move() {
        //move
        return super.move(5);
    }
    eat() {
        return super.eat(4, 5);
    }
}




















