import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { WhiteTextField } from "../../WTextField";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ButtonSubmit } from "../ModalEdit";

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
  }
`;

interface PropsView {
  tipoDocumento: string;
  numeroDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  handleClose: () => void;
}

export function ModalView({
  tipoDocumento,
  numeroDocumento,
  nome,
  logradouro,
  numero,
  bairro,
  cidade,
  uf,
  handleClose,
}: PropsView) {
  console.log(tipoDocumento);
  return (
    <ModalViewStyled>
      <Typography>Visualizar Cliente</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
      <AreaInputs>
        <WhiteTextField
          id="numero"
          fullWidth
          inputProps={{ readOnly: true }}
          type="number"
          label={
            <Typography color="white" variant="body1">
              {tipoDocumento}
            </Typography>
          }
          defaultValue={tipoDocumento}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="numeroDocumento"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Numero Documento
            </Typography>
          }
          defaultValue={numeroDocumento}
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
          id="nome"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Nome
            </Typography>
          }
          defaultValue={nome}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="logradouro"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Logradouro
            </Typography>
          }
          defaultValue={logradouro}
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
          id="numero"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Numero
            </Typography>
          }
          defaultValue={numero}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="bairro"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Bairro
            </Typography>
          }
          defaultValue={bairro}
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
          id="cidade"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Cidade
            </Typography>
          }
          defaultValue={cidade}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="cidade"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              UF
            </Typography>
          }
          defaultValue={uf}
          variant="outlined"
          sx={{
            margin: "2% 0 2% 2%",
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
