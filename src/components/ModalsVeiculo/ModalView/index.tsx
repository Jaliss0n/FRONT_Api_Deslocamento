import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { WhiteTextFieldComponent } from "../../WTextField";
import { Divider, Typography } from "@mui/material";
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
        <WhiteTextFieldComponent
          id="placa"
          type="text"
          label="Placa"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={placa}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="marcaModelo"
          type="text"
          label="Marca e Modelo"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={marcaModelo}
          fullWidth
        />
      </AreaInputs>
      <AreaInputs>
        <WhiteTextFieldComponent
          id="anoFabricacao"
          type="text"
          label="Ano de Fabricação"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={anoFabricacao.toString()}
          fullWidth
        />

        <WhiteTextFieldComponent
          id="kmAtual"
          type="text"
          label="Kilometragem Atual"
          register={null}
          inputProps={{ readOnly: true }}
          defaultValue={kmAtual.toString()}
          fullWidth
        />
      </AreaInputs>

      <ButtonSubmit onClick={() => handleClose()} fullWidth>
        Fechar
      </ButtonSubmit>
    </ModalViewStyled>
  );
}
