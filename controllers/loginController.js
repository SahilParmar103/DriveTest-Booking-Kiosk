module.exports = async (req, res) => {
  try {
    const data = {
      success: "",
      failure: "",
    };

    // Render the "login" view and pass the data
    res.render("login", data);
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("An error occurred while rendering the login page.");
  }
};
