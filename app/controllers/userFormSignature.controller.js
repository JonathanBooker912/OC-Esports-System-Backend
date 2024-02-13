import FormSignature from "../models/userFormSignature.model.js";
import FormVersion from "../models/formVersion.model.js";
import Form from "../models/form.model.js";

const formSignatureController = {};

formSignatureController.create = async (req, res) => {
  try {
    const { dateSigned, userId, formVersionId, fontSelection } = req.body;
    const newFormSignature = await FormSignature.create({
      dateSigned,
      userId,
      formVersionId,
      fontSelection,
    });
    res.status(201).json(newFormSignature);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error creating form signature" });
  }
};

formSignatureController.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const formSignature = await FormSignature.findByPk(id);
    if (formSignature) {
      res.status(200).json(formSignature);
    } else {
      res
        .status(404)
        .json({ message: `Cannot find form signature with id = ${id}.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving form signature with id = ${id}.` });
  }
};

formSignatureController.findAll = async (req, res) => {
  try {
    const formSignatures = await FormSignature.findAll();
    res.status(200).json(formSignatures);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error retrieving form signatures" });
  }
};

formSignatureController.update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await FormSignature.update(req.body, {
      where: { id },
    });
    if (updatedRowsCount > 0) {
      res.status(200).json({ message: "Form signature updated successfully" });
    } else {
      res
        .status(404)
        .json({ message: `Cannot update form signature with id = ${id}.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating form signature with id = ${id}.` });
  }
};

formSignatureController.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await FormSignature.destroy({
      where: { id },
    });
    if (deletedRowCount > 0) {
      res.status(200).json({ message: "Form signature deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: `Cannot delete form signature with id = ${id}.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting form signature with id = ${id}.` });
  }
};

// Additional functions to find form signatures by userId and formVersionId

formSignatureController.getMostRecentForUser = async (req, res) => {
  const { userId } = req.params;
  const formSignatures = await FormSignature.findAll({
    where: { userId },
    include: [
      {
        model: FormVersion,
        attributes: ["id", "effectiveDate"],
        include: [
          {
            model: Form,
            attributes: ["id"],
          },
        ],
      },
    ],
  });

  const recentFormSignatures = [];
  formSignatures.forEach((signature) => {
    let currentId = signature.formVersion.form.id;
    let duplicateIndex = -1;

    recentFormSignatures.forEach((entry) => {
      if (entry.formVersion.form.id == currentId) {
        duplicateIndex = recentFormSignatures.indexOf(entry);
      }
    });

    if (duplicateIndex > -1) {
      const currentDate = Date(signature.formVersion.effectiveDate);
      const duplicateDate = Date(signature.formVersion.effectiveDate);

      if (currentDate > duplicateDate) {
        recentFormSignatures.push(signature);
      }
    } else {
      recentFormSignatures.push(signature);
    }
  });

  const formattedSignatures = recentFormSignatures.map((signature) => {
    return {
      id: signature.id,
      dateSigned: signature.dateSigned,
      formVersionId: signature.formVersionId,
      formId: signature.formVersion.form.id,
    };
  });

  res.status(200).json(formattedSignatures);
};

formSignatureController.findByFormVersionId = async (req, res) => {
  const { formVersionId } = req.params;
  try {
    const formSignatures = await FormSignature.findAll({
      where: { formVersionId },
    });
    res.status(200).json(formSignatures);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving form signatures for formVersionId = ${formVersionId}.`,
    });
  }
};

export default formSignatureController;
