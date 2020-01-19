window.onload = () => {
    function setBody() {
        const body = document.querySelector('body');
        body.style.cssText = `
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: purple; `
    }

    function createCanvas(w, h) {
        const canvas = document.createElement('canvas');
        canvas.className = 'canvas';
        Object.assign(canvas.style, {
            border: `1px solid black`,
            backgroundColor: `black`,
        })
        canvas.setAttribute('width', `${w}`);
        canvas.setAttribute('height', `${h}`)
        document.body.appendChild(canvas);
    }

    setBody();
    createCanvas(400, 400);

    const canvas = document.querySelector('.canvas');
    const c = canvas.getContext('2d');

    class Point {
        constructor(v, r, alpha) {
            this.r = r;
            this.alpha = alpha;
            this.v = v;
            this.coords = {
                x: this.v[0],
                y: this.v[1],
                z: this.v[2],
            };
            this.projMatrix = [
                [1, 0, 0],
                [0, 1, 0],
            ];
            this.vProj = {
                x: this.coords.x * this.projMatrix[0][0] + this.coords.y * this.projMatrix[0][1] + this.coords.z * this.projMatrix[0][2],
                y: this.coords.x * this.projMatrix[1][0] + this.coords.y * this.projMatrix[1][1] + this.coords.z * this.projMatrix[1][2]
            }
            this.updatedCoords = {
                x: this.vProj.x,
                y: this.vProj.y
            }
        }
        draw(color) {
            console.log(this.vProj)
            c.beginPath();
            c.translate(canvas.width / 2, canvas.height / 2);
            c.arc(this.updatedCoords.x, this.updatedCoords.y, this.r, 0, Math.PI * 2, false);
            c.translate(-canvas.width / 2, -canvas.height / 2);
            c.fillStyle = `${color}`;
            c.fill();
            c.closePath();
        }
        newPosZ() {
            const mZ = [
                [Math.cos(this.alpha), -Math.sin(this.alpha)],
                [Math.sin(this.alpha), Math.cos(this.alpha)]
            ]
            this.updatedCoords.x = this.vProj.x * mZ[0][0] + this.vProj.y * mZ[0][1];
            this.updatedCoords.y = this.vProj.x * mZ[1][0] + this.vProj.y * mZ[1][1];
            this.alpha += 0.01;
            this.draw('white');
        }
        newPosY() {
            const mY = [
                [Math.cos(this.alpha), 0],
                [0, 1]
            ]
            this.updatedCoords.x = this.vProj.x * mY[0][0] + this.vProj.y * mY[0][1];
            this.updatedCoords.y = this.vProj.x * mY[1][0] + this.vProj.y * mY[1][1];
            this.alpha += 0.07;
            this.draw('purple');
        }
        newPosX() {
            const mX = [
                [1, 0],
                [0, Math.cos(this.alpha)]
            ]
            this.updatedCoords.x = this.vProj.x * mX[0][0] + this.vProj.y * mX[0][1];
            this.updatedCoords.y = this.vProj.x * mX[1][0] + this.vProj.y * mX[1][1];
            this.alpha += 0.07;
            // this.draw('blue');
        }
    }

    const points = new Array(8);

    points[0] = new Point([0, 0, 0], 5, Math.PI / 4);
    points[1] = new Point([-50, -50, 50], 5, Math.PI / 4);
    points[2] = new Point([50, -50, 50], 5, Math.PI / 4);
    points[3] = new Point([50, 50, 50], 5, Math.PI / 4);
    points[4] = new Point([-50, 50, 50], 5, Math.PI / 4);
    points[5] = new Point([50, 50, -50], 5, 3 * Math.PI / 4);
    points[6] = new Point([-50, -50, -50], 5, 3 * Math.PI / 4);
    points[7] = new Point([-50, 50, -50], 5, 3 * Math.PI / 4);
    points[8] = new Point([50, -50, -50], 5, 3 * Math.PI / 4);

    function animate() {
        c.clearRect(0, 0, canvas.width, canvas.height)
        points.forEach((point, i) => {
            point.newPosY();
            // if (i > 1 && i < 5) {
            //     c.beginPath();
            //     c.translate(canvas.width / 2, canvas.height / 2);
            //     c.moveTo(points[i - 1].updatedCoords.x, points[i - 1].updatedCoords.y);
            //     c.lineTo(points[i].updatedCoords.x, points[i].updatedCoords.y);
            //     c.translate(-canvas.width / 2, -canvas.height / 2);
            //     c.strokeStyle = 'white'
            //     c.stroke();
            // }
            // if (i == 5) {
            //     c.beginPath();
            //     c.translate(canvas.width / 2, canvas.height / 2);
            //     c.moveTo(points[4].updatedCoords.x, points[4].updatedCoords.y);
            //     c.lineTo(points[1].updatedCoords.x, points[1].updatedCoords.y);
            //     c.translate(-canvas.width / 2, -canvas.height / 2);
            //     c.strokeStyle = 'white'
            //     c.stroke();
            // }
        })

        requestAnimationFrame(animate);
    }
    animate();
}