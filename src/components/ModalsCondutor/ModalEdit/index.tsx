import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WhiteDatePicker, WhiteTextField } from "../../WTextField";
import {  Divider, Typography } from "@mui/material";
import { AutoCompleteWhiteStyles } from "../../autoCompleteWhite";
import { categorias } from "@/data";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { useState } from "react";
import { AreaInputsVertical } from "@/pages/CondutorGroup/Condutor";
import { ButtonSubmit, ModalEditiStyled } from "@/components/ModalsClient/ModalEdit";

dayjs.locale("pt-br");


interface PropsEdit {
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
    handleEditar: (response: {
      catergoriaHabilitacao: string;
      vencimentoHabilitacao: string;
    }, dataPic: string) => void;
}

export function ModalEdit({
  catergoriaHabilitacao,
  vencimentoHabilitacao,
  handleEditar
}: 
PropsEdit) {
  const [dataPic, setDataPic] = useState<string>("");

  const createCondutorSchemaUpdate = z.object({
    catergoriaHabilitacao: z
      .string()
      .nonempty("A Categoria da Habilitação é obrigatória!"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCondutorSchemaUpdate),
  });

  async function onSubmit(data: any) { //tipar
    handleEditar(data,dataPic);
  }
  
  return (
    <ModalEditiStyled onSubmit={handleSubmit(onSubmit)}>
      <Typography>Atualizar Condutor</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />

      <AreaInputsVertical>
        <AutoCompleteWhiteStyles
          disablePortal
          fullWidth
          id="catergoriaHabilitacao"
          options={categorias}
          sx={{
            margin: "2% 0",
          }}
          renderInput={(params) => (
            <WhiteTextField
              {...params}
              {...register("catergoriaHabilitacao")}
              error={!!errors.catergoriaHabilitacao}
              helperText={errors.catergoriaHabilitacao?.message?.toString()}
              label={
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                  {catergoriaHabilitacao.replace(/[\[\]"\s\\]/g, '')}
                </Typography>
              }
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <WhiteDatePicker
            label={
              <Typography color="white" variant="body1">
                {dayjs(vencimentoHabilitacao).format('DD/MM/YYYY')}
              </Typography>
            }
            slotProps={{
              textField: {
                helperText: errors.vencimentoHabilitacao?.message?.toString(),
                placeholder: "Dia/Mes/Ano",
              },
            }}
            sx={{ color: "white", margin: "2% 0", }}
            disablePast={!dayjs().isBefore(vencimentoHabilitacao, 'day')}
            onChange={(newValue: any) => setDataPic(newValue["$d"])}
          />
        </LocalizationProvider>
      </AreaInputsVertical>

      <ButtonSubmit fullWidth type="submit">
        Atualizar
      </ButtonSubmit>
    </ModalEditiStyled>
  );
}
