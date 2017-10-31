let Util = {

};
Util.title = function (title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};
Util.test = function (title) {
    return title;
};

Util.newGuid = function() {
    var arr = "";
    var i = 32;

    while(i--) {
        arr += Math.floor(Math.random()*16.0).toString(16);
    }

    var g = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20,32);

    g = g.replace(/,/g, "");

    return g;
};

export default Util;