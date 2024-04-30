import jwt from 'jsonwebtoken';
import roleAccess from './roleAccess.js';

const authJwt = (req, res, next) => {
    const token = req.headers['authorization']?.replace("Bearer ", "");
    console.log(token);
    if (!token) {
        throw new Error('missing_token')
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).send({ message: 'Invalid Token' });
        }

        // Tambah properti name ke dalam objek decoded
        const { userId, role, name } = decoded;
        decoded.name = name;

        req.userId = userId;

        if (!roleAccess(role, req.baseUrl)) {
            return res.status(403).json({ message: "unauthorized access" });
        }
        
        req.user = decoded; // Menyimpan informasi pengguna pada request
        next();
    });
};

export default authJwt;
