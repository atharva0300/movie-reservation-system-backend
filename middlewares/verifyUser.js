

const verifyUser = (req , res , next) => {
    console.log('inside verify User')
    const role = req.role
    console.log('role : ' , role)
    if(role != 'user') return res.sendStatus(401);  // forbidden
    next()
}

module.exports = verifyUser;