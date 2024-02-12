import FormFieldUtils from "../sequelizeUtils/formVersionFields.js";

import User from "../models/user.model.js";

import Helpers from "./support/signedFormHelpers.js";

const exports = {};

// Find all Matches
exports.modifyAndReturn = async (req, res) => {
  const { userId, formVersionId } = req.params;
  try {
    const user = await User.findByPk(userId);

    const userSignature = await Helpers.getUserSignature(userId, formVersionId);

    const fields = await FormFieldUtils.findAllForFormVersion(formVersionId);

    const pdfBytes = await Helpers.getSignedPDF(
      fields,
      user,
      userSignature,
      formVersionId,
    );
    res.status(200).send(pdfBytes);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: `Error Retreiving Form with id=${formVersionId}` });
  }
};

export default exports;
