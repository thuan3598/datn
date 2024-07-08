import db from "../models/index";
import CRUDService from "../services/CRUDService";
import { Sequelize } from "sequelize";

let getHomePage = async (req, res) => {
  try {
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Tháng trong JavaScript tính từ 0-11, cần +1 để phù hợp với SQL
    let day = currentDate.getDate();
    let hour = currentDate.getHours();

    let data = await db.data.findAll({
      // where: Sequelize.where(Sequelize.fn('HOUR', Sequelize.col('updatedAt')), 2)
      where: {
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("updatedAt")),
            year
          ),
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("updatedAt")),
            month
          ),
          Sequelize.where(Sequelize.fn("DAY", Sequelize.col("updatedAt")), day),
          Sequelize.where(
            Sequelize.fn("HOUR", Sequelize.col("updatedAt")),
            hour
          ),
          { id_location: 1 },
        ],
      },
    });

    // if(!data){
    //   return res.render("homepage.ejs", {
    //     data: {pm25:'0',pm10:'0',temp:'0',humi:'0',co2:'0',aqi:'0'},
    //   });
    // }

    return res.render("homepage.ejs", {
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

let getAll = async (req, res) => {
  try {
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Tháng trong JavaScript tính từ 0-11, cần +1 để phù hợp với SQL
    let day = currentDate.getDate();
    let hour = currentDate.getHours();

    let data = await db.data.findAll({
      // where: Sequelize.where(Sequelize.fn('HOUR', Sequelize.col('updatedAt')), 2)
      where: {
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("updatedAt")),
            year
          ),
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("updatedAt")),
            month
          ),
          Sequelize.where(Sequelize.fn("DAY", Sequelize.col("updatedAt")), day),
          Sequelize.where(
            Sequelize.fn("HOUR", Sequelize.col("updatedAt")),
            hour
          ),
        ],
      },
    });

    return res.json({ data });
  } catch (e) {
    console.log(e);
  }
};

let getLocations = async (req, res) => {
  try {
    let data = await db.locations.findAll();
    return res.json({ data });
  } catch (e) {
    console.log(e);
  }
};

let getByHourToday = async (req, res) => {
  try {
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Tháng trong JavaScript tính từ 0-11, cần +1 để phù hợp với SQL
    let day = currentDate.getDate();

    let data = await db.data.findAll({
      where: {
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("updatedAt")),
            year
          ),
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("updatedAt")),
            month
          ),
          Sequelize.where(Sequelize.fn("DAY", Sequelize.col("updatedAt")), day),
          // Sequelize.where(
          //   Sequelize.fn("HOUR", Sequelize.col("updatedAt")),
          //   hour
          // ),
          { id_location: 1 },
        ],
      },
    });
    return res.json({
      data,
    });
  } catch (e) {
    console.log(e);
  }
};

let getAqiCalculator = async (req, res) => {
  return res.render("AQICalculator.ejs");
};

let getAqiBasic = async (req, res) => {
  return res.render("AQIBasic.ejs");
};











let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", { dataTable: data });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);

    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("Users not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body; //Lấy toàn bộ input trong thẻ body
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("Delete user successfully");
  } else {
    return res.send("User not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
  getAll: getAll,
  getLocations: getLocations,
  getByHourToday: getByHourToday,
  getAqiCalculator: getAqiCalculator,
  getAqiBasic: getAqiBasic,
};
