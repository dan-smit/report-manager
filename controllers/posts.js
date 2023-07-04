const cloudinary = require("../middleware/cloudinary");
const Report = require("../models/Report");

module.exports = {
  getHome: async (req, res) => {
    try {
      const reports = await Report.find({ uploader: req.user.id });
      res.render("home.ejs", { reports: reports, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getReports: async (req, res) => {
    try {
      const reports = await Report.find().sort({ createdAt: "desc" }).lean();
      //const report = await Report.find()
      res.render("reports.ejs", { reports: reports, user: req.user });  
    } catch (err) {
      console.log(err);
    }
  },
  viewReport: async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
      console.log(`user id: ${req.user.id} and uploader: ${report.uploader}`)
      res.render("viewReport.ejs", { report: report, user: req.user });  
    } catch (err) {
      console.log(err);
    }
  },
  addViewers: async (req, res) => {
    try {
      await Report.findOneAndUpdate(
        { _id: req.params.id }, //finds post that has the id in the URL
        {
          $push: { viewers: req.body.viewer }, 
        }
      );
      console.log("Viewer Added");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateTitle: async (req, res) => {
    try {
      await Report.findOneAndUpdate(
        { _id: req.params.id }, //finds post that has the id in the URL
        {
          $set: { title: req.body.title }, 
        }
      );
      console.log("Title Updated");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateDescription: async (req, res) => {
    try {
      await Report.findOneAndUpdate(
        { _id: req.params.id }, //finds post that has the id in the URL
        {
          $set: { description: req.body.caption },
        }
      );
      console.log("Description Updated");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  createReport: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      await Report.create({
        title: req.body.title,
        userName: req.user.userName,
        fileName: req.file.originalname,
        reportPDF: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.caption,
        uploader: req.user.id,
      });
      console.log("Report has been added!");
      res.redirect("/home");
    } catch (err) {
      console.log(err);
    }
  },
  deleteReport: async (req, res) => {
    try {
      // Find post by id
      let report = await Report.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(report.cloudinaryId);
      // Delete post from db
      await Report.remove({ _id: req.params.id });
      console.log("Deleted Report");
      res.redirect("/home");
    } catch (err) {
      res.redirect("/home");
    }
  },
};
