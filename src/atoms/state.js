import * as yup from "yup";

export const categoryMasterSchema = yup.object().shape({
    question: yup.string(),
});

export const categoryMasterValues = {
    question: "",
};