const PlayerImages = {
    Up: ["up-01.png", "up-02.png"],
    Down: ["down-00.png", "down-01.png", "down-02.png"],
    Left: ["left-01.png", "left-02.png"],
    Right: ["right-01.png", "right-02.png"],
    Dead: "death.jpg"
}


class Player {
    constructor(container) {
        this.game = container;
        this.player = document.createElement('img')
        this.player.classList.add('player')
        this.player.src = `/static/assets/img/player/${PlayerImages.Down[0]}`;
        let pos = container.getBoundingClientRect();
        this.player.style.left = pos.left + 'px';
        this.player.style.top = pos.top + 'px';
        this.speed = container.querySelector('.elem').getBoundingClientRect().width;
        container.appendChild(this.player)
        this.lifesCounter = 3
    }

    can_move() {
        let MoveTo = []
        let elems = this.game.querySelectorAll(".elem");
        let playerPos = this.player.getBoundingClientRect()
        let ContainerPosition = this.game.getBoundingClientRect();
        let boxsize = playerPos.right - playerPos.left
        let Top = (playerPos.top - ContainerPosition.top) / boxsize;
        let Left = (playerPos.left - ContainerPosition.left) / boxsize;
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

    Move(direction) {
        let pos = this.player.getBoundingClientRect();
        if (this.can_move().includes(direction)) {
            switch (direction) {
                case 'up':
                    this.player.style.top = pos.top - this.speed + 'px';
                    break;
                case 'down':
                    this.player.style.top = pos.top + this.speed + 'px';
                    break;

                case 'left':
                    this.player.style.left = pos.left - this.speed + 'px';
                    break;
                case 'right':
                    this.player.style.left = pos.left + this.speed + 'px';
                    break;
                default:
                    break;
            }
        }
    }

    //methods :
    // moves (up, down, right, left)
    // die()
    //gameOVer()
}

export { Player, PlayerImages }
