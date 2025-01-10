import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './room.css';
import { useCreateRoomMutation } from '../store/store';
import { generateAIResponse } from '../atoms/state';

const JoinRoom = () => {
    const [createRoom] = useCreateRoomMutation();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            roomID: '',
            username: '',
        },
        validationSchema: Yup.object({
            roomID: Yup.string()
                .required('Room ID is required'),
                username: Yup.string()
                .required('Username is required')
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await createRoom({
                    roomID: values.roomID,
                    username: values.username,
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

    //  // Handle AI content generation
    //  const handleGenerateWithAI = async () => {
    //     console.log('Generating AI content...');
    //     const topic = formik.values.title;

    //     if (!topic.trim()) {
    //         alert('Please enter a class title to generate content.');
    //         return;
    //     }

    //     // Generate content for the text field
    //     const aiContent = await generateAIResponse(topic);
    //     formik.setFieldValue('text', aiContent); // Set the AI response to the text field
    // };


    return (
        <div className="container">
            <form
                className="create-meeting-form"
                onSubmit={formik.handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="class-title">Room ID</label>
                    <input
                        type="text"
                        name="roomID"
                        id="class-title"
                        placeholder="Enter the Room ID"
                        value={formik.values.roomID}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                            formik.touched.roomID && formik.errors.roomID
                                ? 'error'
                                : ''
                        }
                    />
                    {formik.touched.roomID && formik.errors.roomID ? (
                        <div className="error-message">
                            {formik.errors.roomID}
                        </div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="class-title">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="class-title"
                        placeholder="Enter your username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                            formik.touched.username && formik.errors.username
                                ? 'error'
                                : ''
                        }
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="error-message">
                            {formik.errors.username}
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
                        {formik.isSubmitting ? 'Submitting...' : 'Join Room'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JoinRoom;
