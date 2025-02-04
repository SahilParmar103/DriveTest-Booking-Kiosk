module.exports = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      req.session.destroy((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    res.redirect("/");
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("An error occurred while destroying the session.");
  }
};
