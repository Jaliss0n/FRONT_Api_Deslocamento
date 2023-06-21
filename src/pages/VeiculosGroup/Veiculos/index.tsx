import { Button, Divider, Typography } from "@mui/material";
import { useForm, SubmitHandler, DeepPartial } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhiteTextField } from "@/components/WTextField";
import { AutoCompleteWhiteStyles } from "@/components/autoCompleteWhite";
import axios from "axios";
import { useState } from "react";
import { anos, marcasDeCarros } from "@/data";
import { Weather } from "../../Weather";
import { Snackbars } from "@/components/Snackbars";
import { apiUrl } from "@/data/api";
import { AreaInputsVertical } from "@/pages/CondutorGroup/Condutor";
import {
  CustomBox,
  CustomFormCard,
  TitleCard,
} from "@/pages/ClientsGroup/Clients";

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

  type FormData = {
    placa: string;
    marcaModelo: string;
    anoFabricacao: string;
    kmAtual: string;
  };

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
          <WhiteTextField
            id="placa"
            fullWidth
            label={
              <Typography color="white" variant="body1">
                Placa do Veiculo
              </Typography>
            }
            variant="outlined"
            {...register("placa")}
            error={!!errors.placa}
            helperText={errors.placa?.message?.toString()}
            sx={{
              margin: "2% 2% 2% 0",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
            }}
          />

          <AutoCompleteWhiteStyles
            disablePortal
            id="marcaModelo"
            options={marcasDeCarros}
            fullWidth
            sx={{
              margin: "2% 2% 2% 0",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
            }}
            renderInput={(params) => (
              <WhiteTextField
                {...params}
                {...register("marcaModelo")}
                error={!!errors.marcaModelo}
                helperText={errors.marcaModelo?.message?.toString()}
                label={
                  <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    Marca e Modelo do Veiculo
                  </Typography>
                }
              />
            )}
          />

          <AutoCompleteWhiteStyles
            disablePortal
            id="anoFabricacao"
            itemType="number"
            options={anos}
            fullWidth
            sx={{
              margin: "2% 2% 2% 0",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
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
            fullWidth
            type="number"
            label={
              <Typography color="white" variant="body1">
                Kilometragem Atual
              </Typography>
            }
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

        <Button
          sx={{ marginTop: "5%" }}
          variant="contained"
          color="inherit"
          type="submit"
        >
          Enviar
        </Button>
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