import {SVG_NS} from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;
        //   this.color = color;

        //constructor start
        document.addEventListener('keydown', event => {
            switch (event.key) {
                case up:
                    this.up();
                    break;
                case down:
                    this.down();
                    break;
            }
        });
    }//constructor end

        //constructor start 

        up() {
            console.log('Up');
            this.y = this.y - this.speed;
        }

        down() {
            console.log('Down');
            this.y = this.y + this.speed;
        }



    //...
    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'fill', 'white');
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);

        svg.appendChild(rect);

    }
}