// TODO : 
//        
//        Create table for review and program logic
//        Make database logic for agents
//        Make dates display as red if too old
//        If Time : Move booking number feature to ext 
//      

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
}

// ======================================================
// Calls in our npm modules
// ======================================================
const express = require("express");
const sequelize = require("./utils/database");
const path = require("path");
// Loads in our express-validator module
const { body, validationResult } = require("express-validator");

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
 * !      Agents Endpoints
 *========================**/

// Endpoint for agents w/ agency information
app.get("/agents", async (req, res) => {
  const agents = await Agents.findAll();
  const agency = await Agency.findAll();
  res.render("agents", { agents: agents, agency: agency });
});

// Endpoint for editing all agents
app.get("/editagents", async (req, res) => {
  const agents = await Agents.findAll();
  console.log(agents);
  res.render("editagents", { agents: agents });
});

// Ednpoint for editing specific agent
app.get("/agentedit/:id", async (req, res) => {
  // use find by pk to find by primary key
  // takes the id to search as a a parameter
  const agent = await Agents.findByPk(req.params.id);
  res.render("agentedit", { agent });
});

//  Post for the update
app.post("/agentedit", async (req, res) => {
  // const {firstname, lastname, email, phone, city,postal,message } = req.body;
  console.log(req.body);
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
  res.render("packages", { packages: packages, reviews: reviews });
});

/**=======================
 * !      Orders Endpoints
 *========================**/

// Post event to pass package information to order form
app.post("/order/:id", async (req, res) => {
  const packageOrder = await Packages.findByPk(req.params.id);
  // console.log(packageOrder)
  const agents = await Agents.findAll();
  const tripTypes = await TripTypes.findAll();
  // console.log(tripTypes)
  res.render("orders", {
    packageOrder: packageOrder,
    agents: agents,
    tripTypes: tripTypes,
  });
});

app.post("/packageOrder", async (req, res) => {
  // ADD TO DATABASE HERE
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

    if (lastRecord.length > 0) {
      // Increment the last CustomerId by 1
      nextCustomerId = lastRecord[0].CustomerId;
    }
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle error gracefully
  }
  console.log(req.body);
  const BookingDate = new Date();
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

app.post("/reviewPackage/:id", async (req, res) => {
  const package = await Packages.findByPk(req.params.id);
  res.render("reviewPackage", { package: package });
});
app.post("/reviewSubmit", async (req, res) => {
    const {reviewFirstName,reviewLastName,reviewDescript,reviewRating,packageId}= req.body
    await Reviews.create({reviewFirstName,reviewLastName,reviewDescript,reviewRating,packageId})
    console.log(req.body);
    res.redirect("packages");
});

/**=======================
 * !      404 Endpoint
 *========================**/
// app.use((req, res)=>{
//     // res.status(404).send("<h1>Error Page Not Found</h1>");
//     res.render('404', {pageTitle : '404 Not Found'});
// });

// Listens to port==============================================

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
// =============================================================
