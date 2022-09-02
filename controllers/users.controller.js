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

module.exports.getARandomUser = (req, res) => {
    const random = users[Math.floor(Math.random() * users.length)];
    res.status(200).send(random);
}

module.exports.saveAUser = (req, res) => {
    users.push(req.body);
    res.status(200).send(users);
};

// module.exports.updateAUser = (req, res) => {
//     const { id } = req.params;
//     const newUser = users.find(user => user.id === Number(id));

//     newUser.id = id;
//     newUser.gender = req.body.gender;
//     newUser.name = req.body.name;
//     newUser.contact = req.body.contact;
//     newUser.address = req.body.address;
//     newUser.photoUrl = req.body.photoUrl;

//     res.status(200).send(newUser);

// };

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id !== Number(id));
    res.status(200).send(users);
};