import React, { useState } from "react";
import { Formik, Form } from "formik";
import { categoryMasterSchema, categoryMasterValues } from "../atoms/state";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import FormHeader from "../components/FormHeader";
import useResponseHandler from "../components/useResponseHandler";

const handleSubmit = async (
  values,
  createCategoryMaster,
  formValue,
  updateCategoryMaster,
  user
) => {
  if (formValue?._id) {
    await updateCategoryMaster({ ...values });
  } else {
    await createCategoryMaster({ ...values });
  }
};

const CreateForm = ({ formValue, performCancel }) => {
  const navigate = useNavigate();

  const [createCategoryMaster, GetCategoryMasterResponse] =
    // useCreateCategoryMasterMutation();
    useState();

  useResponseHandler({
    response: GetCategoryMasterResponse,
    type: "Question Submitted Successfully!",
    cancel: performCancel,
    error: "Failed to submit your question! Please try again.",
  });

  return (
    <div>
      {/* <FormHeader
        title={"Submit Your Question"}
      /> */}
      <div className="sm:mx-auto w-[80vw]">
        <Formik
          initialValues={categoryMasterValues}
          validationSchema={categoryMasterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await handleSubmit(
                values,
                createCategoryMaster,
                formValue,
              );
              navigate("/"); // Assuming you want to navigate to a list page after success
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <div className="p-4 border border-gray-300 rounded-md">
              <Form className="flex flex-col gap-4">
                <InputField name={"question"} label={"Enter Your Question"} />
                <div className="flex justify-end w-full">
                  <button
                    type="submit"
                    className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateForm;
