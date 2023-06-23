import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {  Divider, Typography } from "@mui/material";
import { categorias } from "@/data";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { useState } from "react";
import { AreaInputsVertical } from "@/pages/CondutorGroup/Condutor";
import { ButtonSubmit, ModalEditiStyled } from "@/components/ModalsClient/ModalEdit";
import { WhiteDatePickerCompont } from "@/components/WhiteDatePicker";
import ReusableAutoComplete from "@/components/WhiteAutoComplete";

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

  async function onSubmit(data: any) {
    handleEditar(data,dataPic);
  }
  
  return (
    <ModalEditiStyled onSubmit={handleSubmit(onSubmit)}>
      <Typography>Atualizar Condutor</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />

      <AreaInputsVertical>
        <ReusableAutoComplete
          id="catergoriaHabilitacao"
          options={categorias}
          label="Adicionar Categoria de Habilitação"
          error={!!errors.catergoriaHabilitacao}
          helperText={errors.catergoriaHabilitacao?.message?.toString()}
          register={register}
          defaultValue={catergoriaHabilitacao}
        />
        
        <WhiteDatePickerCompont
          label={dayjs(vencimentoHabilitacao).format('DD/MM/YYYY')}
          helperText={errors.vencimentoHabilitacao?.message?.toString()}
          setData={setDataPic}
        />
      </AreaInputsVertical>

      <ButtonSubmit fullWidth type="submit">
        Atualizar
      </ButtonSubmit>
    </ModalEditiStyled>
  );
}
