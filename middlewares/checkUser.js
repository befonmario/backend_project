const checkUser = (req, res, next) => {
    const loggedInUser = req.user.name;
    const requestedUser = req.params.name;
    if (loggedInUser !== requestedUser) {
        return res.status(403).send({ message: "Forbidden" }); 
    }
    next(); 
};

export default checkUser;