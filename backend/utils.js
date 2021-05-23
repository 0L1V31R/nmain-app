import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, 
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
    {
        expiresIn: '30d',
    }
    );
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
            if (err) {
                res.status(401).send({message: 'Token Inválido'});
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({message: 'Sem Token'});
    }
};