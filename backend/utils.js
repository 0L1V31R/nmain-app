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