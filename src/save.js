class Save {
    static settings = {sounds: 0, musics: 0};

    static generateSaveObject() {
        // 
    }
    static loadSaveObject() {
        // 
    }

    static save(obj) {
        localStorage.setItem('save', JSON.stringify(obj));
    }
    static load() {
        return JSON.parse(localStorage.getItem('save'));
    }
}