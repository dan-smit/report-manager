const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.viewReport);

router.put("/updateTitle/:id", ensureAuth, postsController.updateTitle)

router.put("/updateDescription/:id", ensureAuth, postsController.updateDescription)

router.put("/addViewers/:id", ensureAuth, postsController.addViewers)

router.post("/createReport", upload.single("file"), postsController.createReport);

router.delete("/deleteReport/:id", postsController.deleteReport);

module.exports = router;
