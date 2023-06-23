import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import {  WhiteTextField } from "../../WTextField";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ButtonSubmit } from "../../ModalsClient/ModalEdit";
import { ModalViewStyled } from "@/components/ModalsClient/ModalView";

interface PropsView {
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;

  handleClose: () => void;
}

export function ModalView({
  placa,
  marcaModelo,
  anoFabricacao,
  kmAtual,
  handleClose,
}: PropsView) {
  return (
    <ModalViewStyled>
      <Typography>Visualizar Veiculo</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
      <AreaInputs>
        <WhiteTextField
          id="placa"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Placa
            </Typography>
          }
          defaultValue={placa}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="marcaModelo"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Marca e Modelo
            </Typography>
          }
          defaultValue={marcaModelo}
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
          id="anoFabricacao"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Ano de Fabricação
            </Typography>
          }
          defaultValue={anoFabricacao}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="kmAtual"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Kilometragem Atual
            </Typography>
          }
          defaultValue={kmAtual}
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
