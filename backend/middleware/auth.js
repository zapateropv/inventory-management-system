import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
       return  res.status(401).json({
            message: "No access token"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN,(err, user) => {

            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired access token"
                });
            }

            req.user = user;
            next();
        }
    );
};