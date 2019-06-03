var stdin = process.openStdin();
const parser = require('./output/parser');

stdin.addListener("data", function (d) {
    var query = d.toString().trim();
    var result = parser.parse(query);
    console.log(JSON.stringify(result));
});