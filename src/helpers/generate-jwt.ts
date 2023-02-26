import jwt from 'jsonwebtoken';

export const generateJWT = (uuid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uuid };
        jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: '4d',
        }, (err, token) => {
            if (err) {
                reject('Token could not generate');
            } else {
                resolve(token);
            }
        });
    });
}
