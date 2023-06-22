import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { WhiteTextField } from "../../WTextField";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ButtonSubmit } from "../../ModalsClient/ModalEdit";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ModalViewStyled } from "@/components/ModalsClient/ModalView";
import { WhiteDatePicker, WhiteDatePickerCompont } from "@/components/WhiteDatePicker";

dayjs.locale("pt-br");


interface PropsView {
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;

  handleClose: () => void;
}

export function ModalView({
  nome,
  numeroHabilitacao,
  catergoriaHabilitacao,
  vencimentoHabilitacao,
  handleClose,
}: PropsView) {
  return (
    <ModalViewStyled>
      <Typography>Visualizar Condutor</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
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
          id="categoriaHabilitacao"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Categoria da Hablitação
            </Typography>
          }
          defaultValue={catergoriaHabilitacao.replace(/[\[\]"\s\\]/g, "")}
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
          id="numeroHabilitacao"
          fullWidth
          inputProps={{ readOnly: true }}
          label={
            <Typography color="white" variant="body1">
              Numero da Habilitação
            </Typography>
          }
          defaultValue={numeroHabilitacao}
          variant="outlined"
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <WhiteDatePicker
            label={
              <Typography color="white" variant="body1">
                {dayjs(vencimentoHabilitacao).format("DD/MM/YYYY")}
              </Typography>
            }
            slotProps={{
              textField: {
                placeholder: "Dia/Mes/Ano",
              },
            }}
            sx={{
              color: "white",
              margin: "2% 0% 2% 2% ",
              width: "100%",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
            }}
          />
        </LocalizationProvider>
      </AreaInputs>

      <ButtonSubmit onClick={() => handleClose()} fullWidth>
        Fechar
      </ButtonSubmit>
    </ModalViewStyled>
  );
}
