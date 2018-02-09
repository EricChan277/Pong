import {
    SVG_NS,
    KEYS
} from '../settings';
export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;

        this.reset();
    }


    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        //ball movement 
        this.vy = 0;
        while (this.vy === 0) { //this loop is so that the ball doesent recieve the number 0, allowing it to never stop moving
            this.vy = Math.floor(Math.random() * 10 - 5);
            this.vx = this.direction * (6 - Math.abs(this.vy));
        }
    }

    //declaring the wall collision 
    wallCollision() {
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;


        if (hitTop || hitBottom) {
            this.vy = -this.vy
        } else if (hitLeft || hitRight) {
            // this.reset();
            this.vx = -this.vx;
        }
    }

    render(svg) {

        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'fill', 'white');
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);

        svg.appendChild(circle);




    }

}