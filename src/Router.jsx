import { createBrowserRouter } from 'react-router-dom';
import CreateForm from './pages/InputForm';
import CommentRelevancyTable from './pages/SpamPage';
import Dashboard from './pages/Dashboard';
import LiveClassChat from './pages/LiveClassChat';
import QuestionsDashboard from './pages/QuestionsDashboard';
import CreateMeetingForm from './pages/CreateMeetingForm';
import TeacherMeetingDashboard from './pages/TeachingQuestionDashboard';

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
        path: "/questions-dashboard/:id",
        element: <QuestionsDashboard />,
    },
    {
        path: "/view",
        element: <CommentRelevancyTable />,
    },
]);


export default router;
            