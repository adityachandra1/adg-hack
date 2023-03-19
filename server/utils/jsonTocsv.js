const { Parser } = require('json2csv');

const getCSVfromJSON = (fields, data) => {
    const opts = { fields };
    try {
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        console.log(csv);
        return csv;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = { getCSVfromJSON };