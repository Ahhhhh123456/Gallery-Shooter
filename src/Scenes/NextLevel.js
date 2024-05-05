class NextLevel extends Phaser.Scene {
    constructor() {
        super('nextLevel');
        this.my = {sprite: {}};
        this.width = config.width;
        this.height = config.height;
        this.countDown = 25;        // Number of update() calls to wait before making a new bullet
        this.countDownCounter = 25;
        this.scoreX = this.width/2;
        this.scoreY = 200;
        this.score = 3;


    }

    create() {
        let my = this.my;

        this.score = 3;
        this.scoreTitle = this.add.text(75, 100, "Wave 2 Starting In:", { fontFamily: 'Arial', fontSize: 100, color: '#ffffff' });
        this.scoreText = this.add.text(475, 250, this.score.toString(), { fontFamily: 'Arial', fontSize: 100, color: '#ffffff' });
        document.getElementById('description').innerHTML = '<h2>NextLevel.js</h2>';
    }

    update() {
        let my = this.my;

        this.countDownCounter -= 1;
        if(this.countDownCounter == 0) {
            
            this.countDownCounter = this.countDown;
            this.scoreText.visible = false;
            this.score -= 1;
            this.scoreText = this.scoreText = this.add.text(475, 250, this.score.toString(), { fontFamily: 'Arial', fontSize: 100, color: '#ffffff' });
            this.scoreText.visible = true;
            
        }

        if (this.score == -1) {
            this.scoreText.visible = false;
            this.scene.start("Wave2"); 
        }

    }
}        