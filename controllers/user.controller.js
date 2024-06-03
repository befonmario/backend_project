import User from "../models/User.js";

export const findAll = (req, res) => {
    User.getAll((err, data) => {
        if(err) res.status(500).send({msg: "exist some error"})
        res.send(data)
    })
}

export const destroy = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if(err) {
            if(err.type== 'not_found'){
                res.status(404).send({
                    message: `not found student with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({msg: "exist some error"})
            }
        } else {
            res.send({msg: "record berhasil dihapus"})
        }
    })
}

export const findProfile = (req, res) => {
    const name = req.params.name;
    User.findByName(name, (err, data) => { 
        if (err) {
            if (err.type == 'not_found') {
                res.status(404).send({
                    message: `User not found with name: ${name}`
                });
            } else {
                res.status(500).send({ msg: "Error retrieving user profile" });
            }
        } else {
            res.send(data);
        }
    });
};

export const updateProfile = (req, res) => {
    const name = req.params.name;
    const newData = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email
    };
    User.findByName(name, (err, user) => {
        if (err) {
            if (err.type == 'not_found') {
                res.status(404).send({
                    message: `User not found with name: ${name}`
                });
            } else {
                res.status(500).send({ msg: "Error updating user profile" });
            }
        } else {
            User.updateProfile(user.id, newData, (err, data) => {
                if (err) {
                    if (err.type == 'not_found') {
                        res.status(404).send({
                            message: `User not found with id: ${user.id}`
                        });
                    } else {
                        res.status(500).send({ msg: "Error updating user profile" });
                    }
                } else {
                    res.send({ message: "User profile updated successfully" });
                }
            });
        }
    });
};
