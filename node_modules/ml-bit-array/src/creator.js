// auxiliary file to create the 256 look at table elements

var ans = new Array(256);
for (var i = 0; i < 256; i++) {
    var num = i;
    var c = 0;
    while (num) {
        num = num & (num - 1);
        c++;
    }
    ans[i] = c;
}

module.exports = ans;