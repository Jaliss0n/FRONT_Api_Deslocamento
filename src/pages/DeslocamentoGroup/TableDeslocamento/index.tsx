import { CustomBox, TitleCard } from "../../ClientsGroup/Clients";
import Weather from "../../Weather";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import {  Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import ModalDelete from "@/components/ModalsClient/ModalDelete";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Snackbars } from "@/components/Snackbars";
import { apiUrl } from "@/data/api";
import {
  DataGridWhite,
  TableContainer,
} from "@/pages/ClientsGroup/TableClients";
import { ModalEdit } from "@/components/ModalDeslocamento/ModalEdit";
import { ModalView } from "@/components/ModalDeslocamento/ModalView";

interface TableDeslocamento {
  id: number;
  checkList: string;
  motivo: string;
}

interface PropsView extends TableDeslocamento {
  kmInicial: number;
  kmFinal: string;
  fimDeslocamento: string;
  inicioDeslocamento: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

interface PropsEdit {
  kmFinal: number;
  observacao: string;
}

export default function TableDeslocamentos() {

  const [openSnackbarDelete, setOpenSnackbarDelete] = React.useState(false);
  const [openSnackbarEdit, setOpenSnackbarEdit] = React.useState(false);
  const [openSnackbarEditErro, setOpenSnackbarEditErro] = React.useState(false);
  const [dataTable, setDataTable] = React.useState<TableDeslocamento[]>([
    {
      id: 0,
      motivo: "Carregando",
      checkList: "Carregando",
    },
  ]);

  async function getClientsData() {
    try {
      await axios.get(`${apiUrl}/Deslocamento`).then((data) => {
        const response = data.data;
        setDataTable(response);
      });
    } catch (error) {}
  }

  React.useEffect(() => {
    getClientsData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "motivo",
      headerName: "Motivo",
      width: 150,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "checkList",
      headerName: "ChekList",
      width: 150,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "acoes",
      headerName: "Ações",
      minWidth: 180,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (data) => {
        const [openDelete, setOpenDelete] = React.useState(false);
        const handleOpenDelete = () => setOpenDelete(true);
        const handleCloseDelete = () => setOpenDelete(false);

        const [openEdit, setOpenEdit] = React.useState(false);
        const handleOpenEdit = () => setOpenEdit(true);
        const handleCloseEdit = () => setOpenEdit(false);

        const [openView, setOpenView] = React.useState(false);
        const handleOpenView = () => setOpenView(true);
        const handleCloseView = () => setOpenView(false);
        const [responseView, setResponseView] = React.useState<PropsView>({
          id: 0,
          kmInicial: 0,
          kmFinal: "0",
          fimDeslocamento: "",
          checkList: "",
          motivo: "",
          observacao: "",
          idCondutor: 0,
          idVeiculo: 0,
          idCliente: 0,
          inicioDeslocamento: "",
        });

        const handleVisualizar = async () => {
          try {
            await axios
              .get(`${apiUrl}/Deslocamento/${data.row.id}`)
              .then((data) => {
                setResponseView(data.data);
                handleOpenView();
              });
          } catch (error) {}
        };

        const handleEditar = async (response: PropsEdit, dataPicco: any) => {
          try {
            await axios
              .put(
                `${apiUrl}/Deslocamento/${data.row.id}/EncerrarDeslocamento`,
                {
                  id: data.row.id,
                  kmFinal: response.kmFinal,
                  fimDeslocamento: dataPicco,
                  observacao: response.observacao,
                }
              )
              .then(() => {
                handleShowSnackbarEdit();
                handleCloseEdit();
                getClientsData();
              });
          } catch (error) {
            console.log(error);
            handleShowSnackbarEditErro();
          }
        };

        const handleApagar = async () => {
          try {
            await axios
              .delete(`${apiUrl}/Deslocamento/${data.row.id}`, {
                data: { id: data.row.id },
              })
              .then(() => {
                handleShowSnackbarDelete();
                getClientsData();
              });
          } catch (error) {}
        };

        return (
          <>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                color="inherit"
                sx={{ color: "black", margin: "0 2%" }}
                variant="contained"
                onClick={() => handleVisualizar()}
              >
                <VisibilityIcon sx={{ color: "#464242" }} />
              </Button>
              <Button
                color="primary"
                sx={{ margin: "0 2%" }}
                variant="contained"
                onClick={() => handleOpenEdit()}
              >
                <AssignmentTurnedInIcon />
              </Button>
              <Button
                color="error"
                sx={{ margin: "0 2%" }}
                variant="contained"
                onClick={() => handleOpenDelete()}
              >
                <DeleteIcon />
              </Button>
            </ButtonGroup>

            <Modal
              open={openView}
              onClose={handleCloseView}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalView
                idCliente={responseView.idCliente}
                idCondutor={responseView.idCondutor}
                idVeiculo={responseView.idVeiculo}
                motivo={responseView.motivo}
                observacao={responseView.observacao}
                checkList={responseView.checkList}
                fimDeslocamento={responseView.fimDeslocamento}
                inicioDeslocamento={responseView.inicioDeslocamento}
                kmFinal={responseView.kmFinal}
                kmInicial={responseView.kmInicial}
                handleClose={handleCloseView}
              />
            </Modal>

            <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalEdit handleEditar={handleEditar} />
            </Modal>

            <Modal
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalDelete
                nome={data.row.motivo}
                handleApagar={handleApagar}
                handleCloseDelete={handleCloseDelete}
              />
            </Modal>
          </>
        );
      },
    },
  ];

  const handleSnackbarCloseDelete = () => setOpenSnackbarDelete(false);
  const handleShowSnackbarDelete = () => setOpenSnackbarDelete(true);
  const handleSnackbarCloseEdit = () => setOpenSnackbarEdit(false);
  const handleShowSnackbarEdit = () => setOpenSnackbarEdit(true);
  const handleSnackbarCloseEditErro = () => setOpenSnackbarEditErro(false);
  const handleShowSnackbarEditErro = () => setOpenSnackbarEditErro(true);

  return (
    <CustomBox>
      <TableContainer>
        <TitleCard>Tabela Deslocamentos</TitleCard>
        <DataGridWhite
          rows={dataTable}
          columns={columns}
          autoHeight
          sx={{ color: "white", border: "none" }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </TableContainer>
      <Snackbars
        openSnackbar={openSnackbarDelete}
        handleSnackbarClose={handleSnackbarCloseDelete}
        message="Deslocamento Apagado com sucesso!"
        variant="success"
        visualizar={false}
        page={0}
      />
      <Snackbars
        openSnackbar={openSnackbarEdit}
        handleSnackbarClose={handleSnackbarCloseEdit}
        message="Deslocamento Atualizado com sucesso!"
        variant="success"
        visualizar={false}
        page={0}
      />
      <Snackbars
        openSnackbar={openSnackbarEditErro}
        handleSnackbarClose={handleSnackbarCloseEditErro}
        message="A Data de validade não pode ser menor que a atual!"
        variant="warning"
        visualizar={false}
        page={0}
      />
      <Weather />
    </CustomBox>
  );
}
