

const verifyUserOrAdmin = (req , res , next) => {
    const role = req.role
    if(role != 'user' && role!='admin' ) return res.sendStatus(401);  // forbidden
    next();
}

module.exports = verifyUserOrAdmin;