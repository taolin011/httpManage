export const formatDate24 = (theDate) => {
    var now = new Date(theDate);
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var h = now.getHours();
    var mm = now.getMinutes();

    h = h < 10 ? "0" + h : h;
    d = d < 10 ? "0" + d : d;
    m = m < 10 ? "0" + m : m;
    mm = mm < 10 ? "0" + mm : mm;
    var xy = y + "/" + m + "/" + d + " " + h + ":" + mm;
    return xy;
};