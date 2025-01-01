let Counter = 0

export class Enemy {
    enemy;
    speed;
    live;
    game;
    target;
    direction;
    constructor(container, box) {
        const pos = box.getBoundingClientRect();
        const enemy = document.createElement('img');
        this.enemy = enemy;
        this.game = container;
        this.target = this.game.querySelector('.player');
        this.speed = pos.width;
        this.live = true;
        enemy.style.top = pos.top + 'px';
        enemy.style.left = pos.left + 'px';
        enemy.src = "/static/assets/img/enemies/down-1.png";
        enemy.classList.add('enemy');
        container.appendChild(enemy);
    }
    // Animate enemies
    Animation(direction, Counter) {
        if (Counter != 60) {
            Counter++;
            if (Counter / 10 % 1 == 0) {
                this.enemy.src = `/static/assets/img/enemies/down-${+Counter / 10 % 3 + 1}.png`;
            }
            requestAnimationFrame(this.Animation.bind(this, direction, Counter));
        }
        Counter = 0;
        return;
    }
    // enemies can move to any direction
    can_move() {
        let MoveTo = []
        let elems = this.game.querySelectorAll(".elem");
        let EnemyPos = this.enemy.getBoundingClientRect()
        let ContainerPosition = this.game.getBoundingClientRect();
        let boxsize = EnemyPos.right - EnemyPos.left
        let Top = (EnemyPos.top - ContainerPosition.top) / boxsize;
        let Left = (EnemyPos.left - ContainerPosition.left) / boxsize;
        let Pos = ((Top * 21) + Left).toFixed();
        if (+Pos % 21 != 20 && elems[+Pos + 1] && !(elems[+Pos + 1].classList.contains("wall") || elems[+Pos + 1].classList.contains("box"))) {
            MoveTo.push('right');
        }
        if (+Pos % 21 != 0 && elems[+Pos - 1] && !(elems[+Pos - 1].classList.contains("wall") || elems[+Pos - 1].classList.contains("box"))) {
            MoveTo.push('left');
        }
        if (+Pos / 21 != 1 && elems[+Pos - 21] && !(elems[+Pos - 21].classList.contains("wall") || elems[+Pos - 21].classList.contains("box"))) {
            MoveTo.push('up');
        }
        if (+Pos / 21 != 0 && elems[+Pos + 21] && !(elems[+Pos + 21].classList.contains("wall") || elems[+Pos + 21].classList.contains("box"))) {
            MoveTo.push('down');
        }
        return MoveTo;
    }
    // random movement
    Randomize() {
        let interval = setInterval(async () => {
            if (this.live) {
                let to = this.can_move();
                let index = (Math.random() * 10).toFixed() % to.length;
                let pos = this.enemy.getBoundingClientRect();
                if (to.includes(this.direction) && to.length <= 2) {
                    to[index] = this.direction;
                }
                this.direction = to[index];
                switch (to[index]) {
                    case 'up':
                        this.enemy.style.top = pos.top - this.speed + 'px';
                        break;
                    case 'down':
                        this.enemy.style.top = pos.top + this.speed + 'px';
                        break;

                    case 'left':
                        this.enemy.style.left = pos.left - this.speed + 'px';
                        break;
                    case 'right':
                        this.enemy.style.left = pos.left + this.speed + 'px';
                        break;
                    default:
                        break;
                }
                window.requestAnimationFrame(this.Animation.bind(this, to[index], Counter));
            } else {
                this.enemy.remove()
                clearInterval(interval);
            }
        }, 1100);
    }
}