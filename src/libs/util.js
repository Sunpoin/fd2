let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};
util.test = function (title) {
    return title;
};

export default util;