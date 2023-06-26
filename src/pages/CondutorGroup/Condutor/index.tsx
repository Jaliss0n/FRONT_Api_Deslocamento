import { Box, Divider, Typography } from "@mui/material";
import { useForm, SubmitHandler, DeepPartial } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "@emotion/styled";
import { WhiteTextFieldComponent } from "@/components/WTextField";
import axios from "axios";
import { useState } from "react";
import { categorias } from "@/data";
import Weather from "../../Weather";
import { Snackbars } from "@/components/Snackbars";
import { apiUrl } from "@/data/api";
import {
  ButtonSubmitForm,
  CustomBox,
  CustomFormCard,
  TitleCard,
} from "@/pages/ClientsGroup/Clients";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import ReusableAutoComplete from "@/components/WhiteAutoComplete";
import { WhiteDatePickerCompont } from "@/components/WhiteDatePicker";

export const AreaInputsVertical = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

dayjs.locale("pt-br");

export const createCondutorSchema = z.object({
  categoriaHabilitacao: z
    .string()
    .nonempty("A Categoria da Habilitação é obrigatória!"),
  numeroHabilitação: z
    .string()
    .min(11, "O Numero da habilitação deve ter pelo menos 11 caracteres"),
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
          <WhiteTextFieldComponent
            id="nome"
            type="text"
            label="Nome"
            register={register}
            error={!!errors.nome}
            fullWidth
            helperText={errors.nome?.message?.toString()}
          />

          <ReusableAutoComplete
            id="categoriaHabilitacao"
            options={categorias}
            label="Categoria da Habilitação"
            error={!!errors.categoriaHabilitacao}
            helperText={errors.categoriaHabilitacao?.message?.toString()}
            register={register}
          />

          <WhiteTextFieldComponent
            id="numeroHabilitação"
            type="text"
            label="Numero da Habilitação"
            register={register}
            error={!!errors.numeroHabilitação}
            fullWidth
            helperText={errors.numeroHabilitação?.message?.toString()}
          />

          <WhiteDatePickerCompont
            label="Vencimento da Habilitação"
            helperText={errors.vencimentoHabilitacao?.message?.toString()}
            setData={setDataPic}
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
