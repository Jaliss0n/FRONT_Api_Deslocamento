import { Box, Button, Divider, Typography } from "@mui/material";
import { useForm, SubmitHandler, DeepPartial } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "@emotion/styled";
import { WhiteDatePicker, WhiteTextField } from "@/components/WTextField";
import { AutoCompleteWhiteStyles } from "@/components/autoCompleteWhite";
import axios from "axios";
import { useState } from "react";
import { categorias } from "@/data";
import { Weather } from "../../Weather";
import { Snackbars } from "@/components/Snackbars";
import { apiUrl } from "@/data/api";
import {
  CustomBox,
  CustomFormCard,
  TitleCard,
} from "@/pages/ClientsGroup/Clients";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

export const AreaInputsVertical = styled(Box)`
  display: flex;
  flex-direction: column;
`;

dayjs.locale("pt-br");

export const createCondutorSchema = z.object({
  categoriaHabilitacao: z
    .string()
    .nonempty("A Categoria da Habilitação é obrigatória!"),
  numeroHabilitação: z
    .string()
    .min(8, "O Numero da habilitação deve ter pelo menos 10 caracteres"),
  nome: z.string().min(2, "O Nome deve ter pelo menos 2 caracteres"),
});

export default function Condutor() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dataPic, setDataPic] = useState<string>("");

  type FormData = {
    categoriaHabilitacao: string;
    nome: string;
    numeroHabilitação: string;
    vencimentoHabilitação?: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCondutorSchema),
  });

  const onSubmit: SubmitHandler<DeepPartial<FormData>> = async (data) => {
    try {
      await axios
        .post(`${apiUrl}/Condutor`, {
          nome: data.nome,
          numeroHabilitacao: data.numeroHabilitação,
          categoriaHabilitacao: data.categoriaHabilitacao,
          vencimentoHabilitacao: dataPic,
        })
        .then((e) => {
          handleShowSnackbar();
        });
    } catch (error) {}
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
        <TitleCard variant="body1">Cadastrar Condutor</TitleCard>
        <Typography color="white">Preencha com os dados do Condutor</Typography>
        <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
        <AreaInputsVertical>
          <WhiteTextField
            id="nome"
            fullWidth
            label={
              <Typography color="white" variant="body1">
                Nome
              </Typography>
            }
            variant="outlined"
            {...register("nome")}
            error={!!errors.nome}
            helperText={errors.nome?.message?.toString()}
            sx={{
              margin: "2% 2% 2% 0",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
            }}
          />

          <AutoCompleteWhiteStyles
            disablePortal
            id="categoriaHabilitacao"
            options={categorias}
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
                {...register("categoriaHabilitacao")}
                error={!!errors.categoriaHabilitacao}
                helperText={errors.categoriaHabilitacao?.message?.toString()}
                label={
                  <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    Categoria da Habilitação
                  </Typography>
                }
              />
            )}
          />

          <WhiteTextField
            id="numeroHabilitação"
            fullWidth
            label={
              <Typography color="white" variant="body1">
                Numero da Habilitação
              </Typography>
            }
            variant="outlined"
            {...register("numeroHabilitação")}
            error={!!errors.numeroHabilitação}
            helperText={errors.numeroHabilitação?.message?.toString()}
            sx={{
              margin: "2% 2% 2% 0",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
            }}
          />

          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <WhiteDatePicker
              label={
                <Typography color="white" variant="body1">
                  Vencimento da Habilitação
                </Typography>
              }
              slotProps={{
                textField: {
                  helperText: errors.vencimentoHabilitacao?.message?.toString(),
                  placeholder: "Dia/Mes/Ano",
                },
              }}
              sx={{
                color: "white",
                width: "100%",
                margin: "2% 2% 2% 0",
                "@media (max-width: 900px)": {
                  margin: "2% 0",
                },
              }}
              disablePast={true}
              onChange={(newValue: any) => setDataPic(newValue["$d"])}
            />
          </LocalizationProvider>
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
          message="Condutor Cadastrado com sucesso!"
          description="Clique no botão visualizar para executar ações!"
          variant="success"
          visualizar={true}
          page={3}
        />
      </CustomFormCard>
      <Weather />
    </CustomBox>
  );
}
