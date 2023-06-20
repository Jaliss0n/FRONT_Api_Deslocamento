import Clients from "@/pages/ClientsGroup/Clients";
import { TableClients } from "@/pages/ClientsGroup/TableClients";

export default function switchScreen (n: number) {
    switch (n) {
        case 0:
            return <Clients/>;
        case 1: 
            return <TableClients/>;
    }
}