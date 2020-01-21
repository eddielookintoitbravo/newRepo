export default class Paddle {
    constructor(gameWidth, gameHeight) {
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.width = 150;
        this.height = 30;
        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 15,
        }
        this.speed = 0;
        this.maxSpeed = 5;
    }
    draw(c) {
        c.fillStyle = 'purple';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }
    moveRightConst(c, dt, dx) {
        c.clearRect(0, 0, this.gameWidth, this.gameHeight)
        this.position.x += dx / dt;
        if (this.position.x + this.width >= this.gameWidth) {
            this.position.x = this.gameWidth - this.width
        }
        this.draw(c);
    }
    update(c) {
        c.clearRect(0, 0, this.gameWidth, this.gameHeight)
        if (this.position.x <= 0) {
            this.speed = this.maxSpeed;
        }
        if (this.position.x + this.width >= this.gameWidth) {
            this.speed = -this.maxSpeed;
        }
        this.position.x += this.speed;
        this.draw(c);
    }
}