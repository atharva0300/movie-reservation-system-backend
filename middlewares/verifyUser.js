

const verifyUser = (req , res , next) => {
    const role = req.role
    if(role != 'user') return res.sendStatus(401);  // forbidden
    next()
}

module.exports = verifyUser;