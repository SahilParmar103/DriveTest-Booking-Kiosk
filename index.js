const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

//Connect to Database
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.ae4pn7p.mongodb.net/drivetest?retryWrites=true&w=majority"
);

//controllers
const dashboardController = require("./controllers/dashboardController");
const g2Controller = require("./controllers/g2Controller");
const gController = require("./controllers/gController");
const storeUserController = require("./controllers/storeUserController");
const updateUserController = require("./controllers/updateUserController");
const loginController = require("./controllers/loginController");
const loginUserController = require("./controllers/loginUserController");
const logoutController = require("./controllers/logoutController");
const appointmentController = require("./controllers/appointmentController");
const addAppointmentsController = require("./controllers/addAppointmentController");
const bookAppointmentsController = require("./controllers/bookAppointmentController");
const getAppointmentsController = require("./controllers/getAppointmentController");
const notFoundPageController = require("./controllers/notFoundController");
const examinerController = require("./controllers/examinerController");
const fetchAppointmentsController = require("./controllers/fetchAppointmentsController");
const resultController = require("./controllers/resultController");

//Middlewares
const app = express();

//custom middlewares
const authMiddleware = require("./middlewares/authGuardMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middlewares/redirectMiddleware");
const examinerMiddleware = require("./middlewares/examinerMiddleware");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: "fullstack",
  })
);

//control the navigation links
global.loggedIn = null;
global.userType = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  userType = req.session.userType;
  next();
});
//template engine
app.set("view engine", "ejs");
//Server
app.listen(4500, () => {
  console.log("App is running on port 4500");
});

//Routes
app.get("/", dashboardController);
app.get("/notFound", notFoundPageController);
app.get("/g2", authMiddleware, g2Controller);
app.get("/g", authMiddleware, gController);
app.post("/cardetails/store", storeUserController);
app.post("/cred/store/:id", authMiddleware, updateUserController);
app.get("/login", redirectIfAuthenticatedMiddleware, loginController);

//examiner
app.get("/examiner", examinerMiddleware, examinerController);
app.post("/examiner/testType", examinerMiddleware, fetchAppointmentsController);

app.post("/examiner/result", examinerMiddleware, resultController);

// Render admin appointment booking view
app.get("/appointments", authMiddleware, appointmentController);

// Handle appointment slot creation
app.post("/appointments", authMiddleware, addAppointmentsController);

app.post("/appointments/g2/:page", authMiddleware, getAppointmentsController);

//Booking an appointment
app.get(
  "/appointments/:id/:page/book",
  authMiddleware,
  bookAppointmentsController
);

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.get("/auth/logout", logoutController);
