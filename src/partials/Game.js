import {SVG_NS, KEYS} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element);

		// Other code goes here...
		this.board = new Board(this.width, this.height);
		this.ball = new Ball (8, this.width, this.height);
		this.BGM1 = new Audio ('../public/sounds/Juhani Junkala [Retro Game Music Pack] Level 1.wav')
		this.BGM2 = new Audio ('../public/sounds/Juhani Junkala [Retro Game Music Pack] Level 2.wav')
		this.BGM3 = new Audio ('../public/sounds/Juhani Junkala [Retro Game Music Pack] Level 3.wav')
		this.BGM4 = new Audio ('../public/sounds/Juhani Junkala [Retro Game Music Pack] Ending.wav')
		this.winState = new Audio ('../public/sounds/Juhani Junkala [Retro Game Music Pack] Title Screen.wav')

		
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
			KEYS.z,
			'player1'
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.width-this.boardGap-10,
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down,
			'player2'
		);

		document.addEventListener('keydown', event => {
            switch (event.key) {
                case KEYS.spaceBar:

				this.pause = !this.pause;
				this.BGM1.pause();
				this.BGM2.pause();
				this.BGM3.pause();
				this.winState.pause();
				break;
				
            }
		});

		this.score1 = new Score(this.width/2 - 50, 30, 30);
		
		this.score2 = new Score(this.width/2 + 25, 30, 30);
	}

	render() {
		// More code goes here...
		if (this.pause) {
			this.BGM4.play();
			return;
		} else {
			this.BGM4.pause();
		}

		if (this.player1.score < 11 && this.player1.score >= 9 && this.player1.score > this.player2.score ) {
			this.BGM1.pause();
			this.BGM2.play();			
		}
		else if (this.player2.score < 11 && this.player2.score >= 9 && this.player1.score < this.player2.score ) {
			this.BGM1.pause();
			this.BGM3.play();	
		}

		if (this.player1.score === 11) {
			alert('Player 1 wins!');
			this.pause = true;
			this.winState.play();
		}
		else if (this.player2.score === 11) {
			alert('Player 2 wins!');
			this.pause = true;
			this.winState.play();

		}



		
		this.gameElement.innerHTML ='';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.BGM1.play();
		
		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);

		this.gameElement.appendChild(svg);

	}

}