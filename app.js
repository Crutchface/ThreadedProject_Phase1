
// ======================================================
// Calls in our npm modules 
// ======================================================
const express = require('express');
const sequelize = require('./utils/database');
const path = require("path");
// Loads in our express-validator module
const { body, validationResult } = require('express-validator');

// defines our 
const app = express();
const port =8000;

// =======================================================
// Sync Database 
// =======================================================
sequelize.sync({force:false})
    .then(()=>{
        console.log("Database Synced")
    })
    .catch(err=>console.err("Cant sync", err));



// =======================================================
// Imports our models for use with sequelize
// =======================================================
const Agency = require('./models/agency');
const Bookings = require('./models/bookings');
const Agents = require('./models/agents');
const Packages = require('./models/packages');

// =======================================================
// Sets our Root Directory
// =======================================================
const rootDir = path.dirname(require.main.filename);

// =======================================================
// Declares our static folders
// =======================================================
app.use(express.static(path.join(rootDir, "public")));
app.use(express.static(path.join(rootDir, "views")));

// =======================================================
// sets our view engine to ejs
// =======================================================
app.set('view engine', 'ejs');

// =======================================================
// Allows parsing more info from our html 
// =======================================================
app.use(express.urlencoded({extended:true}));


//=========================================================
// endpoints
// =======================================================

/**=======================
 * !      Agents Endpoints
 *========================**/

// Endpoint for agents w/ agency information
app.get('/agents', async (req, res)=>{
    const agents = await Agents.findAll();
    const agency = await Agency.findAll();
    res.render('agents', {agents : agents, agency: agency})
});

// Endpoint for editing all agents 
app.get('/editagents', async (req,res)=>{
    const agents = await Agents.findAll();
    console.log(agents);
    res.render('editagents', {agents : agents})
});

// Ednpoint for editing specific agent 
app.get('/agentedit/:id', async (req, res)=>{
    // use find by pk to find by primary key
    // takes the id to search as a a parameter
    const agent = await Agents.findByPk(req.params.id);
    res.render('agentedit', {agent})
});
//  Post for the update
app.post('/edit/:id', async (req, res)=>{
    
    // const {firstname, lastname, email, phone, city,postal,message } = req.body;
    await Agent.update({firstname, lastname, email, phone, city,postal,message },{
        where: {id: req.params.id}
    });
    
    res.redirect('/agents');
});

//  post for agent deletion
app.get('/agentdelete/:id', async (req, res)=>{
    await Agent.destroy({where: {id: req.params.id}})
    res.redirect('/agents');
});

/**=======================
 * !      Packages Endpoints
 *========================**/

app.get('/packages', async (req, res)=>{
    const packages = await Packages.findAll();
    res.render('packages', {packages : packages})
});
// Post event to pass package information to oder form
app.post('/packages/:id', async (req, res)=>{
    // const packageOrder = req.params.id;
    // console.log(packageOrder);
    const packageOrder = await Packages.findByPk(req.params.id);
    console.log(packageOrder)
    const agents = await Agents.findAll();
    res.render('orders', {packageOrder : packageOrder, agents : agents })
})

/**=======================
 * !      Orders Endpoints
 *========================**/

app.get('orders', async (req, res)=>{
    console.log(req.params.id)
    const package = await Packages.findByPk(req.params.id);
    console.log(package)
    res.render('orders', {package :package})
})

// Orders post





/**=======================
 * !      404 Endpoint
 *========================**/
// app.use((req, res)=>{
//     // res.status(404).send("<h1>Error Page Not Found</h1>");
//     res.render('404', {pageTitle : '404 Not Found'});
// });

// Listens to port==============================================

app.listen(port, ()=>{
    console.log('Server running on http://localhost:'+port);
 
});
// =============================================================


