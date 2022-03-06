import React from "react";
import { Redirect } from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import TicketRoutes from "./views/Ticket/TicketRoutes";

const redirectRoute = [
    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/ticket_detail/file" />
    }
];


const routes = [
    ...TicketRoutes,
    ...sessionRoutes,
    ...redirectRoute,
];

export default routes;