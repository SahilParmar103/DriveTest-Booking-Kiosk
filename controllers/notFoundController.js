module.exports = (req, res) => {
  const data = {
    message: "",
    linkUrl: "",
    linkText: "",
  };

  res.render("notFound", data);
};
