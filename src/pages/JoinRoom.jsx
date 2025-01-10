import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './room.css';
import socket from '../atoms/socket';
import { useNavigate } from 'react-router-dom';
const JoinRoom = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            roomID: '',
            username: '',
        },
        validationSchema: Yup.object({
            roomID: Yup.string().required('Room ID is required'),
            username: Yup.string().required('Username is required'),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            // Emit join_room event to the server
            socket.emit("join_room", values, (response) => {
                if (response?.error) {
                    console.error("Error joining room:", response.error);
                    alert(response.error);
                } else {
                    console.log("Successfully joined room:", response);
                    // alert(`Joined room: ${values.roomID}`);
                    navigate(`/live-class-chat/?roomId=${values.roomID}&username=${values.username}`);
                    resetForm();
                }
                setSubmitting(false);
            });
        },
    });

    return (
        <div className="container">
            <form className="create-meeting-form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="roomID">Room ID</label>
                    <input
                        type="text"
                        name="roomID"
                        id="roomID"
                        placeholder="Enter the Room ID"
                        value={formik.values.roomID}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.roomID && formik.errors.roomID ? 'error' : ''}
                    />
                    {formik.touched.roomID && formik.errors.roomID ? (
                        <div className="error-message">{formik.errors.roomID}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.username && formik.errors.username ? 'error' : ''}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="error-message">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => formik.resetForm()}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Submitting...' : 'Join Room'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JoinRoom;
