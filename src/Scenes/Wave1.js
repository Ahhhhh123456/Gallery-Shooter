score = 0;

class Wave1 extends Phaser.Scene {
    constructor(){
        super('Wave1');
        this.width = config.width;
        this.height = config.height;
        this.my = {sprite: {}};

        // Score display
        this.scoreX = 70;
        this.scoreY = 0;
        //this.score = 0;
        
        // Life Text
        this.lifeTextX = 0;
        this.lifeTextY = 50;

        // Life Sprites
        this.life1X = 14;
        this.life1Y = 85;

        this.life2X = 39;
        this.life2Y = 85;

        this.life3X = 64;
        this.life3Y = 85;

        // Player Ship
        this.shipX = this.width/2;
        this.shipY = this.height - 50;


        // Player Bullet
        // Credit to Jim FixedArrayBullet (Lines 37 - Lines 41)
        this.my.sprite.bullet = [];   
        this.maxBullets = 3;           // Don't create more than this many bullets
        this.bulletCooldown = 15;        // Number of update() calls to wait before making a new bullet
        this.bulletCooldownCounter = 0;
        this.bulletSpeed = 20;
    

        // Enemy Bullets
        this.my.sprite.bulletEn = [];   
        this.maxBulletsEn = 1;           // Don't create more than this many bullets
        this.bulletCooldownEn = 75;        // Number of update() calls to wait before making a new bullet
        this.bulletCooldownCounterEn = 0;
        this.bulletSpeedEn = 3;

        // Target Movement
        this.counter = 0;
        this.rightCountBeg = 0;
        this.rightCount = 0;
        this.leftCount = 0;

        // Row 1
        this.my.sprite.targets = [];

        this.target1X = 240;
        this.target1Y = 50;

        this.target2X = 240 + (80 * 1);
        this.target2Y = 50;

        this.target3X = 240 + (80 * 2);
        this.target3Y = 50;

        this.target4X = 240 + (80 * 3);
        this.target4Y = 50;

        this.target5X = 240 + (80 * 4);
        this.target5Y = 50;

        this.target6X = 240 + (80 * 5);
        this.target6Y = 50;

        this.target7X = 240 + (80 * 6);
        this.target7Y = 50;

        // Counter to check if all targets are gone
        this.goneCounter = 0;
    }    

    create() {
        let my = this.my;
        
        // Reset game score
        score = 0;

        // Reset arrays
        this.my.sprite.bulletEn = [];  
        this.my.sprite.bullet = [];  
        this.my.sprite.targets = [];


        // Player Ship and Bullet
        my.sprite.ship = this.add.sprite(this.shipX, this.shipY, "ship");
        my.sprite.ship.setScale(2);


        for (let i=0; i < this.maxBullets; i++) {
            // create a sprite which is offscreen and invisible
            my.sprite.bullet.push(this.add.sprite(-100, -100, "huds", "icon_bullet_gold_short.png"));
            my.sprite.bullet[i].visible = false;
        }


        // Enemy bullets
        for (let i=0; i < this.maxBulletsEn; i++) {
            // create a sprite which is offscreen and invisible
            my.sprite.bulletEn.push(this.add.sprite(-100, -100, "huds", "icon_bullet_gold_short.png"));
            my.sprite.bulletEn[i].visible = false;
            my.sprite.bulletEn[i].setFlipY(true);
        }

        // Targets
        my.sprite.target1 = this.add.sprite(this.target1X, this.target1Y, "targets", "target_red2.png");
        my.sprite.target1.setScale(0.5);
        my.sprite.targets.push(1);      

        my.sprite.target2 = this.add.sprite(this.target2X, this.target2Y, "targets", "target_red2.png");
        my.sprite.target2.setScale(0.5);
        my.sprite.targets.push(2);      

        my.sprite.target3 = this.add.sprite(this.target3X, this.target3Y, "targets", "target_red2.png");
        my.sprite.target3.setScale(0.5);
        my.sprite.targets.push(3);

        my.sprite.target4 = this.add.sprite(this.target4X, this.target4Y, "targets", "target_red2.png");
        my.sprite.target4.setScale(0.5);
        my.sprite.targets.push(4);

        my.sprite.target5 = this.add.sprite(this.target5X, this.target5Y, "targets", "target_red2.png");
        my.sprite.target5.setScale(0.5);
        my.sprite.targets.push(5);

        my.sprite.target6 = this.add.sprite(this.target6X, this.target6Y, "targets", "target_red2.png");
        my.sprite.target6.setScale(0.5);
        my.sprite.targets.push(6);

        my.sprite.target7 = this.add.sprite(this.target7X, this.target7Y, "targets", "target_red2.png");
        my.sprite.target7.setScale(0.5);
        my.sprite.targets.push(7);

        // Lives
        my.sprite.life1 = this.add.sprite(this.life1X, this.life1Y, "huds", "icon_duck.png");
        my.sprite.life1.setScale(0.75);

        my.sprite.life2 = this.add.sprite(this.life2X, this.life2Y, "huds", "icon_duck.png");
        my.sprite.life2.setScale(0.75);

        my.sprite.life3 = this.add.sprite(this.life3X, this.life3Y, "huds", "icon_duck.png");
        my.sprite.life3.setScale(0.75);

        // Keys

        this.LeftA = this.input.keyboard.addKey("A");
        this.Left = this.input.keyboard.addKey("LEFT")

        this.RightD = this.input.keyboard.addKey("D");
        this.Right = this.input.keyboard.addKey("RIGHT")
        this.S = this.input.keyboard.addKey("S")

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

        

        // Miscellaneous
        document.getElementById('description').innerHTML = '<h2>Wave1.js</h2><br>A or <=: left // D or =>: right // Space: fire/emit';
        this.scoreTitle = this.add.text(0, 0, "Score:", { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
        this.scoreText = this.add.text(this.scoreX, this.scoreY, score.toString(), { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
        this.lifeText = this.add.text(this.lifeTextX, this.lifeTextY, "Lives:", { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });



    }

    update() {
        let my = this.my;
        this.counter += 1;

        // Collide Function 
        function collides(a, b) {

            if (!a || !b || typeof a.x === 'undefined' || typeof a.y === 'undefined' ||
            typeof b.x === 'undefined' || typeof b.y === 'undefined') {
            return false;
            }

            if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
            if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
            return true;
        }


        // PLayer Ship Movement

        if (this.LeftA.isDown || this.Left.isDown) {
            if (my.sprite.ship.x >= 0 + 235) {
                my.sprite.ship.x -= 12;

            } 
            else {
                //console.log("Can not go any further.");
            }
        }



        if (this.RightD.isDown || this.Right.isDown) {
            if (my.sprite.ship.x <= this.width - 205) {
                my.sprite.ship.x += 12;

            } 
            else {
                //console.log("Can not go any further.");
            }
        }



        // Movement of targets.
        if (this.rightCountBeg < 4) { // Beginning movement
            if (this.counter % 15 == 0) {  
                for (let i in my.sprite) {
    
                    if (i == "ship" || i == "life1" || i == "life2" || i == "life3" || i == "bullet") {
                        continue;
                    }
                    else {  
                        my.sprite[i].x += 10;
                    }
                    
                }
                this.rightCountBeg += 1;
            }
        }
        else if (this.leftCount < 8 ){ // Beyond this is the movement of the target until they're destroyed

            if (this.counter % 15 == 0) {  
                for (let i in my.sprite) {
    
                    if (i == "ship" || i ==  "life1" || i =="life2" || i == "life3") {
                        continue;
                    }
                    else {  
                        my.sprite[i].x -= 10;
                    }
                    
                }
                this.leftCount += 1;
                if (this.leftCount == 8) {
                    this.rightCount = 0;
                    
                }
            }
        }
        else if (this.rightCount < 8) {
            if (this.counter % 15 == 0) {  
                for (let i in my.sprite) {
    
                    if (i == "ship" || i == "life1" || i == "life2" || i == "life3") {
                        continue;
                    }
                    else {  
                        my.sprite[i].x += 10;
                    }
                    
                }
                this.rightCount += 1;
                if (this.rightCount == 8) {
                    
                    this.leftCount = 0;
                }
            }
        }

        // Checks if bullet hits player ship
        for (let bullet of my.sprite.bulletEn) {
            if (collides(my.sprite.ship, bullet)) {


                if (my.sprite.life3.visible == false && my.sprite.life2.visible == true ) {
                    //console.log("life2");

                    bullet.y = -100;
                    bullet.visible = false;
                    my.sprite.life2.visible = false;

                    //Update score
                    this.scoreText.visible = false;
                    score -= 250;
                    this.scoreText = this.add.text(this.scoreX, this.scoreY, score.toString(), { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
                    this.scoreText.visible = true;                    

                }
                else if (my.sprite.life2.visible == false) {


                    bullet.y = -100;
                    bullet.visible = false;
                    my.sprite.life1.visible = false;
                    this.sound.play("player_dead", { volume: 1 });
                    //console.log("dead");
 
                    score -= 250;
                    this.scene.start("gameOver");

                }
                else {
                    //console.log("life3");
                    bullet.y = -100;
                    bullet.visible = false;
                    my.sprite.life3.visible = false;
             
                    this.scoreText.visible = false;
                    score -= 250;
                    this.scoreText = this.add.text(this.scoreX, this.scoreY, score.toString(), { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
                    this.scoreText.visible = true;                     
                }
            }
        }


        // Target Collide

        for (let bullet of my.sprite.bullet) {
            for (let i = 0; i < my.sprite.targets.length; i++)
            {
                var targetNameCollide = 'target' + (i + 1);

                if (collides(my.sprite[targetNameCollide], bullet)) {
                    my.sprite[targetNameCollide].visible = false;
                    my.sprite[targetNameCollide].x = -1000;
                    this.goneCounter += 1;
                    this.sound.play("hit", { volume: 1 });
                    this.scoreText.visible = false;
                    score += 100;
                    this.scoreText = this.add.text(this.scoreX, this.scoreY, score.toString(), { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
                    this.scoreText.visible = true; 
                    
                }
            }
        }

        // Enemy target bullets
        for (let i = 0; i < my.sprite.targets.length; i++)
        {
            var targetName = 'target' + (i + 1);
    
            this.bulletCooldownCounterEn--;
            if (this.bulletCooldownCounterEn < 0) {
                // Check for an available bullet
                for (let bulletEn of my.sprite.bulletEn) {
                    // If the bullet is invisible, it's available
                    if (!bulletEn.visible) {
                        //console.log("1")
                        
                        bulletEn.x = my.sprite[targetName].x;
                        bulletEn.y = my.sprite[targetName].y;
                        bulletEn.visible = true;
                        this.bulletCooldownCounterEn = this.bulletCooldownEn;
                        this.sound.play("enemy_shot", { volume: 0.5 });
                        break;    // Exit the loop, so we only activate one bullet at a time
                    }
                }
            } 
            
            for (let bulletEn of my.sprite.bulletEn) {
                // if the bullet is visibile it's active, so move it
                if (bulletEn.visible) {
                    bulletEn.y += this.bulletSpeedEn;
                }
                // Did the bullet move offscreen? If so,
                // make it inactive (make it invisible)
                // This allows us to re-use bullet sprites
                if (bulletEn.y >= this.height) {
                    bulletEn.visible = false;
                }
            }  
        } 




        // Player bullet
        this.bulletCooldownCounter--;
        if (this.space.isDown) {
            if (this.bulletCooldownCounter < 0) {
                // Check for an available bullet
                for (let bullet of my.sprite.bullet) {
                    // If the bullet is invisible, it's available
                    if (!bullet.visible) {
                        bullet.x = my.sprite.ship.x;
                        bullet.y = my.sprite.ship.y - bullet.displayHeight;
                        bullet.visible = true;
                        this.bulletCooldownCounter = this.bulletCooldown;
                        this.sound.play("player_shot", { volume: 0.5 });
                        break;    // Exit the loop, so we only activate one bullet at a time
                    }
                }
            }
            
        }

        for (let bullet of my.sprite.bullet) {
            // if the bullet is visibile it's active, so move it
            if (bullet.visible) {
                bullet.y -= this.bulletSpeed;
            }
            // Did the bullet move offscreen? If so,
            // make it inactive (make it invisible)
            // This allows us to re-use bullet sprites
            if (bullet.y < -(bullet.displayHeight/2)) {
                bullet.visible = false;
            }
        }
        



        if (Phaser.Input.Keyboard.JustDown(this.S)) {
            score += 1000;
            this.scene.start("nextLevel");

        }

        // if (my.sprite.targets.length == this.goneCounter) {
        //     score += 1000;
        //     this.scene.start("nextLevel");
        // }

        // This is to update score DON'T DELETE

        // this.scoreText.visible = false;
        // this.score += 10;
        // this.scoreText = this.add.text(this.scoreX, this.scoreY, this.score.toString(), { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
        // this.scoreText.visible = true;

        // if (Phaser.Input.Keyboard.JustDown(RKey)) {
        //     my.sprite.ship = this.add.sprite(this.shipX, this.shipY, "ship");
        //     my.sprite.ship.setScale(2);
    
    
        // }


    }
}
