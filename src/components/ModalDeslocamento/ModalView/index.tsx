import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { WhiteTextField } from "../../WTextField";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ButtonSubmit } from "../../ModalsClient/ModalEdit";
import dayjs from "dayjs";
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
      console.log(objCondutor);

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
        <WhiteTextField
          id="kmInicial"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Kilometro Inicial
            </Typography>
          }
          defaultValue={kmInicial}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="kmFinal"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Kilometro Final
            </Typography>
          }
          defaultValue={kmFinal}
          variant="outlined"
          sx={{
            margin: "2% 0 2% 2%",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextField
          id="inicioDeslocamento"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Inicio do Deslocamento
            </Typography>
          }
          defaultValue={dayjs(inicioDeslocamento).format("DD/MM/YYYY HH:mm")}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="fimDeslocamento"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Fim do Deslocamento
            </Typography>
          }
          defaultValue={dayjs(fimDeslocamento).format("DD/MM/YYYY HH:mm")}
          variant="outlined"
          sx={{
            margin: "2% 0 2% 2%",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextField
          id="checkList"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              CheckList
            </Typography>
          }
          defaultValue={checkList}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="motivo"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Motivo
            </Typography>
          }
          defaultValue={motivo}
          variant="outlined"
          sx={{
            margin: "2% 0 2% 2%",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextField
          id="observacao"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Observacao
            </Typography>
          }
          defaultValue={observacao}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
      </AreaInputs>

      <AreaInputs>
        <WhiteTextField
          id="idCliente"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Cliente
            </Typography>
          }
          value={objClient}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
        <WhiteTextField
          id="idCondutor"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Condutor
            </Typography>
          }
          value={objCondutor}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="idVeiculo"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Veiculo
            </Typography>
          }
          value={objVeiculo}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
      </AreaInputs>

      <ButtonSubmit onClick={() => handleClose()} fullWidth>
        Fechar
      </ButtonSubmit>
    </ModalViewStyled>
  );
}
