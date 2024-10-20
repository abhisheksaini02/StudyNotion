const SubSection=require("../Models/SubSection")
const Section=require("../Models/Section")
const{uploadImageToCloudinary}=require("../utils/imageUploader")


//SUBSECTION CREATE KIYA H 
exports.createSubSection =async(req,res)=>{
try{
    //fetch data
    const {sectionId,title,description}=req.body
    const video=req.files.video
    //validation
    if(!sectionId||!title||!description){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
         })
    }

    //upload to cloudinary
    const uploadDetails=await uploadImageToCloudinary (video,process.env.FOLDER_NAME)

    //create entry in db
    const subsectiondetail=await SubSection.create({
        title:title,
        // timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url
    })
    //update section
    const updatedSection=await Section.findByIdAndUpdate(sectionId,
    {$push:{subSection:subsectiondetail._id
    }},
{new:true}).populate("subSection")
return res.status(200).json({
    success:true,
    message:"Subsection created Successfully",
    data:updatedSection
 })


}
catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
     })
}
}



//SUBSECTION UPDATE

//SUBSECTION DELETE
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        data:updatedSection,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }