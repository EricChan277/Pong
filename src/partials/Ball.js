import {SVG_NS} from '../settings';
export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;

        this.ping = new Audio('./public/sounds/pong-01.wav')
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

    goal(player){
        player.score++;
        this.reset();
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
            this.vx = -this.vx;
        }
    }

    paddleCollision(player1, player2) { //checking for paddle collision
        if (this.vx > 0) {
          let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
          let [leftX, rightX, topY, bottomY ] = paddle;

          if (
              (this.x + this.radius >= leftX) 
              && (this.x + this.radius <= rightX)
              && (this.y >= topY)
              && (this.y <= bottomY)
            )
            {
                  this.vx = -this.vx;
                  this.ping.play();
            }
        
        } else {
            let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
            let [leftX, rightX, topY, bottomY ] = paddle;
           
            if (
                (this.x - this.radius >= leftX) 
                && (this.x - this.radius <= rightX)
                && (this.y >= topY)
                && (this.y <= bottomY)
              )
              {
                    this.vx = -this.vx;
                    this.ping.play();
              }
        }
      }

    render(svg, player1, player2) {

        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();
        this.paddleCollision(player1, player2);

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'fill', 'white');
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);

        svg.appendChild(circle);

        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;
        if (rightGoal) {
            this.goal(player1);
            this.direction = -1;
        } else if (leftGoal) 
        {
            this.goal(player2);
            this.direction = 1;
        }

        




    }

}