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
