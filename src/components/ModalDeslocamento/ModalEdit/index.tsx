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
import { WhiteDatePickerCompont } from "@/components/WhiteDatePicker";
import { useState } from "react";

interface PropsEdit {
  handleEditar: (
    response: {
      kmFinal: number;
      observacao: string;
    },
    dataPicCo: any
  ) => void;
}

export function ModalEdit({ handleEditar }: PropsEdit) {
  const [dataPic, setDataPic] = useState<unknown>();

  const createDeslocamentoSchemaUpdate = z.object({
    kmFinal: z.string().nonempty("A Marca é obrigatória! "),
    observacao: z.string().nonempty("A Kilometragem atual é obrigatória! "),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createDeslocamentoSchemaUpdate),
  });

  async function onSubmit(data: any) {
    const dataPicCo = dataPic as any; //TIPAR
    handleEditar(data, dataPicCo["$d"]);
  }

  return (
    <ModalEditiStyled onSubmit={handleSubmit(onSubmit)}>
      <Typography>Encerrar Deslocamento</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />

      <AreaInputsVertical>
        <WhiteTextFieldComponent
          id="kmFinal"
          type="number"
          label="Kilometragem Final"
          register={register}
          error={!!errors.kmFinal}
          fullWidth
          helperText={errors.kmFinal?.message?.toString()}
        />

        <WhiteTextFieldComponent
          id="observacao"
          type="text"
          label="Observação"
          register={register}
          error={!!errors.observacao}
          fullWidth
          helperText={errors.observacao?.message?.toString()}
        />

        <WhiteDatePickerCompont
          label="Fim do Deslocamento"
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
