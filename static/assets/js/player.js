const PlayerImages = {
    Up: ["up-01.png", "up-02.png"],
    Down: ["down-00.png", "down-01.png", "down-02.png"],
    Left: ["left-01.png", "left-02.png"], 
    Right: ["right-01.png", "right-02.png"],
    Dead: "death.jpg"
}


class Player {
    constructor() {
        const container = document.querySelector('.container')
        this.image = document.createElement('img')
        this.image.classList.add('player')
        this.image.src = PlayerImages.Down[0]
        container.appendChild(this.image)
        this.lifesCounter = 3
    }

    moveDown() {
        PlayerPosition = this.image.getBoundingClientRect()
        GameContainer = document.querySelector('.container')
        GamePosition = GameContainer.getBoundingClientRect()
        this.image.style.top = parseInt(this.image.style.top) + 2 + 'vh'
    }
    //methods :
    // moves (up, down, right, left)
    // die()
    //gameOVer()
}

