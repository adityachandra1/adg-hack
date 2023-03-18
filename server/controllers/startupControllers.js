const Startup = require("../models/Startup");
const User = require("../models/User");
const Post = require("../models/Post");
var mongoose = require("mongoose");

const registerStartup = async (req, res) => {
  // post request, register startup, get body from request and create a new startup, and add it.
  const { name, email, password, description } = req.body;
  var newStartup = new Startup({
    name,
    email,
    password,
    description,
  });
  newStartup.save(function (err, book) {
    if (err) return res.status(400).json({ message: err });
    console.log("Successfully saved to database");
  });
  return res.status(200).json({ message: "Startup created" });
};

const getAllStarutps = async (req, res) => {
  // get request, get all startups, return all startups.
  const startups = await Startup.find();
  res.status(200).json(startups);
};
const addMembersToStartup = async (req, res) => {
  // post request, add members to startup, get body from request and create a new member for the startup, and add it.
  const { startupId, userId } = req.body;
  // Search the database for the startup with the id and the user
  const reqUser = await User.findById(userId);
  const startup = await Startup.findById(startupId);
  // console.log(startup);
  // Update startup object and append user to users field.
  startup.staff.push(reqUser);
  // Save the updated startup object to the database.
  startup.save();
  // return response.
  res.status(200).json({ message: "User added to startup" });
};

const manageStartupStaff = async (req, res) => {
  // Get all users in a startup and deleting them if needed.
  // Get the startup id from the url
  const { startupId } = req.query;
  // After you get the startup, populate even the user field.
  const startup = await Startup.findById(startupId).populate("staff");
  res.status(200).json({ startup });
};

const getMonthlyNumOfUsers = async (req, res) => {
  const { startupId } = req.body;
  const startup = await Startup.findById(startupId);
  const numUsers = startup.numUsersPerMonth;
  res.status(200).json({ numUsers });
};

const deleteUserFromStartup = async (req, res) => {
  const { userId, startupId } = req.query;
  // remove the user from the startup after finding the startup.
  const deletedUser = await Startup.findByIdAndUpdate(
    startupId,
    { $pull: { staff: userId } },
    { new: true }
  );

  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted" });
};

const generatePDF = async (req, res) => {
  // Generate a PDF of the startup and send it to the user.
  const PDFDocument = require("pdfkit");

  // Get the startup name
  const { startupId } = req.body;
  const startup = await Startup.findById(startupId);
  const startupName = startup.name;

  const doc = new PDFDocument();
  var stream = doc.pipe(blobStream());
  doc.fontSize(25).text(`Startup : ${startupName} Report`, 50, 50);

  doc.image("image1.png", {
    fit: [250, 300],
    align: "center",
    valign: "center",
  });

  doc.image("image2.png", {
    fit: [250, 300],
    align: "center",
    valign: "center",
  });

  doc.text("Key Performance Indicators: ");

  doc.list([
    "Reduce Bounce Rate by 25%",
    "Increase Conversion Rate by 15%",
    "Increase click-through rate by 10%",
  ]);

  doc.text("Objectives and Key Results: ");

  doc.list([
    "Increase revenue by 20%",
    "Increase number of users by 10%",
    "Increase number of sales by 5%",
    "Raised $1M in funding",
  ]);

  doc.end();
  stream.on("finish", function () {
    var blob = stream.toBlob("application/pdf");
    saveAs(blob, "report.pdf");
  });
};

module.exports = {
  registerStartup,
  addMembersToStartup,
  manageStartupStaff,
  getMonthlyNumOfUsers,
  deleteUserFromStartup,
  generatePDF,
};
