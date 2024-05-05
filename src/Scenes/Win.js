class Win extends Phaser.Scene {
    constructor() {
        super('Win');
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

        this.scoreTitle = this.add.text(300, 200, "You Win!", { fontFamily: 'Arial', fontSize: 100, color: '#ffffff' });
        this.scoreTitle = this.add.text(200, 350, "Final Score:", { fontFamily: 'Arial', fontSize: 80, color: '#ffffff' });

        this.scoreTitle = this.add.text(185, 500, "Press R to Restart", { fontFamily: 'Arial', fontSize: 80, color: '#ffffff' });
        if (score < 0) { 
            this.scoreText = this.add.text(650, 350, score.toString(), { fontFamily: 'Arial', fontSize: 80, color: '#FF0000' });
        }
        
        if (score > 0) { 
            this.scoreText = this.add.text(650, 350, score.toString(), { fontFamily: 'Arial', fontSize: 80, color: '#00FF00' });
        }

        this.RKey = this.input.keyboard.addKey("R")

        document.getElementById('description').innerHTML = '<h2>Win.js</h2>';
    }

    update() {
        let my = this.my;

        if (Phaser.Input.Keyboard.JustDown(this.RKey)){ 
            let my = this.my;
            this.scene.start("Title");
            
        }
    }
}  