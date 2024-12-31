import { Enemy } from "/static/assets/js/monster.js";
import { create_map } from '/static/assets/js/map.js';


let game_container = document.createElement('div');

function main() {
    create_map(game_container);
    addEventListener('resize', () => {
        location.reload();
    });
    let elems = game_container.querySelectorAll('.grass');
    for (let i = 0; i < 3; i++) {
        let index = (Math.random() * elems.length).toFixed() % elems.length;
        const enemy = new Enemy(game_container, elems[index]);
        enemy.Randomize();
    }
}

main()
