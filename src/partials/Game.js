import {SVG_NS, KEYS} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element);

		// Other code goes here...
		this.board = new Board(this.width, this.height);
		this.ball = new Ball (8, this.width, this.height);
		// this.ball2 = new Ball (2, this.width, this.height);
		// this.ball3 = new Ball (3, this.width, this.height);
		// this.ball4 = new Ball (4, this.width, this.height);
		// this.ball5 = new Ball (5, this.width, this.height);
		// this.ball6 = new Ball (6, this.width, this.height);
		// this.ball7 = new Ball (7, this.width, this.height);
		// this.ball8 = new Ball (8, this.width, this.height);
		
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.width-this.boardGap-10,
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down
		);

		document.addEventListener('keydown', event => {
            switch (event.key) {
                case KEYS.spaceBar:

                this.pause = !this.pause;
                break;
            }
        });
	}

	render() {
		// More code goes here...
		if (this.pause) {
            return;
        }

		this.gameElement.innerHTML ='';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		
		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg);
		
		this.gameElement.appendChild(svg);

	}

}