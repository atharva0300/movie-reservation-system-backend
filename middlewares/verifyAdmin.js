

const verifyAdmin = (req , res , next) => {
    const role = req.role
    if(role != 'admin') return res.sendStatus(401);  // forbidden
    next()
}

module.exports = verifyAdmin