import Clients from "@/pages/ClientsGroup/Clients";
import { TableClients } from "@/pages/ClientsGroup/TableClients";
import Condutor from "@/pages/CondutorGroup/Condutor";
import { TableCondutor } from "@/pages/CondutorGroup/TableCondutor";

export default function switchScreen (n: number) {
    switch (n) {
        case 0:
            return <Clients/>;
        case 1: 
            return <TableClients/>;
        case 2: 
            return <Condutor/>;
        case 3: 
            return <TableCondutor/>;
    }
}