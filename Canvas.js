
class CanvasObject {
    constructor(x, y, ctx = null) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.strokeStyle = '#510aa0';
        this.lineWidth = '1'

    }

    draw = (t) => { return t }
}

class Square extends CanvasObject {
    constructor(x, y, w, h) {
        super(x, y);
        this.w = w;
        this.h = h;
    }

    draw = (t) => {
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.stroke();
    }
}


class Circle extends CanvasObject {
    constructor(x, y, r, sA, eA) {
        super(x, y);
        this.r = r;
        this.sA = sA;
        this.eA = eA;
    }

    draw = (t) => {
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.x, this.y, this.r += 1, this.sA, this.eA);
        ctx.stroke();
    }
}

class CustomCircle extends CanvasObject {
    constructor(r, a, center, ctx) {
        super(r, a, ctx);
        this.r = r;
        this.a = a;
        this.uv = [r, a];
        this.v = [];
        this.squareSize = 1;
        this.center = center;
        this.energy = 10;
        this.acceleration = 100;
        this.ra = 10;
        this.generateCircle();
    }

    generateCircle() {
        const circle = []
        for (let t = 0; t < radiansToDegrees(Math.PI * 2); t += 1) {
            const vu = [this.ra, t];
            const vf = [this.uv[0] + (vu[0] * Math.cos(vu[1])), this.uv[1] + (vu[0] * (-1 * Math.sin(vu[1])))]
            circle.push(vf)
        }
        this.v.push(circle)
    }

    draw = (t) => {

        for (let i = 0; i < this.v.length; ++i) {
            const circle = this.v[i];
            for (let j = 0; j < circle.length; ++j) {
                const point = circle[j];
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.strokeStyle;
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.rect(point[0], point[1], this.squareSize, this.squareSize);
                this.ctx.stroke();
            }
        }


        if (this.energy > 0) {
            this.energy -= .1;
            this.ra += this.acceleration * this.energy / 100;

            if (this.ra >= Math.random() * (1000 - W) + W) {
                this.acceleration *= -1;
            }

            if (this.ra < 0) {
                this.acceleration *= -1;
            }

            this.generateCircle()

            // const lastCircle = this.v[this.v.length - 1];
            // const lastPoint = lastCircle[lastCircle.length - 1];
            // const leftHalf = lastCircle.filter(point => point[0] < this.x).sort((a,b )=> b[0] < a[0])
        
            // if (leftHalf[0][0] <= 0 || lastPoint[0] >= W ) {
            //     this.acceleration *= -1;
            // }

            this.v.shift();
        }
    }
}