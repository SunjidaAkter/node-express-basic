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

module.exports.uniqueIdValidation = (req, res, next) => {
    const { id } = req.body;
    const checkID = users.filter((data) => data.id == id);
    if (checkID.length !== 0) {
        res.status(400).json({ error: "user id already exists" });
        req.error = "error";

    } else {
        next();
    }
}
module.exports.uniqueParamsIdValidation = (req, res, next) => {
    const { id } = req.params;
    const _id = Number(id)
    const checkID = users.filter((data) => data.id === _id);
    console.log(checkID.length)
    if (checkID.length == 0) {
        res.status(400).json({ error: "user is already deleted" });
        req.error = "error";

    } else {
        next();
    }
}



module.exports.paramsIdValidation = (req, res, next) => {
    const { id } = req.params;
    const _id = Number(id);
    if (isNaN(_id)) {
        req.error = "error";
        res.status(400).json({ error: "please provide valide user id" });
        next();
    }
    if (!_id) {
        req.error = "error";
        res.status(400).json({ error: "please provide user id" });
        next();
    }
    if (_id && !isNaN(_id)) {

        const findUser = users.find((user) => user.id == _id);
        if (!findUser) {
            req.error = "error";
            res.status(404).json({ error: "user not found" });

        } else {
            next();
        }


    }
};
module.exports.IdValidation = (req, res, next) => {
    const { id } = req.body;
    const _id = Number(id);
    if (isNaN(_id)) {
        req.error = "error";
        res.status(400).json({ error: "please provide valide user id" });
        next();
    }
    if (!_id) {
        req.error = "error";
        res.status(400).json({ error: "please provide user id" });
        next();
    }
    if (_id && !isNaN(_id)) {

        const findUser = users.find((user) => user.id == _id);
        if (!findUser) {
            req.error = "error";
            res.status(404).json({ error: "user not found" });

        } else {
            next();
        }


    }
};

module.exports.userValidation = (req, res, next) => {
    const { id, gender, name, contact, address, photoUrl } = req.body || {};

    if (id && gender && name && contact && address && photoUrl) {
        next();
    } else {
        if (!id) {
            res.status(406).json({ error: "please enter user id" });
        }

        if (!gender) {
            res.status(406).json({ error: "please enter user gender" });
        }

        if (!name) {
            res.status(406).json({ error: "please enter user name" });
        }

        if (!contact) {
            res.status(406).json({ error: "please enter user contact" });
        }

        if (!address) {
            res.status(406).json({ error: "please enter user address" });
        }

        if (!photoUrl) {
            res.status(406).json({ error: "please enter user photoUrl" });
        }
        req.error = "error";

    }
};

module.exports.bodyValidation = (req, res, next) => {
    const userData = req.body;

    if (userData.length === 0 || !userData) {
        req.error = "error";
        console.log("error");
        res.status(400).json({ error: "please provide user info" });
        next();
    }

    userData?.map((user) => {
        if (!user.id) {
            req.error = "error";
            res.status(400).json({ error: "please provide user id" });
            next();
        }

        if (
            !user.gender &&
            !user.name &&
            !user.contact &&
            !user.address &&
            !user.photoUrl
        ) {
            req.error = "error";
            res.status(400).json({ error: "please provide user information" });
            next();
        }
    });

    if (!req.error) {
        next();
    }
};
