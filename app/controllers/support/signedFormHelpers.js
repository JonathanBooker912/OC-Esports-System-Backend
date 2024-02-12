import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

import FormSignature from "../../models/userFormSignature.model.js";
import FormVersion from "../../models/formVersion.model.js";
import Form from "../../models/form.model.js";

import path from "path";
import fs from "fs";

import { fileURLToPath } from "url"; // Imports for Serving Static Files
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const helpers = {};

helpers.getSignedPDF = async (fields, user, signature, formVersionId) => {
  const existingPDF = await loadExistingPDF(formVersionId);

  const pdfDoc = await PDFDocument.load(existingPDF);
  const form = pdfDoc.getForm();

  pdfDoc.registerFontkit(fontkit);

  await fillFields(pdfDoc, fields, user, signature);

  form.flatten();
  const pdfBytes = await pdfDoc.saveAsBase64();

  return pdfBytes;
};

helpers.getUserSignature = async (userId, formVersionId) => {
  const userSignatures = await FormSignature.findAll({
    where: { userId, formVersionId },
  });

  return {
    dateSigned: userSignatures[0].dateSigned,
    fontSelection: userSignatures[0].fontSelection,
  };
};

const fillFields = async (pdfDoc, fields, user, signature) => {
  const form = pdfDoc.getForm();

  const fontBytes = loadSignatureFont(signature.fontSelection);
  const signatureFont = await pdfDoc.embedFont(fontBytes);

  fields.forEach((field) => {
    const textField = form.getTextField(field.fieldName);
    const text = getFieldText(field, user, signature);

    textField.setText(text);

    if (field.fieldName.toLowerCase().includes("signature")) {
      textField.updateAppearances(signatureFont);
    }
  });
};

const loadExistingPDF = async (formVersion) => {
  const requestedVersion = await FormVersion.findByPk(formVersion, {
    include: [
      {
        model: Form,
        attributes: ["name"],
      },
    ],
  });

  return fs.readFileSync(
    path.join(
      __dirname,
      `../../../../Forms/${requestedVersion.form.name}/${requestedVersion.source}`,
    ),
  );
};

const loadSignatureFont = (font) => {
  let fontBytes = null;
  switch (font) {
    case "Rochester":
      fontBytes = fs.readFileSync(
        path.join(
          __dirname,
          "../../config/signature-fonts/Rochester-Regular.ttf",
        ),
      );
      break;
    case "Rouge Script":
      fontBytes = fs.readFileSync(
        path.join(
          __dirname,
          "../../config/signature-fonts/RougeScript-Regular.ttf",
        ),
      );
      break;
    case "Alex Brush":
      fontBytes = fs.readFileSync(
        path.join(
          __dirname,
          "../../config/signature-fonts/AlexBrush-Regular.ttf",
        ),
      );
      break;
    case "Meie Script":
      fontBytes = fs.readFileSync(
        path.join(
          __dirname,
          "../../config/signature-fonts/MeieScript-Regular.ttf",
        ),
      );
      break;
    default:
      fontBytes = fs.readFileSync(
        path.join(__dirname, "../../config/signature-fonts/Allura-Regular.ttf"),
      );
  }
  return fontBytes;
};

const getFieldText = (field, user, signature) => {
  if (field.fieldName.toLowerCase().includes("date")) {
    return signature.dateSigned;
  } else {
    if (field.dataAttribute.split("+").length > 1) {
      const pieces = field.dataAttribute.split("+");
      let result = "";

      pieces.forEach((piece) => {
        if (piece == "' '") {
          result += " ";
        } else {
          result += user[piece];
        }
      });
      return result;
    } else {
      return user[field.dataAttribute];
    }
  }
};

export default helpers;
