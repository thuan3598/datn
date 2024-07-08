import userService from "../services/userService";

let handleLogin=async(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;

    if(!email||!password){
        return res.status(500).json({
            errCode:1,
            message:'Missing inputs parameter!'
        })
    }

    let userData=await userService.handleUserLogin(email,password);

    return res.status(200).json({
       errCode:userData.errCode,
       message:userData.errMessage,
       user:userData.user?userData.user:{}
    })
};

let handleGetAllUsers=async(req,res)=>{
    let id=req.query.id;//All or id
    let users=await userService.getAllUsers(id);
    if(!id){
        return res.status(200).json({
            errCode:1,
            message:'Missing requrired parameters',
            users
         })
    }
    return res.status(200).json({
        errCode:0,
        message:'OK',
        users
     })
}

let handleCreateNewUser=async(req,res)=>{
    let message=await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

module.exports ={
    handleLogin :handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUser:handleCreateNewUser
}