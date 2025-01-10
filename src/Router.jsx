import { createBrowserRouter } from 'react-router-dom';
import CreateForm from './pages/InputForm';
import CommentRelevancyTable from './pages/SpamPage';
import Dashboard from './pages/Dashboard';
import LiveClassChat from './pages/LiveClassChat';
import QuestionsDashboard from './pages/QuestionsDashboard';
import CreateMeetingForm from './pages/CreateMeetingForm';

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
        path: "/create-meeting",
        element: <CreateMeetingForm />,
    },
    {
        path: "/questions-dashboard",
        element: <QuestionsDashboard />,
    },
    {
        path: "/view",
        element: <CommentRelevancyTable />,
    },
]);


export default router;
            