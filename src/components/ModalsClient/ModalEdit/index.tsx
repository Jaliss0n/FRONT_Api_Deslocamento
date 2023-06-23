import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {  WhiteTextFieldComponent } from "../../WTextField";
import { Button, Divider, Typography } from "@mui/material";
import { estados } from "@/data";
import styled from "@emotion/styled";
import ReusableAutoComplete from "@/components/WhiteAutoComplete";

export const ModalEditiStyled = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  background-color: #2ca4ac;
  padding: 2%;
  border-radius: 12px;
  color: white;

  @media screen and (max-width: 900px) {
    width: 80%;
    padding: 5%;
  }
`;

export const ButtonSubmit = styled(Button)`
  margin-top: 1%;
  background-color: #3747c0;
  color: white;
  :hover {
    background-color: #2534a6;
  }
`;

interface PropsEdit {
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  handleEditar: (data: {
    nome: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
  }) => void;
}

export function ModalEdit({
  nome,
  logradouro,
  numero,
  bairro,
  cidade,
  uf,
  handleEditar,
}: PropsEdit) {
  const createClientSchemaUpdate = z.object({
    nome: z.string().min(2, "O Nome deve ter pelo menos 2 caracteres"),
    logradouro: z.string().nonempty("O Logradouro é obrigatório! "),
    numero: z.string().nonempty("O Número é obrigatório!"),
    bairro: z.string().nonempty("O Bairro é obrigatório!"),
    cidade: z.string().nonempty("A cidade é obrigatória!"),
    uf: z.string().nonempty("O Estado é obrigatório!"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createClientSchemaUpdate),
  });

  async function onSubmit(data: any) {
    handleEditar(data);
  }

  return (
    <ModalEditiStyled onSubmit={handleSubmit(onSubmit)}>
      <Typography>Atualizar Cliente</Typography>
      <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />

      <AreaInputs>
        <WhiteTextFieldComponent
          id="nome"
          type="text"
          label="Nome"
          defaultValue={nome}
          register={register}
          error={!!errors.nome}
          fullWidth
          helperText={errors.nome?.message?.toString()}
        />

        <WhiteTextFieldComponent
          id="logradouro"
          type="text"
          label="Logradouro"
          defaultValue={logradouro}
          register={register}
          error={!!errors.logradouro}
          fullWidth
          helperText={errors.logradouro?.message?.toString()}
        />
      </AreaInputs>

      <AreaInputs>
        <WhiteTextFieldComponent
          id="numero"
          type="number"
          label="Numero"
          defaultValue={numero}
          register={register}
          error={!!errors.numero}
          fullWidth
          helperText={errors.numero?.message?.toString()}
        />

        <WhiteTextFieldComponent
          id="bairro"
          type="text"
          label="Bairro"
          defaultValue={bairro}
          register={register}
          error={!!errors.bairro}
          fullWidth
          helperText={errors.bairro?.message?.toString()}
        />
      </AreaInputs>

      <AreaInputs>
        <WhiteTextFieldComponent
          id="cidade"
          type="text"
          label="Cidade"
          defaultValue={cidade}
          register={register}
          error={!!errors.cidade}
          fullWidth
          helperText={errors.cidade?.message?.toString()}
        />

        <ReusableAutoComplete
          id="uf"
          options={estados}
          label="UF"
          error={!!errors.uf}
          helperText={errors.uf?.message?.toString()}
          register={register}
          defaultValue={uf}
        />
      </AreaInputs>
      <ButtonSubmit fullWidth type="submit">
        Atualizar
      </ButtonSubmit>
    </ModalEditiStyled>
  );
}
