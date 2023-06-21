import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WhiteTextField } from "../../WTextField";
import { Divider, Typography } from "@mui/material";
import { AutoCompleteWhiteStyles } from "../../autoCompleteWhite";
import { AreaInputsVertical } from "@/pages/CondutorGroup/Condutor";
import {
  ButtonSubmit,
  ModalEditiStyled,
} from "@/components/ModalsClient/ModalEdit";
import { marcasDeCarros } from "@/data";
import { anos } from "@/data";


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
    //tipar
    handleEditar(data);
  } 

  return (
    <ModalEditiStyled onSubmit={handleSubmit(onSubmit)}>
      <Typography>Atualizar Veiculo</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />

      <AreaInputsVertical>
        <AutoCompleteWhiteStyles
          disablePortal
          fullWidth
          id="marcaModelo"
          defaultValue={marcaModelo}
          options={marcasDeCarros}
          sx={{
            margin: "2% 0",
          }}
          renderInput={(params) => (
            <WhiteTextField
              {...params}
              {...register("marcaModelo")}
              error={!!errors.marcaModelo}
              helperText={errors.marcaModelo?.message?.toString()}
              label={
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                  Marca e Modelo
                </Typography>
              }
            />
          )}
        />

        <AutoCompleteWhiteStyles
          disablePortal
          fullWidth
          id="anoFabricacao"
          options={anos}
          defaultValue={anoFabricacao}
          sx={{
            margin: "2% 0",
          }}
          renderInput={(params) => (
            <WhiteTextField
              {...params}
              {...register("anoFabricacao")}
              error={!!errors.anoFabricacao}
              helperText={errors.anoFabricacao?.message?.toString()}
              label={
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                  Ano de Fabricação
                </Typography>
              }
            />
          )}
        />

        <WhiteTextField
          id="kmAtual"
          type="number"
          fullWidth
          label={
            <Typography color="white" variant="body1">
              Kilometragem Atual
            </Typography>
          }
          defaultValue={kmAtual}
          variant="outlined"
          {...register("kmAtual")}
          error={!!errors.kmAtual}
          helperText={errors.kmAtual?.message?.toString()}
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
      </AreaInputsVertical>

      <ButtonSubmit fullWidth type="submit">
        Atualizar
      </ButtonSubmit>
    </ModalEditiStyled>
  );
}
