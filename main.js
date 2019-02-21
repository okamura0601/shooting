enchant();
window.onload = function() {

    const SIZE = 640;
    const START = "icon/start.png"
    const COUNT1 = "icon/count1.png"
    const COUNT2 = "icon/count2.png"
    const COUNT3 = "icon/count3.png"
    const SQUARE = "icon/square.png"
    const JUKO = "icon/juko.png"
    const TARGET = "icon/target.png"
    const APPLE = "icon/apple.png"
    // const SCORE = "icon/score.png"

    var core = new Core(SIZE, SIZE);
    core.preload(
        START,
        COUNT1,
        COUNT2,
        COUNT3,
        SQUARE,
        JUKO,
        TARGET,
        APPLE
        /*,SCORE*/
        );
    core.fps = 60; 
    core.keybind(65,'A');
    core.keybind(68,'D');
    core.keybind(83,'S');
    core.keybind(87,'W');

    core.onload = function() {

        var frame;
        var mX = null;
        var mY = null;
        var isTouch = false;
        var score = 0;

        var start = new Sprite(236,48);
        start.image = core.assets[START];
        start.scaleX = 1;
        start.scaleY = 1;
        start.x = (SIZE - (start.width * start.scaleX)) / 2;
        start.y = (SIZE - (start.height * start.scaleY)) / 2;
        core.rootScene.addChild(start);

        // STARTがクリックさせた時の動き
        start.ontouchstart = function(){
            //frameアニメーション
            // this.onenterframe = function(){
            
                // //フェードアウト
                // this.opacity  -= 0.25;
                
                // //フェードアウトが完了したらスプライトを削除
                // if(this.opacity <= 0){
                console.log("3秒前");
                this.parentNode.removeChild(this);
                core.rootScene.addChild(count3);
                // }
                frame = core.frame;
            
            // }
        }

        var count1 = new Sprite(200,200);
        count1.image = core.assets[COUNT1];
        count1.scaleX = 1;
        count1.scaleY = 1;
        count1.x = (SIZE - (count1.width * count1.scaleX)) / 2;
        count1.y = (SIZE - (count1.height * count1.scaleY)) / 2;

        var count2 = new Sprite(200,200);
        count2.image = core.assets[COUNT2];
        count2.scaleX = 1;
        count2.scaleY = 1;
        count2.x = (SIZE - (count2.width * count2.scaleX)) / 2;
        count2.y = (SIZE - (count2.height * count2.scaleY)) / 2;

        var count3 = new Sprite(200,200);
        count3.image = core.assets[COUNT3];
        count3.scaleX = 1;
        count3.scaleY = 1;
        count3.x = (SIZE - (count3.width * count3.scaleX)) / 2;
        count3.y = (SIZE - (count3.height * count3.scaleY)) / 2;



        core.rootScene.on("enterframe",function(){
            this.backgroundColor = "black";
            if(frame + 60 == core.frame ){
                console.log("2秒前");
                core.rootScene.removeChild(count3);
                core.rootScene.addChild(count2);                
            }
            if(frame + 120 == core.frame ){
                console.log("1秒前");
                core.rootScene.removeChild(count2);
                core.rootScene.addChild(count1);                
            }
            if(frame + 180 == core.frame ){
                console.log("START");
                core.rootScene.removeChild(count1);
                core.pushScene(play);
            }
        });
        
        var play = new Scene();

        var square = new Sprite(137,101);
        square.image = core.assets[SQUARE];
        square.scaleX = 1;
        square.scaleY = 1;
        square.x = (SIZE - (square.width * square.scaleX)) / 2;
        square.y = SIZE - (square.height * square.scaleY);

        var juko = new Sprite(50,172);
        juko.image = core.assets[JUKO];
        juko.scaleX = 1;
        juko.scaleY = 1;
        juko.x = (SIZE - (juko.width * juko.scaleX)) / 2;
        juko.y = SIZE - (juko.height * juko.scaleY);
        var xxx = 320;
        var yyy = SIZE - (juko.width * juko.scaleX) / 2;
      
        juko.on("enterframe",function(e){
            var r = Math.atan2( yyy - mY, xxx - mX) * 180 / Math.PI - 90;
            if (r <= -60)
                r = -60;
            if (r > 60)
                r = 60;
            // 絵を傾ける
            this.rotation = r;
        });

        var target = new Sprite(32,32);
        target.image = core.assets[TARGET];
        target.scaleX = 1;
        target.scaleY = 1;

        /*ズレが生じるがマウスを動かすと動くパターン*/
        target.on("enter",function(){
            this.x = mX - (this.width * this.scaleX)/2;
            this.y = mY - (this.height * this.scaleY)/2;

        });
        target.on("enterframe",function(){
            
            this.x = mX //- (this.width * this.scaleX)/2;
            this.y = mY //- (this.height * this.scaleY)/2;
            // console.log("targetX = " + this.x)
            // console.log("targetY = " + this.y)
        });
        
        /*ドラック中にtargetが動くパターン*/
        // play.ontouchmove = function (touch) {
        // 	target.x =  touch.x - target.width / 2;
        //     target.y =  touch.y - target.height / 2;
        //     console.log("targetX = " + target.x)
        //     console.log("targetY = " + target.y)
        // }

        /*マイクラと同じボタンでtargetを動くパターン*/
        // target.on("enter",function(){
        //     this.x = (SIZE - (this.width * this.scaleX)) / 2;
        //     this.y = (SIZE - (this.height * this.scaleY)) /2;
        // });
        // target.on("enterframe",function(){
        //     if(core.input.A){
        //         this.x -= 5;
        //     }
        //     if(core.input.D){
        //         this.x += 5;
        //     }
        //     if(core.input.W){
        //         this.y -= 5;
        //     }
        //     if(core.input.S){
        //         this.y += 5;
        //     } 
        // });

        var AppleLeft = Class.create(Sprite, {
            initialize: function() {
                Sprite.call(this, 100, 100);
                this.image = core.assets[APPLE];
                this.scaleX =0.5;
                this.scaleY =0.5;
                this.x = 0;
                this.y = 400;
                
                this.rad = (rand(30) + 40) * (-1);
                this.vx = 0;
                this.vy = 0;
                this.speed = rand(3) + 7 ;
                console.log("角度："+this.rad +"   速さ："+this.speed);
                play.addChild(this);
                
                this.addEventListener("enterframe", function() {

                    // 移動量
                    this.vx = this.speed*Math.cos(this.rad/180*Math.PI);
                    this.vy = this.speed*Math.sin(this.rad/180*Math.PI);
                    // 似非重力
                    this.vy += (9.8/core.fps);

                    // 絵の向きの角度を計算しなおす
                    this.rad = Math.atan2((this.y + this.vy)-(this.y), (this.x + this.vx)-(this.x)) * 180/Math.PI;
                    this.rotation = this.rad;

                    // 移動
                    this.x += this.vx;
                    this.y += this.vy;

                    if(this.within(target, 30) && isTouch == true){
                        play.removeChild(this);
                        score++;
                        console.log("SCORE:"+ score)
                    }
                    
                });
            }
		});

        var AppleRight = Class.create(Sprite, {
            initialize: function() {
                Sprite.call(this, 100, 100);
                this.image = core.assets[APPLE];
                this.scaleX =0.5;
                this.scaleY =0.5;
                this.x = 600;
                this.y = 400;
                this.rad = (rand(30) + 40) * (-1);
                this.vx = 0;
                this.vy = 0;
                this.speed = rand(3) + 7;

                //console.log("角度："+this.rad +"   速さ："+this.speed);
                play.addChild(this);
                //console.log(this.rad)
                
                this.addEventListener("enterframe", function() {

                    // 移動量
                    this.vx = this.speed*Math.cos(this.rad/180*Math.PI);
                    this.vy = this.speed*Math.sin(this.rad/180*Math.PI);
                    // 似非重力
                    this.vy += (9.8/core.fps);

                    // 絵の向きの角度を計算しなおす
                    this.rad = Math.atan2((this.y + this.vy)-(this.y), (this.x + this.vx)-(this.x)) * 180/Math.PI;
                    this.rotation = this.rad;

                    // 移動
                    this.x -= this.vx;
                    this.y += this.vy;

                    if(this.within(target, 30) && isTouch == true){
                        play.removeChild(this);
                        score++;
                        console.log("SCORE:" + score)
                    }
                    
                });
            }
		});

        play.on("enter",function(){
            this.backgroundColor = "white";
            this.addChild(square);
            this.addChild(juko);
            this.addChild(target);
        });

        play.on("enterframe",function(){
            document.body.addEventListener("mousemove", function(e){
 
                //座標を取得する
                mX = e.clientX;  //X座標
                mY = e.clientY;  //Y座標
                //座標を表示する
                // console.log("X: " + mX + "Y: " + mY);
            });

            this.addEventListener("touchstart", function(e) { isTouch = true; }); // タッチ開始
            this.addEventListener("touchend", function(e) { isTouch = false; });  // タッチ終了
            if (core.frame % 120 == 0){
                var appleLeft = new AppleLeft();
                var appleRight = new AppleRight();
                // console.log("test")
            }
        });



    }
    core.start();

}

function rand(n) {
    return Math.floor(Math.random() * (n + 1));
}
