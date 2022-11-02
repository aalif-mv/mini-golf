const e_ui = document.getElementsByClassName('UI')[0];
function hideUI() {
    e_ui.style.opacity = '0';
    setTimeout(() => {e_ui.style.display = 'none'}, 600);
}
function showUI() {
    e_ui.style.opacity = '1';
    setTimeout(() => {e_ui.style.display = 'block'}, 600);
}

let page = 1;
const min_max = [1, 3]
const menu_levels = document.getElementsByClassName('menu_levels')[0];
function levelScroll(v) {
    if (page + v >= min_max[0] && page + v <= min_max[1]) {
        const p_page = document.getElementById('p' + page);
        document.getElementById('p' + page + '_m').style.color = 'gray';
        page += v;
        const c_page = document.getElementById('p' + page);
        document.getElementById('p' + page + '_m').style.color = 'black';
        p_page.style.display = 'none';
        c_page.style.display = 'grid';
    } else {
        toggleMenu('levels');
    }
}
function toggleMenu(name) {
    const menu = document.getElementsByClassName('menu_' + name)[0];
    if (menu.style.display == 'none') {
        menu.style.display = 'grid';
    } else {
        menu.style.display = 'none';
    }
}

const sliders = document.getElementsByClassName('slider');
function saveSettings() {
    Save.settings.sounds = sliders[0].value / 100;
    Save.settings.musics = sliders[1].value / 100;
}
