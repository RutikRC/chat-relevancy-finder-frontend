import { createBrowserRouter } from 'react-router-dom';
import CreateForm from './pages/InputForm';
import CommentRelevancyTable from './pages/SpamPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <CreateForm />,
    },
    {
        path: "/view",
        element: <CommentRelevancyTable />,
    },
]);


export default router;
            