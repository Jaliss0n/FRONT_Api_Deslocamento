import { AreaInputs } from "@/pages/ClientsGroup/Clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WhiteTextField } from "../../WTextField";
import { Button, Divider, Typography } from "@mui/material";
import { AutoCompleteWhiteStyles } from "../../autoCompleteWhite";
import { estados } from "@/data";
import styled from "@emotion/styled";

const ModalEditiStyled = styled.form`
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
        <WhiteTextField
          id="nome"
          fullWidth
          label={
            <Typography color="white" variant="body1">
              Nome
            </Typography>
          }
          defaultValue={nome}
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

        <WhiteTextField
          id="logradouro"
          fullWidth
          label={
            <Typography color="white" variant="body1">
              Logradouro
            </Typography>
          }
          defaultValue={logradouro}
          variant="outlined"
          {...register("logradouro")}
          error={!!errors.logradouro}
          helperText={errors.logradouro?.message?.toString()}
          sx={{
            margin: "2% 0 2% 2%",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
      </AreaInputs>

      <AreaInputs>
        <WhiteTextField
          id="numero"
          fullWidth
          type="number"
          label={
            <Typography color="white" variant="body1">
              Numero
            </Typography>
          }
          defaultValue={numero}
          variant="outlined"
          {...register("numero")}
          error={!!errors.numero}
          helperText={errors.numero?.message?.toString()}
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <WhiteTextField
          id="bairro"
          fullWidth
          label={
            <Typography color="white" variant="body1">
              Bairro
            </Typography>
          }
          defaultValue={bairro}
          variant="outlined"
          {...register("bairro")}
          error={!!errors.bairro}
          helperText={errors.bairro?.message?.toString()}
          sx={{
            margin: "2% 0 2% 2%",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />
      </AreaInputs>

      <AreaInputs>
        <WhiteTextField
          id="cidade"
          fullWidth
          label={
            <Typography color="white" variant="body1">
              Cidade
            </Typography>
          }
          defaultValue={cidade}
          variant="outlined"
          {...register("cidade")}
          error={!!errors.cidade}
          helperText={errors.cidade?.message?.toString()}
          sx={{
            margin: "2% 2% 2% 0",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
        />

        <AutoCompleteWhiteStyles
          disablePortal
          id="uf"
          options={estados}
          sx={{
            margin: "2% 0 2% 2%",
            "@media (max-width: 900px)": {
              margin: "2% 0",
            },
          }}
          renderInput={(params) => (
            <WhiteTextField
              {...params}
              {...register("uf")}
              error={!!errors.uf}
              helperText={errors.uf?.message?.toString()}
              label={
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                  {uf}
                </Typography>
              }
            />
          )}
        />
      </AreaInputs>
      <ButtonSubmit fullWidth type="submit">
        Atualizar
      </ButtonSubmit>
    </ModalEditiStyled>
  );
}
