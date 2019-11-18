var KarelImages = (function() {
    function KarelImages() {
        this.loadedImageCount = 0;
        
        var that = this;
        function onImageLoad() {
            that.loadedImageCount++;
            console.log('Loaded image: ', that.loadedImageCount);
        }

        this.imageNames = ['north', 'south', 'east', 'west', 'ball', 'hole'];
        this.imageArray = {};

        for (var i = 0; i < this.imageNames.length; i++) {
            var name = this.imageNames[i];
            this.imageArray[name] = new Image();
            this.imageArray[name].onload = onImageLoad;
            this.imageArray[name].src = eBookConfig.staticDir + 'img/karel-' + name + '.png';
        }
    }
    
    function images() {
        return this.imageArray;
    }

    function loaded() {
        return this.loadedImageCount >= 6;
    }

    var instance = null;

    function create() {
        instance = new KarelImages();
        instance.loaded = loaded;
        instance.images = images;
        return instance;
    }

    function get() {
        if (!instance)
            instance = create();
        return instance;
    }

    return {get: get};
}());

var RobotDrawer = (function () {
    function RobotDrawer(canvas, sleep) {
        this.frames = [];
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext("2d");
        this.sleep = sleep || 1000;
        this.intervalHandle = null;
        this.isRunning = false;
    }

    function start(){
        if(this.intervalHandle){
            this.onstop = null;
            clearInterval(this.intervalHandle);
        }
        this.frames = [];
        this.isRunning = true;
        var self = this;
        this.intervalHandle = setInterval(function(){draw.call(self);}, this.sleep);
    }
    
    function stop(onstop){
        this.isRunning = false;
        this.onstop = onstop;
    }

    function addFrame(robot){
        this.frames.unshift(robot);
    }
    
    function draw(){
        if(this.frames.length===0) {
            if(!this.isRunning && this.intervalHandle){
                clearInterval(this.intervalHandle);
                if(this.onstop){
                    this.onstop();
                }
            }
            return;
        }
	
        var robot = this.frames.pop();
        drawFrame.call(this, robot);
    }

    function drawFrame(robot){
        if (!KarelImages.get().loaded()) {
            console.log('Delay until images are loaded...');
            setTimeout(drawFrame.bind(this, robot), 100);
            return;
        }
        
        this.context.clearRect(0 ,0 ,this.width ,this.height);
        computeScale.call(this, robot);
        drawGrid.call(this, robot);
        drawWalls.call(this, robot);
        drawBalls.call(this, robot);
        drawRobot.call(this, robot);
        if (robot.getLastMessage() != "" && robot.messagesOn)
            alert(robot.getLastMessage());
    }
    
    function computeScale(robot){
        var world = robot.getWorld();
        this.translate_x = 0;
        this.translate_y = 0;
        this.scale_x = this.width / (world.getAvenues()+1);
        this.scale_y = this.height / (world.getStreets()+1);
        this.scale_x = Math.min(this.scale_x, this.scale_y);
        this.scale_y = Math.min(this.scale_x, this.scale_y);
        this.cell_width = this.scale_x;
        this.cell_height = this.scale_y;
        this.translate_x = (this.width - this.scale_x * (world.getAvenues()+1)) / 2;
        this.translate_y = (this.height - this.scale_y * (world.getStreets()+1)) / 2;
        this.wall_width = 3;
    }

    function worldToScreen(avenue, street){
        var x = (this.scale_x*avenue)+this.translate_x;
        var y = (this.scale_y*street)+this.translate_y;
        y = this.height - y;
        return {x: x, y: y};
    }

    function drawWalls(robot){
        var world = robot.getWorld();
        var ctx = this.context;

        ctx.strokeStyle = "black";
        ctx.lineWidth = this.wall_width;
        //west wall
        var pt1 = worldToScreen.call(this, 1,1);
        var pt2 = worldToScreen.call(this, 1, world.getStreets());
        ctx.beginPath();
        ctx.moveTo(pt1.x-this.cell_width/2, pt2.y-this.cell_height/2);
        ctx.lineTo(pt1.x-this.cell_width/2, pt1.y+this.cell_height/2);
        ctx.stroke();
        //south wall
        pt1 = worldToScreen.call(this, 1,1);
        pt2 = worldToScreen.call(this, world.getAvenues(), 1);
        ctx.beginPath();
        ctx.moveTo(pt1.x-this.cell_width/2, pt1.y+this.cell_height/2);
        ctx.lineTo(pt2.x+this.cell_width/2, pt1.y+this.cell_height/2);
        ctx.stroke();
        for(var s=1;s<=world.getStreets();s++){
            for(var a=1;a<=world.getAvenues();a++){
                if(world.checkNSWall(a,s)){
                    pt1 = worldToScreen.call(this, a, s);
                    ctx.beginPath();
                    ctx.moveTo(pt1.x+this.cell_width/2, pt1.y-this.cell_height/2);
                    ctx.lineTo(pt1.x+this.cell_width/2, pt1.y+this.cell_height/2);
                    ctx.stroke();
                }
                if(world.checkEWWall(a,s)){
                    pt1 = worldToScreen.call(this, a, s);
                    ctx.beginPath();
                    ctx.moveTo(pt1.x-this.cell_width/2, pt1.y-this.cell_height/2);
                    ctx.lineTo(pt1.x+this.cell_width/2, pt1.y-this.cell_height/2);
                    ctx.stroke();
                }
            }
        }
    }

    function drawGrid(robot){
        var world = robot.getWorld();
        var ctx = this.context;
	
        ctx.strokeStyle = "gray";
        ctx.fillStyle = "gray";
        ctx.lineWidth = 1;
        ctx.font = "15px Arial";
        for(var s=1;s<=world.getStreets();s++){
            var pt1 = worldToScreen.call(this, 1, s);
            var pt2 = worldToScreen.call(this, world.getAvenues(), s);
            ctx.beginPath();
            ctx.moveTo(pt1.x-this.cell_width/2, pt1.y);
            ctx.lineTo(pt2.x+this.cell_width/2, pt2.y);
            ctx.stroke();
            var str = s.toString();
            ctx.fillText(str, pt1.x - this.cell_width/2 - ctx.measureText(str).width - this.wall_width*2, pt1.y + getTextHeight(ctx.font).descent);
        }
        for(var a=1;a<=world.getAvenues();a++){
            var pt1 = worldToScreen.call(this, a, 1);
            var pt2 = worldToScreen.call(this, a, world.getStreets());
            ctx.beginPath();
            ctx.moveTo(pt1.x, pt1.y + this.cell_height/2);
            ctx.lineTo(pt2.x, pt2.y - this.cell_height/2);
            ctx.stroke();
            var str = a.toString();
            ctx.fillText(str, pt1.x - ctx.measureText(str).width/2, pt1.y + this.cell_height/2 + getTextHeight(ctx.font).ascent + this.wall_width*2);
        }
    }

    function drawRobot(robot){
        var ctx = this.context;
        var w = 0.5 * this.cell_width;
        var h = 0.9 * this.cell_height;
        var pt = worldToScreen.call(this, robot.getAvenue(), robot.getStreet());
        pt.x = pt.x - w / 2;
        pt.y = pt.y - h / 2;

        var img;

        switch(robot.getDirection()){
            case "E":
                img = KarelImages.get().images().east;
                break;
            case "N":
                img = KarelImages.get().images().north;
                break;
            case "S":
                img = KarelImages.get().images().south;
                break;
            case "W":
                img = KarelImages.get().images().west;
                break;
        }       

        ctx.drawImage(img, pt.x, pt.y, w, h);
        ctx.font = (Math.floor(w/3)).toString() + "px Arial";
	ctx.fillStyle = "black";

        var str = robot.getInfiniteBalls() ? "∞" : robot.getBalls().toString();
        ctx.fillText(str, pt.x - 5, pt.y + getTextHeight(ctx.font).ascent);
    }

    function drawBalls(robot){
        var world = robot.getWorld();
        var ctx = this.context;


        for(var a=1; a<=world.getAvenues();a++){
            for(var s=1; s<=world.getStreets();s++){
                if(world.checkBall(a, s) || world.checkHole(a, s)){
                    var pt = worldToScreen.call(this, a, s);
                    var img, width, height;
                    if(world.checkBall(a, s)){
                        width = 0.4 * this.cell_width;
                        height = 0.4 * this.cell_height;
                        img = KarelImages.get().images().ball;
                        fontStyle = "black";
                    } else {
                        width = 0.8 * this.cell_width;
                        height = 0.8 * this.cell_height;
                        img = KarelImages.get().images().hole;
                        fontStyle = "white";
                    }
                    ctx.drawImage(img, pt.x - width / 2, pt.y - height / 2, width, height);
                    
                    var fontSize = 15;
                    var nb = Math.abs(world.getBalls(a, s)).toString();

                    while(true) {
                        ctx.fillStyle = fontStyle;
                        ctx.font = fontSize + "px Arial";
                        var text_width = ctx.measureText(nb).width;
                        var text_height = getTextHeight(ctx.font).ascent; // this text is digits only, so ascent is enough
                        if (fontSize <= 8) break;
                        if ((text_width <= width) && (text_height <= height))
                            break;
                        fontSize--;
                    }
                    ctx.fillText(nb, pt.x - ctx.measureText(nb).width/2, pt.y + getTextHeight(ctx.font).descent);
                }
            }
        }
    }

    var getTextHeight = function(font) {
        font = font.split(" ");
        var text = $('<span>Hg</span>').css({ fontFamily: font[1], fontSize: font[0] });
        var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

        var div = $('<div></div>');
        div.append(text, block);
        
        var body = $('body');
        body.append(div);
        
        try {
            var result = {};
            
            block.css({ verticalAlign: 'baseline' });
            result.ascent = block.offset().top - text.offset().top;
            
            block.css({ verticalAlign: 'bottom' });
            result.height = block.offset().top - text.offset().top;
            
            result.descent = result.height - result.ascent;
            
        } finally {
            div.remove();
        }

        return result;
    };

    function drawEllipseByCenter(ctx, cx, cy, w, h) {
        drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
    }
    
    function drawEllipse(ctx, x, y, w, h) {
        var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle
	
        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        ctx.fill();
    }
    
    RobotDrawer.prototype.start = start;
    RobotDrawer.prototype.stop = stop;
    RobotDrawer.prototype.addFrame = addFrame;
    RobotDrawer.prototype.drawFrame = drawFrame;

    return RobotDrawer;
})();
