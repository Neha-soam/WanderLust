const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing = require("../models/listing.js");
const{isLoggedIn}=require("../middleware.js");
const {isOwner,validateListing} = require("../middleware.js");
const listingController=require("../controller/listing.js");

const multer = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});


router
.route("/")
.get(wrapAsync(listingController.index))//index route
.post(upload.single("listing[image][url]"),isLoggedIn,validateListing,wrapAsync(listingController.createListing));//create route

//new Route
router.get("/new",isLoggedIn,listingController.renderNewform );

router
.route("/:id")
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
)//Delete Route
.get( wrapAsync(listingController.showListing))//show Route
.put(isLoggedIn,isOwner,upload.single("listing[image][url]"),validateListing,wrapAsync(listingController.updateListing));//update route

router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.editListing));


// router.get("/:id", wrapAsync(listingController.showListing));


// router.put("/:id", isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))




// router.delete(
//     "/:id",isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.deleteListing)
// );


module.exports = router;