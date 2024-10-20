// Threaded Project - Chris Ferguson, Daryl Wang, Kazi Fattah, Taiwo AdeJoro
// Front End : Kazi & Taiwo
// Back End : Chris & Daryl


// ======================================================
// Randomly Generates our booking Number
// ======================================================
function makeBookingNo(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

// ======================================================
// Calls in our npm modules
// ======================================================
const express = require("express");
const sequelize = require("./utils/database");
const path = require("path");

// defines our
const app = express();
const port = 8000;

// =======================================================
// Sync Database
// =======================================================
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database Synced");
  })
  .catch((err) => console.error("Cant sync", err));

// =======================================================
// Imports our models for use with sequelize
// =======================================================
const Agency = require("./models/agency");
const Bookings = require("./models/bookings");
const Agents = require("./models/agents");
const Customers = require("./models/customers");
const Packages = require("./models/packages");
const TripTypes = require("./models/triptypes");
const Reviews = require("./models/reviews");
// =======================================================
// Sets our Root Directory
// =======================================================
const rootDir = path.dirname(require.main.filename);


// =======================================================
// Declares our static folders
// =======================================================
app.use(express.static(path.join(rootDir, "asset")));
app.use(express.static(path.join(rootDir, "views")));

app.use('/public', express.static('public'));

// =======================================================
// sets our view engine to ejs
// =======================================================
app.set("view engine", "ejs");

// =======================================================
// Allows parsing more info from our html
// =======================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//=========================================================
// endpoints
// =======================================================

/**=======================
 * !      Homepage  Endpoint
 *========================**/
app.get("/", async (req,res)=>{
  const packages = await Packages.findAll();
  res.render("homepage", { packages: packages, pageTitle: "Welcome to Travel Experts!" });
});

/**=======================
 * !      Agents Endpoints
 *========================**/

// Endpoint for displaying agents w/ agency information
app.get("/agents", async (req, res) => {
  
  const agents = await Agents.findAll();
  const agency = await Agency.findAll();
  res.render("agents", { agents: agents, agency: agency, pageTitle: "Contact one of our agents"  });
});

// Endpoint for editing all agents
app.get("/editagents", async (req, res) => {
  const agents = await Agents.findAll();
  console.log(agents);
  res.render("editagents", { agents: agents,  pageTitle: "Edit existing agent details"  });
});

// Ednpoint for editing specific agent
app.get("/agentedit/:id", async (req, res) => {
  // use find by pk to find by primary key
  // takes the id to search as a a parameter
  const agent = await Agents.findByPk(req.params.id);
  res.render("agentedit", { agent , pageTitle: "Agent Editing" });
});

//  Post for the update of an agent
app.post("/agentedit", async (req, res) => {
  const {AgentId, AgtFirstName, AgtMiddleInitial, AgtLastName, AgtBusPhone, AgtEmail, AgtPosition, AgencyID}=req.body;
  await Agents.update(
    { AgtFirstName, AgtMiddleInitial, AgtLastName, AgtBusPhone, AgtEmail, AgtPosition, AgencyID },
    {
      where: { AgentId: AgentId },
    }
  );
  res.redirect("/agents");
});

//  post for agent deletion
app.get("/agentdelete/:id", async (req, res) => {
  await Agents.destroy({ where: { AgentId: req.params.id } });
  res.redirect("/agents");
});

/**=======================
 * !      Packages Endpoints
 *========================**/

app.get("/packages", async (req, res) => {
  const packages = await Packages.findAll();
  const reviews = await Reviews.findAll();
  // Creates a current Date for turning older dates red, or not showing previously completed packages
  const currentDate = new Date();
  res.render("packages", { packages: packages, reviews: reviews, pageTitle: "Please view all of our great packages!", currentDate});
});

/**=======================
 * !      Orders Endpoints
 *========================**/

// Get event to pass package information to order form
app.get("/order/:id", async (req, res) => {
  const packageOrder = await Packages.findByPk(req.params.id);
  const agents = await Agents.findAll();
  const tripTypes = await TripTypes.findAll();
  res.render("orders", {
    packageOrder: packageOrder,
    agents: agents,
    tripTypes: tripTypes,
    pageTitle: "Place an Order"
  });
});
// Post event for submission of order
app.post("/packageOrder", async (req, res) => {
  const {
    CustFirstName,
    CustLastName,
    CustAddress,
    CustCity,
    CustProv,
    CustPostal,
    CustCountry,
    CustHomePhone,
    CustBusPhone,
    CustEmail,
    AgentId,
    TravelerCount,
    TripTypeId,
    PackageId
  } = req.body;
  await Customers.create({
    CustFirstName,
    CustLastName,
    CustAddress,
    CustCity,
    CustProv,
    CustPostal,
    CustCountry,
    CustHomePhone,
    CustBusPhone,
    CustEmail,
    AgentId,
    
  });
  // GETS JUST ADDED ID NUMBER
  let nextCustomerId = 1;
  try {
    // Fetch the last CustomerId
    const lastRecord = await Customers.findAll({
      // Order by CustomerId in descending order
      order: [["CustomerId", "DESC"]],
      limit: 1,
      // Select only the CustomerId column
      attributes: ["CustomerId"], // Select only the CustomerId column
    });
    // Makes the customer ID Number
    if (lastRecord.length > 0) {
     
      nextCustomerId = lastRecord[0].CustomerId;
    }
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle error gracefully
  }
  // console.log(req.body);
  const BookingDate = new Date();
  // makes a random 6 character booking number
  const BookingNo = makeBookingNo(6);
  const CustomerId = nextCustomerId;

  console.log({
    BookingDate,
    BookingNo,
    TravelerCount,
    CustomerId,
    TripTypeId,
    PackageId
  });
  await Bookings.create({
    BookingDate,
    BookingNo,
    TravelerCount,
    CustomerId,
    TripTypeId,
    PackageId
  });

  res.redirect("packages");
});

/**=======================
 * !      Review Endpoints
 *========================**/

app.get("/reviewPackage/:id", async (req, res) => {
   
  const package = await Packages.findByPk(req.params.id);
  res.render("reviewPackage", { package: package, pageTitle: "Please review any packages you have booked!"  });
});

// Post Event for submitted reviews
app.post("/reviewSubmit", async (req, res) => {
    const {reviewFirstName,reviewLastName,reviewDescript,reviewRating,packageId}= req.body;
    await Reviews.create({reviewFirstName,reviewLastName,reviewDescript,reviewRating,packageId})
    res.redirect("packages");
});

// Delete Review Endpoints
app.get("/deletereview", async (req, res) => {
  const reviews = await Reviews.findAll();
  res.render("deletereview", { reviews: reviews, pageTitle: "Delete any problematic reviews"  });
});

app.get("/deletereview/:id", async (req, res)=>{
  await Reviews.destroy({ where: { ReviewId: req.params.id } });
  res.redirect("/deletereview")
});

/**=======================
 * !      404 Endpoint
 *========================**/
app.use((req, res)=>{
    // res.status(404).send("<h1>Error Page Not Found</h1>");
    res.render('404', {pageTitle : '404 Not Found'});
});

// Listens to port==============================================

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
// =============================================================
