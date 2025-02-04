const Tuition = require("../../../model/tuitionModel");
const User = require("../../../model/userModel");

exports.getTuitions = async (req, res) => {
  const tuitions = await Tuition.find();
  res.status(200).json({
    message: "Tuitions fetched successfully",
    data: tuitions,
  });
};

exports.getTuition = async (req, res) => {
  const { id } = req.params;

  const tuition = await Tuition.findById(id).populate(
    "applications",
    "name email phoneNumber"
  );
  if (!tuition) {
    return res.status(404).json({
      message: "Tuition not found",
    });
  }

  res.status(200).json({
    data: tuition,
  });
};

exports.addTuition = async (req, res) => {
  const { title, description, salary, location, requirements, duration } =
    req.body;

  if (!title || !description || !salary || !location || !duration) {
    return res.status(400).json({
      message:
        "Please provide all required fields title,description,salary,location,requirements,duration",
    });
  }

  const newTuition = new Tuition({
    title,
    description,
    salary,
    location,
    requirements,
    duration,
  });

  await newTuition.save();

  res.status(201).json({
    message: "Tuition added successfully",
    data: newTuition,
  });
};

exports.editTuition = async (req, res) => {
  const { id } = req.params;
  const { title, description, salary, location, requirements, duration } =
    req.body;

  const tuition = await Tuition.findById(id);

  if (!tuition) {
    return res.status(404).json({
      message: "Tuition not found",
    });
  }

  if (title) tuition.title = title;
  if (description) tuition.description = description;
  if (salary) tuition.salary = salary;
  if (location) tuition.location = location;
  if (requirements) tuition.requirements = requirements;
  if (duration) tuition.duration = duration;

  const updatedTuition = await tuition.save();

  res.status(200).json({
    message: "Tuition updated successfully",
    data: updatedTuition,
  });
};

exports.deleteTuition = async (req, res) => {
  const { id } = req.params;

  const tuition = await Tuition.findByIdAndDelete(id);
  if (!tuition) {
    return res.status(404).json({
      message: "Tuition not found",
    });
  }

  res.status(200).json({
    message: "Tuition deleted successfully",
  });
};



exports.applyToTuition = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  console.log(`Applying to tuition with ID: ${id} for user ID: ${userId}`);

  const tuition = await Tuition.findById(id);
  if (!tuition) {
    console.log("Tuition not found");
    return res.status(404).json({
      message: "Tuition not found",
    });
  }


  const user = await User.findById(userId);
  if (user.savedTuitions.includes(id)) {
    console.log("User has already applied to this tuition");
    return res.status(400).json({
      message: "You have already applied to this tuition",
    });
  }

 
  user.savedTuitions.push(id);
  await user.save();

  tuition.applications.push(userId);
  await tuition.save();

  console.log("Applied to tuition successfully");

  res.status(200).json({
    message: "Applied to tuition successfully",
    data: tuition,
  });
};
// exports.applyToTuition = async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user.id;
//   const { token, amount, mobile, product_identity, product_name, product_url } =
//     req.body;

//   const tuition = await Tuition.findById(id);
//   if (!tuition) {
//     return res.status(404).json({
//       message: "Tuition not found",
//     });
//   }

//   // Check if the user has already applied
//   const user = await User.findById(userId);
//   if (user.savedTuitions.includes(id)) {
//     return res.status(400).json({
//       message: "You have already applied to this tuition",
//     });
//   }

//   // Add the tuition to the user's savedTuitions
//   user.savedTuitions.push(id);
//   await user.save();

//   // Store payment details
//   tuition.applications.push({
//     user: userId,
//     paymentStatus: "Paid",
//     paymentDetails: {
//       token,
//       amount,
//       mobile,
//       product_identity,
//       product_name,
//       product_url,
//     },
//   });
//   await tuition.save();
//   res.status(200).json({
//     message: "Applied to tuition successfully",
//     data: tuition,
//   });
// };
