import { Enemy } from "/static/assets/js/monster.js";
import { create_map } from '/static/assets/js/map.js';
import { Player } from '/static/assets/js/player.js';


let game_container = document.createElement('div');

create_map(game_container);
let player = new Player(game_container);
let elems = game_container.querySelectorAll('.grass');
for (let i = 0; i < 3; i++) {
    let index = (Math.random() * elems.length).toFixed() % elems.length;
    const enemy = new Enemy(game_container, elems[index]);
    enemy.Randomize();
}

addEventListener('resize', () => {
    location.reload();
});

addEventListener('keydown', (e) => {
    if (!timeout) {
        switch (e.key) {
            case 'ArrowUp':
                player.Move('up');
                break;
            case 'ArrowDown':
                player.Move('down');
                break;
            case 'ArrowRight':
                player.Move('right');
                break;
            case 'ArrowLeft':
                player.Move('left');
                break;
        }
        var timeout = setTimeout(() => {
            timeout = undefined;
        }, 1100);
    }
})
