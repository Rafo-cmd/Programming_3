class Game{
    constructor(x,y)    {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 8;
        this.predenergy = 100;
        this.directions =   [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    getNewDirections(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
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
            }return found
    }
    mul(ch){
        this.multiply++;
        if (this.multiply >=8) {
            let emptyCells = this.chooseCells(0)
            let newcell = random(emptyCells);
            if (newcell) {
                var newx = newcell[0];
                var newy = newcell[1];
                matrix[newy][newx] = ch;
                var gr = new classs(newx, newy);
                arrayy.push(gr);
            }
            this.multiply = 0;
        }
    }
    move(newch){
        //move
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
    eat(ch,newch){
        var grassCells = this.chooseCells(ch);
        var grass = random(grassCells);
        if (grass) {
            //utel
            var x = grass[0];
            var y = grass[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = newch;
            this.y = y;
            this.x = x;
            this.multiply++;
            this.energy++
            for (var i in grassarr) {
                if (grassarr[i].x == x && grassarr[i].y == y ) {
                    grassarr.splice(i, 1)
                    break;
                }
            }
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }
        }else{
            //sharjvel
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    die(){
        //die
        matrix[this.y][this.x] = 0;
        
        for(var i in eaters) {
            if (eaters[i].x == this.x && eaters[i].y == this.y) {
                eaters.splice(i,1);
                break;
            }
        }
    }
}
class Grass extends Game{
    constructor(x,y,multiply,directions)    {
        super(x,y,multiply,directions);
    }
    chooseCells(character) {
    	return super.chooseCells(character);
    }
    mul(){
        this.multiply++;
        if (this.multiply >=8) {
            let emptyCells = this.chooseCells(0)
            let newcell = random(emptyCells);
            if (newcell) {
                var newx = newcell[0];
                var newy = newcell[1];
                matrix[newy][newx] = 1;
                var gr = new Grass(newx, newy);
                grassarr.push(gr);
            }
            this.multiply = 0;
        }
    }
}
class Eater extends Grass {
	constructor(x, y,multiply,directions,energy) {
        super(x,y,multiply,directions,energy)
	}
	getNewDirections(){
		return super.getNewDirections();
	}
	chooseCells(character) {
    	this.getNewDirections();
    	return super.chooseCells(character);
    }
    move(){
    	//move
    	return super.move(2);
    }
    eat(){
        return super.eat(1,2);
    }
    mul(){
        this.multiply++;
        if (this.multiply >=8) {
            let emptyCells = this.chooseCells(0)
            let newcell = random(emptyCells);
            if (newcell) {
                var newx = newcell[0];
                var newy = newcell[1];
                matrix[newy][newx] = 2;
                var gr = new classs(newx, newy);
                eaters.push(gr);
            }
            this.multiply = 0;
        }
    }
    die(){
    	//die
    	return super.die();
    }
}
class Predator extends Game{
	constructor(x, y, multiply, predenergy, directions) {
		super(x, y, multiply, predenergy, directions);
	}
	getNewDirections(){
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCells(character);
    }
	move(){
        //move
        return super.move(3);
    }
	eat(){
        return super.eat(2,3);
    }
	die(){
        //die
        return super.die();
    }
}
class Farmer extends Game{
	constructor(x, y, directions) {
		super(x, y, directions);
	}
	getNewDirections(){
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCells(character);
    }
    create(){
    	//sarqel gazar
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
class Hunter extends Game{
	constructor(x, y, directions) {
        super(x, y, directions);
    }
	getNewDirections(){
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCells(character);
    }
	move(){
        //move
        return super.move(5);
    }
    eat(){
        return super.eat(4,5);
    }
}




















