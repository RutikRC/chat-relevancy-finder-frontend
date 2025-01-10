import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './room.css';
import { useCreateRoomMutation } from '../store/store';

const CreateMeetingForm = () => {
    const [createRoom] = useCreateRoomMutation();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Class Title is required')
                .max(100, 'Class Title must be 100 characters or less'),
            text: Yup.string()
                .required('Class Information is required')
                .max(1000, 'Class Information must be 1000 characters or less'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await createRoom({
                    topic: values.title,
                    content: values.text,
                }).unwrap();
                console.log('Room created successfully:', response);
                resetForm(); // Clear the form after successful submission
            } catch (error) {
                console.error('Error creating room:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container">
            <form
                className="create-meeting-form"
                onSubmit={formik.handleSubmit}
            >
                <div className="form-header">
                    <h1>Create New Meeting</h1>
                    <p>Set up your virtual classroom session</p>
                </div>

                <div className="form-group">
                    <label htmlFor="class-title">Class Title</label>
                    <input
                        type="text"
                        name="title"
                        id="class-title"
                        placeholder="e.g., Advanced JavaScript Concepts"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                            formik.touched.title && formik.errors.title
                                ? 'error'
                                : ''
                        }
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="error-message">
                            {formik.errors.title}
                        </div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="class-info">Class Information</label>
                    <div className="text-controls">
                        <span>{formik.values.text.length}/1000 words</span>
                        <button
                            type="button"
                            className="ai-generate"
                            onClick={() =>
                                alert('AI generation is not yet implemented!')
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                                <path d="M7 7h.01" />
                            </svg>
                            Generate with AI
                        </button>
                    </div>
                    <textarea
                        id="class-info"
                        name="text"
                        placeholder="Describe your class content, objectives, and requirements. Or click 'Generate with AI' to get suggestions..."
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                            formik.touched.text && formik.errors.text
                                ? 'error'
                                : ''
                        }
                    ></textarea>
                    {formik.touched.text && formik.errors.text ? (
                        <div className="error-message">
                            {formik.errors.text}
                        </div>
                    ) : null}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => formik.resetForm()}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Create Meeting'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateMeetingForm;
