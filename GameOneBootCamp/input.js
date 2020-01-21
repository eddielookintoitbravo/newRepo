export default class Handler {
    constructor(paddle) {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;

                case 39:
                    paddle.moveRight();
                    break;
            }
        })
    }
}