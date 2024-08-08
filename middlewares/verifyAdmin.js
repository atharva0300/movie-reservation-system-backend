

const verifyAdmin = (req , res , next) => {
    console.log('inside veridy Admin')
    const role = req.role
    console.log('role : ' , role)
    if(role != 'admin') return res.sendStatus(401);  // forbidden
    next()
}

module.exports = verifyAdmin