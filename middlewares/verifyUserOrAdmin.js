

const verifyUserOrAdmin = (req , res , next) => {
    console.log('inside verify User or Admin')
    const role = req.role
    console.log('role : ' , role)
    if(role != 'user' && role!='admin' ) return res.sendStatus(401);  // forbidden
    next();
}

module.exports = verifyUserOrAdmin;