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
    const { limit } = req.query;
    const userLength = !isNaN(limit) ? limit : users.length;
    res.status(200).json(users.slice(0, userLength))
};

module.exports.getARandomUser = (req, res) => {
    const random = users[Math.floor(Math.random() * users.length)];
    res.status(200).send(random);
}

module.exports.saveAUser = (req, res) => {
    users.push(req.body);
    const myUsers = JSON.stringify(users);
    fs.writeFile("./public/fake.json", myUsers, (error) => {
        if (error) {
            res.status(500).json({ message: "internal error" });
            res.end()
        } else {
            res.status(201).json({ message: "user created" });
            res.end()
        }
    });
    // res.status(200).send(users);

};

module.exports.updateAUser = (req, res) => {
    const { id } = req.body;
    const newUser = users.find(user => user.id === Number(id));
    newUser.id = Number(id);
    newUser.gender = req.body.gender;
    newUser.name = req.body.name;
    newUser.contact = req.body.contact;
    newUser.address = req.body.address;
    newUser.photoUrl = req.body.photoUrl;
    const myUsers = JSON.stringify([users, newUser]);
    fs.writeFile("./public/fake.json", myUsers, (error) => {
        if (error) {
            res.status(500).json({ message: "internal error" });
            res.end()
        } else {
            res.status(201).json({ message: "user updated" });
            res.end()
        }
    });
    // res.status(200).send(newUser);
};
module.exports.updateMultipleUsers = (req, res) => {
    const error = req.error;
    const updateData = req.body;
    if (!error) {

        for (const updateInfo of updateData) {
            const updateIndex = users?.findIndex(
                (user) => user.id == updateInfo.id
            );
            const updateDataIndex = updateData?.findIndex(
                (user) => user.id == updateInfo.id
            );
            if (updateIndex > -1) {
                users[updateIndex] = {
                    ...users[updateIndex],
                    ...updateData[updateDataIndex],
                };
                fs.writeFile(
                    "./public/fake.json",
                    JSON.stringify(users),
                    (error) => {
                        if (error) {
                            res.status(500).json({ message: "internal error" });
                        } else {
                            res.status(201).json({ message: "users Updated" });
                        }
                    }
                );
            } else {
                res.status(400).json({ error: "please provide info" });
            }
            console.log(users);
        }
    }
    if (error) {
        res.status(400).json({ error: "please provide info" });
    }
};



module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id !== Number(id));
    const myUsers = JSON.stringify(users);
    fs.writeFile("./public/fake.json", myUsers, (error) => {
        if (error) {
            res.status(500).json({ message: "internal error" });
            res.end()
        } else {
            res.status(201).json({ message: "user deleted" });
            res.end()
        }
    });
    // res.status(200).send(users);
};