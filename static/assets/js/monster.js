let Counter = 0

export class Enemy {
    enemy;
    speed;
    live;
    game;
    target;
    constructor(container, box) {
        const pos = box.getBoundingClientRect();
        const enemy = document.createElement('img');
        this.enemy = enemy;
        this.game = container;
        this.speed = pos.width;
        console.log(this.speed);

        enemy.style.top = pos.top + 'px';
        enemy.style.left = pos.left + 'px';
        enemy.src = "/static/assets/img/enemies/down-1.png";
        enemy.classList.add('enemy');
        container.appendChild(enemy);
    }

    // move() {
    //     Counter++
    //     this.enemy.src = `/static/assets/img/enemies/down-${Counter}.png`
    //     if (Counter > 2) {
    //         Counter = 0 ;
    //         return
    //     }  
    //     requestAnimationFrame(this.move.bind(this))
    // }
    // animation
    Animation(direction, Counter) {
        Counter++;
        if (Counter/10%1 == 0){
            this.enemy.src = `/static/assets/img/enemies/${direction ? direction : 'down'}-${+Counter / 10 % 3 + 1}.png`;
        }
        if (Counter % 10 == 0) {
            let enemyPosition = this.enemy.getBoundingClientRect();
            switch (direction) {
                case 'up':
                    this.enemy.style.top = enemyPosition.top - this.speed/6 + 'px';
                    break;
                case 'down':
                    this.enemy.style.top = enemyPosition.top + this.speed/3 + 'px';
                    break;
                case 'left':
                    this.enemy.style.left = enemyPosition.left - this.speed/3 + 'px';
                    break;
                case 'right':
                    this.enemy.style.left = enemyPosition.left + this.speed/3 + 'px';
                    break;
                default:
                    break;
            }
        }
        if (Counter == 60) {
            Counter = 0;
            return;
        }
        requestAnimationFrame(this.Animation.bind(this, direction, Counter))
    }
    // can move Method
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
        setInterval(() => {
            let to = this.can_move();
            let index = (Math.random() * 10).toFixed() % to.length;
            window.requestAnimationFrame(this.Animation.bind(this, to[index], Counter));
        }, 800);
    }
}