module.exports = async (req, res) => {
  try {
    console.log(req.session);

    // Render the "dashboard" view
    res.render("dashboard");
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("An error occurred while rendering the dashboard.");
  }
};
