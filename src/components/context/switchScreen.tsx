import Clients from "@/pages/ClientsGroup/Clients";
import { TableClients } from "@/pages/ClientsGroup/TableClients";
import Condutor from "@/pages/CondutorGroup/Condutor";
import { TableCondutor } from "@/pages/CondutorGroup/TableCondutor";
import Deslocamento from "@/pages/DeslocamentoGroup/Deslocamento";
import { TableDeslocamentos } from "@/pages/DeslocamentoGroup/TableDeslocamento";
import { TableVeiculos } from "@/pages/VeiculosGroup/TableVeiculos";
import Veiculos from "@/pages/VeiculosGroup/Veiculos";

export default function switchScreen(n: number) {
  switch (n) {
    case 0:
      return <Clients />;
    case 1:
      return <TableClients />;
    case 2:
      return <Condutor />;
    case 3:
      return <TableCondutor />;
    case 4:
      return <Veiculos />;
    case 5:
      return <TableVeiculos />;
    case 6:
      return <Deslocamento />;
    case 7:
      return <TableDeslocamentos />;
  }
}
