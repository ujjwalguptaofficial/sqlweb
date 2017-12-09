window.__karma__.loaded = function () {};
window.onload = function () {
    initDb();
}

function onDbInit() {
    console.log('mocha test starting');
    window.__karma__.start();
}
