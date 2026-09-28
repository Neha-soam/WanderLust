const {listingSchema,reviewSchema}=require("../schema.js");

const ExpressError = require("../utils/ExpressError");
const Listing=require("../models/listing");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}
module.exports.renderNewform = (req, res) => {
    
    res.render("listings/new.ejs");
}
module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author",
        },
    }).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for doesn't exist");
        res.redirect("/listings");
    }else{
    res.render("listings/show.ejs", { listing });
    }
    

}
module.exports.createListing=async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;
    
  // 1. Text fields se basic listing object banayein
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  
  // 2. req.file se Cloudinary URL aur Filename attach karein
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };
  }
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location)}`,
    {
        headers: {
            "User-Agent": "Wanderlust/1.0"
        }
    }
);

const data = await response.json();


        if (data.length > 0) {
            newListing.geometry = {
                type: "Point",
                coordinates: [
                    Number(data[0].lon),
                    Number(data[0].lat)
                ]
            };
        }

  await newListing.save();
//     let result=listingSchema.validate(req.body);
//     if(result.error){
//         throw new ExpressError(400,result.error);
//     }
    
    
//     if (!req.body.listing) {
//         throw new ExpressError(400, "send valid data for listing");//400->bad request
//     }
//     if (!req.body.listing.image.url) {
//     delete req.body.listing.image.url;
// }
    // let {title,description,image,price,country,location}=req.body;
   
    req.flash("success","new listing created");
    res.redirect("/listings");

    }

module.exports.updateListing=async (req, res, next) => {
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "send valid data for listing");//400->bad request
    // }
 try {
        let { id } = req.params;

        let listing = await Listing.findById(id);

        Object.assign(listing, req.body.listing);

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location)}`,
            {
                headers: {
                    "User-Agent": "Wanderlust/1.0"
                }
            }
        );

        const data = await response.json();

        if (data.length > 0) {
            listing.geometry = {
                type: "Point",
                coordinates: [
                    Number(data[0].lon),
                    Number(data[0].lat)
                ]
            };
        }

        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;

            listing.image = { url, filename };
        }

        await listing.save();

        req.flash("success", "listing updated");
        res.redirect(`/listings/${id}`);

    } catch (err) {
        next(err);
    }

}
module.exports.deleteListing=async (req, res) => {
        let { id } = req.params;

        let deletedListing = await Listing.findByIdAndDelete(id);

        console.log(deletedListing);

        req.flash("success", "Listing deleted!");

        res.redirect("/listings");
    }
module.exports.editListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","you are not the owner of this listing ");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
   originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_250")
    
    res.render("listings/edit.ejs", { listing,originalImageUrl});
}