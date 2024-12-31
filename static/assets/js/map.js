export function create_map(game_container) {
    let count = 0;
    game_container.classList.add('container');
    for (let y = 0; y < 11; y++) {
        for (let x = 0; x < 21; x++) {
            var elem = document.createElement("div");
            elem.classList.add('elem');
            game_container.appendChild(elem);
            count++
            if (y % 2 == 1 && x % 2 == 1) {
                elem.classList.add('wall');
            } else if (Math.random() < 0.4 && (y > 1 || x > 1)) {
                elem.classList.add('box');
            } else {
                elem.classList.add('grass');
            }
        }
    }
    document.body.appendChild(game_container);    
}