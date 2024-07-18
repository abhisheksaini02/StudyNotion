const Section=require("../Models/Section")
const Course=require("../Models/Course")


exports.createSection=async(req,res)=>{
    
    try{//data fetch
    const {sectionName,courseId}=req.body
    if(!sectionName||!courseId){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
         })
    }
    const newSection=await Section.create({sectionName})
    const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
            $push: {
              courseContent: newSection._id,
            },
          },
          { new: true }
        )
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec();
    
        // Log updated course
        console.log("Updated course:", updatedCourse);

    // Return the updated course object in the response
    res.status(200).json({
        success: true,
        message: "Section created successfully",
        updatedCourse,
    });

 }
    catch(err){
        return res.status(500).json({
           success:false,
           message:err.message
        })
    }
}


//agr section update krna h 

//update data







//update section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};



//delete section 
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        // Validate input
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and Course ID are required",
            });
        }

        // Delete the section
        const section = await Section.findByIdAndDelete(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // Update the course to remove the reference to the deleted section
        await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionId }
        });

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        });

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};