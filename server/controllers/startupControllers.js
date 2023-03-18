const Startup = require("../models/Startup");
const User = require("../models/User");

const addMembersToStartup = async (req, res) => {
  // post request, add members to startup, get body from request and create a new member for the startup, and add it.

  const { startupId, userId } = req.body;
  // Search the database for the startup with the id and the user
  const reqUser = User.findById(userId);
  const startup = Startup.findById(startupId);
  // startup.create
};

const createPost = async (req, res) => {};

const manageStartupStaff = async (req, res) => {};

const getMonthlyNumOfUsers = async (req, res) => {};
