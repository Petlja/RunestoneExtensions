var $builtinmodule = function(name)
{
    var mod = {};

    var drawer = Sk.Karel.drawer;

    var config = Sk.Karel.config;

	var setup = config.setup();
    var robot = setup.robot;
	var world = setup.world;
    robot.setWorld(world);

	Sk.Karel.robot = robot;

    drawer.drawFrame(robot);

    function turnLeft() {
	robot.turnLeft();
	drawer.addFrame(robot.clone());
    }

    function turnRight() {
	robot.turnRight();
	drawer.addFrame(robot.clone());
    }

    function move() {
	robot.move();
	drawer.addFrame(robot.clone());
    }

    function frontIsClear() {
	return robot.frontIsClear();
    }

    function ballsPresent() {
	return robot.ballsPresent();
    }

    function getBalls() {
	return robot.getBalls();
    }
    
    function hasBalls() {
	return robot.getBalls() != 0;
    }
    

    function countBalls() {
	return robot.countBalls();
    }
    

    function pickBall() {
	robot.pickBall();
	drawer.addFrame(robot.clone());
    }
    
    function putBall() {
	robot.putBall();
	drawer.addFrame(robot.clone());
    }

    function showMessage(m) {
	robot.turnMessagesOn();
	robot.show(m);
	drawer.addFrame(robot.clone());
	robot.turnMessagesOff();
    }

    mod.turnLeft = new Sk.builtin.func(function() {
        return turnLeft();
    });

    mod.levo = mod.turnLeft;
    mod.turn_left = mod.turnLeft;
    

    mod.turnRight = new Sk.builtin.func(function() {
        return turnRight();
    });

    mod.desno = mod.turnRight;
    mod.turn_right = mod.turnRight;
    

    mod.move = new Sk.builtin.func(function() {
        return move();
    });

    mod.napred = mod.move;

    mod.frontIsClear = new Sk.builtin.func(function() {
        return frontIsClear();
    });
    
    mod.moze_napred = mod.frontIsClear;
    mod.mozeNapred = mod.frontIsClear;
    mod.front_is_clear = mod.frontIsClear;
    
    mod.getBalls = new Sk.builtin.func(function() {
	return Sk.builtin.int_(getBalls());
    });

    mod.broj_loptica_kod_sebe = mod.getBalls;
    mod.brojLopticaKodSebe = mod.getBalls;
    mod.num_balls_with_karel = mod.getBalls;

    mod.hasBalls = new Sk.builtin.func(function() {
	return hasBalls();
    });

    mod.ima_loptica_kod_sebe = mod.hasBalls;
    mod.imaLopticaKodSebe = mod.hasBalls;
    mod.any_balls_with_karel = mod.hasBalls;

    mod.countBalls = new Sk.builtin.func(function() {
	return Sk.builtin.int_(countBalls());
    });
    
    mod.broj_loptica_na_polju = mod.countBalls;
    mod.brojLopticaNaPolju = mod.countBalls;
    mod.num_balls_on_square = mod.countBalls;

    mod.ballsPresent = new Sk.builtin.func(function() {
        return ballsPresent();
    });

    mod.ima_loptica_na_polju = mod.ballsPresent;
    mod.imaLopticaNaPolju = mod.ballsPresent;
    mod.is_ball_on_square = mod.ballsPresent;

    mod.pickBall = new Sk.builtin.func(function() {
        return pickBall();
    });

    mod.uzmi_lopticu = mod.pickBall;
    mod.uzmiLopticu = mod.pickBall;
    mod.uzmi = mod.pickBall;
    mod.pick_ball = mod.pickBall;
    

    mod.putBall = new Sk.builtin.func(function() {
        return putBall();
    });

    mod.ostavi_lopticu = mod.putBall;
    mod.ostaviLopticu = mod.putBall;
    mod.ostavi = mod.putBall;
    mod.drop_ball = mod.putBall;

    mod.show = new Sk.builtin.func(function(a) {
	if (a instanceof Sk.builtin.int_ ||
	    a instanceof Sk.builtin.str)
	    showMessage(a.v);
    });
    mod.showMessage = mod.show;
    mod.message = mod.show;
    mod.reci = mod.show;
    mod.izgovori = mod.show;

    return mod;
}
