import { Button, Divider, Typography } from "@mui/material";
import { useForm, SubmitHandler, DeepPartial } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WhiteTextField,
  WhiteTextFieldComponent,
} from "@/components/WTextField";
import { AutoCompleteWhiteStyles } from "@/components/autoCompleteWhite";
import axios from "axios";
import { useEffect, useState } from "react";
import { Weather } from "../../Weather";
import { Snackbars } from "@/components/Snackbars";
import { apiUrl } from "@/data/api";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import {
  AreaInputs,
  CustomBox,
  CustomFormCard,
  TitleCard,
} from "@/pages/ClientsGroup/Clients";
import { WhiteDatePickerCompont } from "@/components/WhiteDatePicker";
import ReusableAutoComplete from "@/components/WhiteAutoComplete";

dayjs.locale("pt-br");

interface Cliente {
  id: number;
  nome: string;
}

interface Veiculo {
  id: number;
  placa: string;
}

interface FormData {
  kmInicial: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export const createDeslocamentoSchema = z.object({
  kmInicial: z.string().nonempty("A Kilometragem Inicial é obrigatória!"),
  checkList: z.string().nonempty("O CheckList é obrigatório!"),
  motivo: z.string().nonempty("O Motivo é obrigatório! "),
  observacao: z.string().nonempty("A Observação é obrigatória!"),
  idCondutor: z.string().nonempty("E necessario selecionar um Condutor!"),
  idVeiculo: z.string().nonempty("E necessario selecionar um Veiculo!"),
  idCliente: z.string().nonempty("E necessario selecionar um Cliente!"),
});

export default function Deslocamento() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dataPic, setDataPic] = useState<string>("");
  const [clientId, setClientId] = useState<number>(0);
  const [condutorId, setCondutorId] = useState<number>(0);
  const [veiculoId, setVeiculoId] = useState<number>(0);

  const [objClient, setObjClient] = useState<Cliente[]>([
    {
      id: 0,
      nome: "Carregando...",
    },
  ]);

  const [objCondutor, setObjCondutor] = useState<Cliente[]>([
    {
      id: 0,
      nome: "Carregando...",
    },
  ]);

  const [objVeiculo, setObjVeiculo] = useState<Veiculo[]>([
    {
      id: 0,
      placa: "Carregando...",
    },
  ]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createDeslocamentoSchema),
  });

  const onSubmit: SubmitHandler<DeepPartial<FormData>> = async (data) => {
    try {
      await axios
        .post(`${apiUrl}/Deslocamento/IniciarDeslocamento`, {
          kmInicial: data.kmInicial,
          inicioDeslocamento: dataPic,
          checkList: data.checkList,
          motivo: data.motivo,
          observacao: data.observacao,
          idCondutor: condutorId,
          idVeiculo: veiculoId,
          idCliente: clientId,
        })
        .then((e) => {
          handleShowSnackbar();
        });
    } catch (error) {}
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);
  const handleShowSnackbar = () => setOpenSnackbar(true);

  const handleOptionChange = (value: unknown, setID: (id: number) => void) => {
    if (value) {
      const selectedValue = value as Cliente;
      setID(selectedValue.id);
    }
  };

  async function getUsers() {
    try {
      const response = await axios.get(`${apiUrl}/Cliente`);
      const data = response.data;
      const idNameCliente = data.map((e: Cliente) => ({
        id: e.id,
        nome: e.nome,
      }));
      setObjClient(idNameCliente);

      const responseCondutor = await axios.get(`${apiUrl}/Condutor`);
      const dataCondutor = responseCondutor.data;
      const idNameCondutor = dataCondutor.map((e: Cliente) => ({
        id: e.id,
        nome: e.nome,
      }));
      setObjCondutor(idNameCondutor);

      const responseVeiculo = await axios.get(`${apiUrl}/Veiculo`);
      const dataVeiculo = responseVeiculo.data;
      const idNameVeiculo = dataVeiculo.map((e: Veiculo) => ({
        id: e.id,
        placa: e.placa,
      }));
      setObjVeiculo(idNameVeiculo);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <CustomBox>
      <CustomFormCard onSubmit={handleSubmit(onSubmit)}>
        <TitleCard variant="body1">Cadastrar Deslocamento</TitleCard>
        <Typography color="white">
          Preencha com os dados do Deslocamento
        </Typography>
        <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
        <AreaInputs>
          <WhiteTextFieldComponent
            id="kmInicial"
            type="number"
            label="Kilometro Inicial"
            register={register}
            error={!!errors.kmInicial}
            fullWidth
            helperText={errors.kmInicial?.message?.toString()}
          />

          <WhiteDatePickerCompont
            label="Inicio do Deslocamento"
            helperText={errors.vencimentoHabilitacao?.message?.toString()}
            setData={setDataPic}
          />
        </AreaInputs>
        <AreaInputs>
          <WhiteTextFieldComponent
            id="checkList"
            type="text"
            label="CheckList"
            register={register}
            error={!!errors.checkList}
            fullWidth
            helperText={errors.checkList?.message?.toString()}
          />

          <WhiteTextFieldComponent
            id="motivo"
            type="text"
            label="Motivo"
            register={register}
            error={!!errors.motivo}
            fullWidth
            helperText={errors.motivo?.message?.toString()}
          />
        </AreaInputs>

        <AreaInputs>
          <WhiteTextFieldComponent
            id="observacao"
            type="text"
            label="Observação"
            register={register}
            error={!!errors.observacao}
            fullWidth
            helperText={errors.observacao?.message?.toString()}
          />
        </AreaInputs>

        <Divider color="white" sx={{ margin: "2% 0 2% 0" }} />
        <Typography color="white">Selecione os usuarios</Typography>
        <AreaInputs>
          <AutoCompleteWhiteStyles
            disablePortal
            id="idCliente"
            fullWidth
            onChange={(_, value) => handleOptionChange(value, setClientId)}
            options={objClient}
            getOptionLabel={(option: any) => option.nome} //tipar
            sx={{
              margin: "2% 0",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
            }}
            renderInput={(params) => (
              <WhiteTextField
                {...params}
                {...register("idCliente")}
                error={!!errors.idCliente}
                helperText={errors.idCliente?.message?.toString()}
                label={
                  <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    Cliente
                  </Typography>
                }
              />
            )}
          />

          <AutoCompleteWhiteStyles
            disablePortal
            fullWidth
            id="idCondutor"
            options={objCondutor}
            getOptionLabel={(option: any) => option.nome} //tipar
            onChange={(_, value) => handleOptionChange(value, setCondutorId)}
            sx={{
              margin: "2% 0 2% 2%",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
            }}
            renderInput={(params) => (
              <WhiteTextField
                {...params}
                {...register("idCondutor")}
                error={!!errors.idCondutor}
                helperText={errors.idCondutor?.message?.toString()}
                label={
                  <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    Condutor
                  </Typography>
                }
              />
            )}
          />

          <AutoCompleteWhiteStyles
            disablePortal
            fullWidth
            id="idVeiculo"
            options={objVeiculo}
            getOptionLabel={(option: any) => option.placa}
            onChange={(_, value) => handleOptionChange(value, setVeiculoId)}
            sx={{
              margin: "2% 0 2% 2%",
              "@media (max-width: 900px)": {
                margin: "2% 0",
              },
            }}
            renderInput={(params) => (
              <WhiteTextField
                {...params}
                {...register("idVeiculo")}
                error={!!errors.idVeiculo}
                helperText={errors.idVeiculo?.message?.toString()}
                label={
                  <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    Veiculo
                  </Typography>
                }
              />
            )}
          />
        </AreaInputs>

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
          message="Deslocamento Cadastrado com sucesso!"
          description="Clique no botão visualizar para executar ações!"
          variant="success"
          visualizar={true}
          page={7}
        />
      </CustomFormCard>
      <Weather />
    </CustomBox>
  );
}
