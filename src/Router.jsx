import { createBrowserRouter } from 'react-router-dom';
import CreateForm from './pages/InputForm';
import CommentRelevancyTable from './pages/SpamPage';
import Dashboard from './pages/Dashboard';
import LiveClassChat from './pages/LiveClassChat';
import CreateMeetingForm from './pages/CreateMeetingForm';
import TeacherMeetingDashboard from './pages/TeachingQuestionDashboard';
import TeachersMeetingDashboard from './pages/QuestionTeachingDashboard';
import JoinRoom from './pages/JoinRoom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/room-create",
        element: <CreateForm />,
    },
    {
        path: "/live-class-chat",
        element: <LiveClassChat />,
    },
    {
        path: "/teaching-dashboard",
        element: <TeacherMeetingDashboard />,
    },
    {
        path: "/create-meeting",
        element: <CreateMeetingForm />,
    },
    {
        path: "/join-room",
        element: <JoinRoom />,
    },
    {
        path: "/questions-dashboard/:id",
        element: <TeachersMeetingDashboard />,
    },
    {
        path: "/view",
        element: <CommentRelevancyTable />,
    },
]);


export default router;
            