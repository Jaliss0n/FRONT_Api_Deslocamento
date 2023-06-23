import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WhiteTextFieldComponent } from "../../WTextField";
import { Divider, Typography } from "@mui/material";
import { AreaInputsVertical } from "@/pages/CondutorGroup/Condutor";
import {
  ButtonSubmit,
  ModalEditiStyled,
} from "@/components/ModalsClient/ModalEdit";
import { marcasDeCarros } from "@/data";
import { anos } from "@/data";
import ReusableAutoComplete from "@/components/WhiteAutoComplete";

interface PropsEdit {
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
  handleEditar: (response: {
    marcaModelo: string;
    anoFabricacao: number;
    kmAtual: string;
  }) => void;
}

export function ModalEdit({
  marcaModelo,
  anoFabricacao,
  kmAtual,
  handleEditar,
}: PropsEdit) {
  const createVeiculosSchemaUpdate = z.object({
    marcaModelo: z.string().nonempty("A Marca é obrigatória! "),
    anoFabricacao: z.string().nonempty("O Ano de Fabricação é obrigatório! "),
    kmAtual: z.string().nonempty("A Kilometragem atual é obrigatória! "),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createVeiculosSchemaUpdate),
  });

  async function onSubmit(data: any) {
    handleEditar(data);
  }

  return (
    <ModalEditiStyled onSubmit={handleSubmit(onSubmit)}>
      <Typography>Atualizar Veiculo</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />

      <AreaInputsVertical>
        <ReusableAutoComplete
          id="marcaModelo"
          options={marcasDeCarros}
          label="Marca e Modelo"
          error={!!errors.marcaModelo}
          helperText={errors.marcaModelo?.message?.toString()}
          register={register}
          defaultValue={marcaModelo}
        />
        
        <ReusableAutoComplete
          id="anoFabricacao"
          options={anos}
          label="Ano de Fabricação"
          error={!!errors.anoFabricacao}
          helperText={errors.anoFabricacao?.message?.toString()}
          register={register}
          defaultValue={anoFabricacao.toString()}
        />

        <WhiteTextFieldComponent
          id="kmAtual"
          type="number"
          label="Kilometragem Atual"
          defaultValue={kmAtual.toString()}
          register={register}
          error={!!errors.kmAtual}
          fullWidth
          helperText={errors.kmAtual?.message?.toString()}
        />
      </AreaInputsVertical>

      <ButtonSubmit fullWidth type="submit">
        Atualizar
      </ButtonSubmit>
    </ModalEditiStyled>
  );
}
