let RKey;
class Title extends Phaser.Scene {
    constructor() {
        super('Title');
        this.my = {sprite: {}};
        this.width = config.width;
        this.height = config.height;
        this.countDown = 25;        // Number of update() calls to wait before making a new bullet
        this.countDownCounter = 25;
        this.scoreX = this.width/2;
        this.scoreY = 200;


    }

    preload() {
        this.load.setPath("./assets/");

        this.load.atlasXML("targets", "spritesheet_objects.png", "spritesheet_objects.xml");
        this.load.atlasXML("huds", "spritesheet_hud.png", "spritesheet_hud.xml");

        // Player Ship
        this.load.image("ship", "ship_0000.png");
        this.load.audio("player_shot", "laserSmall_004.ogg");
        this.load.audio("enemy_shot", "laserSmall_003.ogg");
        this.load.audio("player_dead", "explosionCrunch_004.ogg");
        this.load.audio("hit", "impactMetal_004.ogg" );
    }

    create() {
        let my = this.my;

        this.scoreTitle = this.add.text(150, 200, "Gallery Shooter", { fontFamily: 'Arial', fontSize: 100, color: '#ffffff' });
        this.scoreTitle = this.add.text(150, 450, "Press Enter to Start", { fontFamily: 'Arial', fontSize: 80, color: '#ffffff' });
        this.enter = this.input.keyboard.addKey("ENTER")

        document.getElementById('description').innerHTML = '<h2>Title.js</h2>';
    }

    

    update() {
        
            // Call the resetGame method of the "Wave1" scene
            

        let my = this.my;

        if (Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.scene.start("Wave1");

        }
    }
}  