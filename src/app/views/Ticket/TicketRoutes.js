import { MatxLoadable } from "../../../shared_component";
import {authRoles} from "../../auth/authRoles";


const Ticket = MatxLoadable({
    loader: () => import('./TicketDetail')
})

const TicketRoutes = [
    {
        path: "/ticket_detail/file",
        component: Ticket,
        auth: authRoles.admin
    }
];

export default TicketRoutes;