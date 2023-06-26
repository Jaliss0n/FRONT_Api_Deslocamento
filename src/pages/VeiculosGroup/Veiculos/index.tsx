import { Button, Divider, Typography } from "@mui/material";
import { useForm, SubmitHandler, DeepPartial } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhiteTextFieldComponent } from "@/components/WTextField";
import axios from "axios";
import { useState } from "react";
import { anos, marcasDeCarros } from "@/data";
import Weather from "../../Weather";
import { Snackbars } from "@/components/Snackbars";
import { apiUrl } from "@/data/api";
import { AreaInputsVertical } from "@/pages/CondutorGroup/Condutor";
import {
  ButtonSubmitForm,
  CustomBox,
  CustomFormCard,
  TitleCard,
} from "@/pages/ClientsGroup/Clients";
import ReusableAutoComplete from "@/components/WhiteAutoComplete";

interface FormData {
  placa: string;
  marcaModelo: string;
  anoFabricacao: string;
  kmAtual: string;
}

export const createVeiculoSchema = z.object({
  placa: z
    .string()
    .min(7, "A placa precisa de no minino 7 digitos (MercoSul)!"),
  marcaModelo: z.string().nonempty("A Marca é obrigatória! "),
  anoFabricacao: z.string().nonempty("O Ano de Fabricação é obrigatório! "),
  kmAtual: z.string().nonempty("A Kilometragem atual é obrigatória! "),
});

export default function Veiculos() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createVeiculoSchema),
  });

  const onSubmit: SubmitHandler<DeepPartial<FormData>> = async (data) => {
    if (data.anoFabricacao !== undefined && data.kmAtual !== undefined) {
      const anoFabInt = parseInt(data.anoFabricacao);
      const kmAtualInt = parseInt(data.kmAtual);
      try {
        await axios
          .post(`${apiUrl}/Veiculo`, {
            placa: data.placa,
            marcaModelo: data.marcaModelo,
            anoFabricacao: anoFabInt,
            kmAtual: kmAtualInt,
          })
          .then((e) => {
            handleShowSnackbar();
          });
      } catch (error) {}
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleShowSnackbar = () => {
    setOpenSnackbar(true);
  };

  return (
    <CustomBox>
      <CustomFormCard onSubmit={handleSubmit(onSubmit)}>
        <TitleCard variant="body1">Cadastrar Veiculo</TitleCard>
        <Typography color="white">Preencha com os dados do Veiculo</Typography>
        <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
        <AreaInputsVertical>
          <WhiteTextFieldComponent
            id="placa"
            type="text"
            label="Placa do Veiculo"
            register={register}
            error={!!errors.placa}
            fullWidth
            helperText={errors.placa?.message?.toString()}
          />

          <ReusableAutoComplete
            id="marcaModelo"
            options={marcasDeCarros}
            label="Marca e Modelo do Veiculo"
            error={!!errors.marcaModelo}
            helperText={errors.marcaModelo?.message?.toString()}
            register={register}
          />

          <ReusableAutoComplete
            id="anoFabricacao"
            options={anos}
            label="Ano de Fabricação"
            error={!!errors.anoFabricacao}
            helperText={errors.anoFabricacao?.message?.toString()}
            register={register}
          />

          <WhiteTextFieldComponent
            id="kmAtual"
            type="number"
            label="Kilometragem Atual"
            register={register}
            error={!!errors.kmAtual}
            fullWidth
            helperText={errors.kmAtual?.message?.toString()}
          />
        </AreaInputsVertical>

        <ButtonSubmitForm
          sx={{ marginTop: "5%" }}
          variant="contained"
          color="inherit"
          type="submit"
        >
          Enviar
        </ButtonSubmitForm>
        <Snackbars
          openSnackbar={openSnackbar}
          handleSnackbarClose={handleSnackbarClose}
          message="Veiculo Cadastrado com sucesso!"
          description="Clique no botão visualizar para executar ações!"
          variant="success"
          visualizar={true}
          page={5}
        />
      </CustomFormCard>
      <Weather />
    </CustomBox>
  );
}
