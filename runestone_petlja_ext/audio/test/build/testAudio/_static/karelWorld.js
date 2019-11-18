var World = (function () {
    function World(avenues, streets) {
        this.numAvenues = avenues;
        this.numStreets = streets;
        this.corners = [];
        this.robotStartAvenue = 0;
        this.robotStartStreet = 0;
        this.robotStartDirection = "N";
        this.robotStartBalls = 0;

        for(var av=0; av<avenues; av++){
            var avenue = [];
            for(var st=0; st<streets; st++){
                avenue.push(new Corner(av+1, st+1));
            }
            this.corners.push(avenue);
        }

        this.addEWWall(1, streets, avenues);
        this.addNSWall(avenues, 1, streets);
    }

    World.prototype.clone = function() {
        var w = new World(this.numAvenues, this.numStreets);
        w.corners = [];
        w.robotStartAvenue = this.robotStartAvenue;
        w.robotStartStreet = this.robotStartStreet;
        w.robotStartDirection = this.robotStartDirection;
        w.robotStartDirection = this.robotStartDirection;
        w.robotStartBalls = this.robotStartBalls;

        for(var av=0; av<this.numAvenues; av++){
            var avenue = [];
            for(var st=0; st<this.numStreets; st++){
                avenue.push(this.getCorner(av+1, st+1).clone());
            }
            w.corners.push(avenue);
        }

        return w;
    }

    World.prototype.getAvenues = function () {
        return this.numAvenues;
    };

    World.prototype.getStreets = function () {
        return this.numStreets;
    };

    World.prototype.getCorner = function (avenue, street) {
        return this.corners[avenue-1][street-1];
    };

    World.prototype.addEWWall = function (startAvenue, northOfStreet, nBlocks) {
        for(var i=0; i<nBlocks; i++){
            this.getCorner(startAvenue+i, northOfStreet).setEastWall(true);
        }
    };

    World.prototype.addNSWall = function (eastOfAvenue, startStreet, nBlocks) {
        for(var i=0; i<nBlocks; i++){
            this.getCorner(eastOfAvenue, startStreet+i).setNorthWall(true);
        }
    };

    World.prototype.checkNSWall = function (eastOfAvenue, atStreet) {
        return this.getCorner(eastOfAvenue, atStreet).hasNorthWall();
    };

    World.prototype.checkEWWall = function (atAvenue, northOfStreet) {
        return this.getCorner(atAvenue, northOfStreet).hasEastWall();
    };

    World.prototype.getRobotStartAvenue = function () {
        return this.robotStartAvenue;
    };

    World.prototype.setRobotStartAvenue = function (avenue) {
        this.robotStartAvenue = avenue;
    };

    World.prototype.getRobotStartStreet = function () {
        return this.robotStartStreet;
    };

    World.prototype.setRobotStartStreet = function (street) {
        this.robotStartStreet = street;
    };

    World.prototype.getRobotStartDirection = function () {
        return this.robotStartDirection;
    };

    World.prototype.setRobotStartDirection = function (dir) {
        this.robotStartDirection = dir;
    };

    World.prototype.getRobotStartBalls = function () {
        return this.robotStartBalls;
    };

    World.prototype.setRobotStartBalls = function (b) {
        this.robotStartBalls = b;
    };

    World.prototype.isInBounds = function (a, s) {
        return (1<=a) && (a<=this.getAvenues()) && (1<=s) && (s<=this.getStreets());
    };

    World.prototype.checkBall = function (a, s) {
        return this.getBalls(a, s) > 0;
    };

    World.prototype.checkHole = function (a, s) {
        return this.getBalls(a, s) < 0;
    };

    World.prototype.pickBall = function (a, s) {
	if (this.getBalls(a, s) > 0) {
	    this.setBalls(a, s, this.getBalls(a, s) - 1);
	    return true;
	}
        throw "no_ball";
    };

    World.prototype.putBall = function (a, s) {
	this.setBalls(a, s, this.getBalls(a, s) + 1);
    };

    World.prototype.putBalls = function (a, s, n) {
        for(var i=0; i<n; i++)
            this.putBall(a, s);
    };

    World.prototype.putHole = function (a, s) {
	this.setBalls(a, s, this.getBalls(a, s) - 1);
    };

    World.prototype.putHoles = function (a, s, n) {
        for(var i=0; i<n; i++)
            this.putHole(a, s);
    };

    World.prototype.setBalls = function (a, s, n) {
        return this.getCorner(a,s).setBalls(n);
    };

    World.prototype.getBalls = function (a, s) {
        return this.getCorner(a,s).getBalls();
    };

    World.prototype.getHoles = function (a, s) {
        return this.getCorner(a,s).getHoles();
    };

    return World;
})();

