import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"], //   Chỉ lấy tên email và roleid
          where: { email: email },
          raw: true, //để user ở dạng object
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User is not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email isn't exist in your system. Please try other email!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes:{
            exclude:['password']
          }
        });
      } 
      if(userId&&userId!=='ALL') {
        users = await db.User.findOne({
          where: { id: userId },
          attributes:{
            exclude:['password']
          }
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};  

let createNewUser=(data)=>{
  return new Promise(async(resolve,reject)=>{
    try{
      let check=await checkUserEmail(data.email);
      if(check===true){
        resolve({
          errCode:1,
          message:"Your email is already in used"
        })
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phonenumber: data.phonenumber,
      });
      resolve({
        errCode:0,
        errMessage:'OK'
      });
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers: getAllUsers,
};
