const fs = require('fs');
let users;
fs.readFile('./public/fake.json', 'utf8', (err, data) => {
    if (err) {
        res.status(500).json({ err: "error" })
    }
    else {
        users = JSON.parse(data);
    }
});

module.exports.getAllUsers = (req, res) => {
    res.status(200).send(users);
};