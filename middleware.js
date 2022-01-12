const User = require('./model/userModel') 

const authpermission = (permissions) =>{
    return async (req,res,next) => {
        const id="61dea0bea5ac9b3282ef104a"
        const userrole = await User.findById(id);
        // console.log("the role is"+ userrole)
        if (permissions.includes(userrole.role)){
            next()
        }else{
            return res.status(401).json("Sorry! you don't have permissions")
        }
    }
}

const authRole  = (role)=>{
    return (req,res,next)=>{
        if (req.user.role!==role){
            res.status(401)
            return res.send("not allowed!")
        }
        next()
    }
    }
    
    module.exports= {
        authRole,
        authpermission
    }