import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { WhiteTextFieldComponent } from "../../WTextField";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ButtonSubmit } from "../ModalEdit";

export const ModalViewStyled = styled(Box)`
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
    width: 90%;
    padding: 5%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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
  return (
    <ModalViewStyled>
      <Typography>Visualizar Cliente</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
      <AreaInputs>
        <WhiteTextFieldComponent
          id="tipoDocumento"
          type="text"
          label="Tipo de documento"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={tipoDocumento}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="numeroDocumento"
          type="text"
          label="Numero do documento"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={numeroDocumento}
          fullWidth
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextFieldComponent
          id="nome"
          type="text"
          label="Nome"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={nome}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="logradouro"
          type="text"
          label="Logradouro"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={logradouro}
          fullWidth
        />
      </AreaInputs>

      <AreaInputs>
        <WhiteTextFieldComponent
          id="numero"
          type="text"
          label="Numero"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={numero}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="bairro"
          type="text"
          label="Bairro"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={bairro}
          fullWidth
        />
      </AreaInputs>

      <AreaInputs>
        <WhiteTextFieldComponent
          id="cidade"
          type="text"
          label="Cidade"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={cidade}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="uf"
          type="text"
          label="UF"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={uf}
          fullWidth
        />
      </AreaInputs>
      <ButtonSubmit onClick={() => handleClose()} fullWidth>
        Fechar
      </ButtonSubmit>
    </ModalViewStyled>
  );
}
