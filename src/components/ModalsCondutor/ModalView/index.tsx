import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { WhiteTextFieldComponent } from "../../WTextField";
import { Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ButtonSubmit } from "../../ModalsClient/ModalEdit";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { ModalViewStyled } from "@/components/ModalsClient/ModalView";
import {
  WhiteDatePickerCompont,
} from "@/components/WhiteDatePicker";

dayjs.locale("pt-br");

export const AutoModalViewStyled = styled(ModalViewStyled)`
  @media screen and (max-width: 900px) {
    height: auto;
  }
`;

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
    <AutoModalViewStyled>
      <Typography>Visualizar Condutor</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
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
          id="catergoriaHabilitacao"
          type="text"
          label="Categoria da Hablitação"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={catergoriaHabilitacao.replace(/[\[\]"\s\\]/g, "")}
          fullWidth
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextFieldComponent
          id="numeroHabilitacao"
          type="text"
          label="Numero da Habilitação"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={numeroHabilitacao}
          fullWidth
        />

        <WhiteDatePickerCompont
          label={dayjs(vencimentoHabilitacao).format("DD/MM/YYYY")}
        />
      </AreaInputs>

      <ButtonSubmit onClick={() => handleClose()} fullWidth>
        Fechar
      </ButtonSubmit>
    </AutoModalViewStyled>
  );
}
