var Corner = (function () {
    function Corner(a, s) {
        this.avenue = a;
        this.street = s;
        this.numBalls = 0;
        this.wallToNorth = false;
        this.wallToEast = false;
    }

    Corner.prototype.clone = function() {
        var c = new Corner(this.avenue, this.street);

        c.avenue = this.avenue;
        c.street = this.street;
        c.numBalls = this.numBalls;
        c.wallToNorth = this.wallToNorth;
        c.wallToEast = this.wallToEast;

        return c;
    };

    Corner.prototype.setBalls = function (n) {
        this.numBalls = n;
    };

    Corner.prototype.getBalls = function () {
        return this.numBalls;
    };

    Corner.prototype.setNorthWall = function (w) {
        this.wallToNorth = w;
    };

    Corner.prototype.hasNorthWall = function () {
        return this.wallToNorth;
    };

    Corner.prototype.setEastWall = function (w) {
        this.wallToEast = w;
    };

    Corner.prototype.hasEastWall = function () {
        return this.wallToEast;
    };

    return Corner;
})();