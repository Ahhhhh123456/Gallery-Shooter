
class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
        this.my = {sprite: {}};
        this.width = config.width;
        this.height = config.height;
        this.countDown = 25;        // Number of update() calls to wait before making a new bullet
        this.countDownCounter = 25;
        this.scoreX = this.width/2;
        this.scoreY = 200;


    }

    create() {
        let my = this.my;

        my.sprite.over = this.add.sprite(500, 250, "huds", "text_gameover.png");
        my.sprite.over.setScale(2);
        this.scoreTitle = this.add.text(200, 350, "Final Score:", { fontFamily: 'Arial', fontSize: 80, color: '#ffffff' });
       
        if (score < 0) { 
            this.scoreText = this.add.text(650, 350, score.toString(), { fontFamily: 'Arial', fontSize: 80, color: '#FF0000' });
        }
        
        if (score > 0) { 
            this.scoreText = this.add.text(650, 350, score.toString(), { fontFamily: 'Arial', fontSize: 80, color: '#00FF00' });
        }

        this.scoreTitle = this.add.text(175, 500, "Press R to Restart", { fontFamily: 'Arial', fontSize: 80, color: '#ffffff' });

        RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        document.getElementById('description').innerHTML = '<h2>GameOver.js</h2>';
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(RKey)){ 
            let my = this.my;
            this.scene.start("Title");
            
        }

    }
}  