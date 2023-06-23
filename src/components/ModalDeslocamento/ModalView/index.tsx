import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { WhiteTextFieldComponent } from "../../WTextField";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ButtonSubmit } from "../../ModalsClient/ModalEdit";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/data/api";

interface PropsView {
  inicioDeslocamento: string;
  motivo: string;
  kmInicial: number;
  kmFinal: string;
  fimDeslocamento: string;
  checkList: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;

  handleClose: () => void;
}

const ModalViewStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  background-color: #2ca4ac;
  padding: 2%;
  border-radius: 12px;
  color: white;

  @media screen and (max-width: 900px) {
    width: 80%;
    padding: 5%;
    overflow-y: scroll;
    height: 75vh;
  }
`;

interface Cliente {
  id: number;
  nome: string;
}

interface Veiculo {
  id: number;
  placa: string;
}

export function ModalView({
  inicioDeslocamento,
  motivo,
  kmInicial,
  kmFinal,
  fimDeslocamento,
  checkList,
  observacao,
  idCondutor,
  idVeiculo,
  idCliente,
  handleClose,
}: PropsView) {
  const [objClient, setObjClient] = useState<Cliente[]>([
    {
      id: 0,
      nome: "Carregando...",
    },
  ]);

  const [objCondutor, setObjCondutor] = useState<Cliente[]>([
    {
      id: 0,
      nome: "Carregando...",
    },
  ]);

  const [objVeiculo, setObjVeiculo] = useState<Veiculo[]>([
    {
      id: 0,
      placa: "Carregando...",
    },
  ]);

  async function getUsers() {
    try {
      const response = await axios.get(`${apiUrl}/Cliente`);
      const data = response.data;
      const idNameCliente = data.map((e: Cliente) => ({
        id: e.id,
        nome: e.nome,
      }));

      setObjClient(
        idNameCliente
          .filter((e: Cliente) => e.id === idCliente)
          .map((e: Cliente) => e.nome)
          .join("")
      );

      const responseCondutor = await axios.get(`${apiUrl}/Condutor`);
      const dataCondutor = responseCondutor.data;
      const idNameCondutor = dataCondutor.map((e: Cliente) => ({
        id: e.id,
        nome: e.nome,
      }));
      setObjCondutor(
        idNameCondutor
          .filter((e: Cliente) => e.id === idCondutor)
          .map((e: Cliente) => e.nome)
          .join("")
      );

      const responseVeiculo = await axios.get(`${apiUrl}/Veiculo`);
      const dataVeiculo = responseVeiculo.data;
      const idNameVeiculo = dataVeiculo.map((e: Veiculo) => ({
        id: e.id,
        placa: e.placa,
      }));
      setObjVeiculo(
        idNameVeiculo
          .filter((e: Veiculo) => e.id === idVeiculo)
          .map((e: Veiculo) => e.placa)
          .join("")
      );
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  if (fimDeslocamento === null && kmFinal === null) {
    (fimDeslocamento = "Ainda em andamento"), (kmFinal = "Ainda em andamento");
  }

  return (
    <ModalViewStyled>
      <Typography>Visualizar Deslocamentos</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
      <AreaInputs>
        <WhiteTextFieldComponent
          id="kmInicial"
          type="text"
          label="Kilometro Inicial"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={kmInicial.toString()}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="kmFinal"
          type="text"
          label="Kilometro Final"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={kmFinal}
          fullWidth
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextFieldComponent
          id="inicioDeslocamento"
          type="text"
          label="Inicio do Deslocamento"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={inicioDeslocamento}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="fimDeslocamento"
          type="text"
          label="Fim do Deslocamento"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={fimDeslocamento}
          fullWidth
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextFieldComponent
          id="checkList"
          type="text"
          label="CheckList"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={checkList}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="motivo"
          type="text"
          label="Motivo"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={motivo}
          fullWidth
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextFieldComponent
          id="observacao"
          type="text"
          label="Observação"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={observacao}
          fullWidth
        />
      </AreaInputs>

      <AreaInputs>
        <WhiteTextFieldComponent
          id="idCliente"
          type="text"
          label="Cliente"
          value={objClient}
          inputProps={{ readOnly: true }}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="idCondutor"
          type="text"
          label="Condutor"
          value={objCondutor}
          inputProps={{ readOnly: true }}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="idVeiculo"
          type="text"
          label="Veiculo"
          value={objVeiculo}
          inputProps={{ readOnly: true }}
          fullWidth
        />
      </AreaInputs>

      <ButtonSubmit onClick={() => handleClose()} fullWidth>
        Fechar
      </ButtonSubmit>
    </ModalViewStyled>
  );
}
