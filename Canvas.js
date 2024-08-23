
class CanvasObject {
    constructor(x, y, ctx = null) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.strokeStyle = 'black';
        this.lineWidth = '2'

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
        this.acceleration = 10;
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

            if (this.ra >= 400) {
                this.acceleration *= -1;
            }

            if (this.ra < 0) {
                this.acceleration *= -1;
            }

            this.generateCircle()
            this.v.shift();
        }
    }
}