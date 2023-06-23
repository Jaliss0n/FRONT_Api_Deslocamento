import { CustomBox, TitleCard } from "../../ClientsGroup/Clients";
import Weather from "../../Weather";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import {  Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import ModalDelete from "@/components/ModalsClient/ModalDelete";
import { Snackbars } from "@/components/Snackbars";
import { apiUrl } from "@/data/api";
import {
  DataGridWhite,
  TableContainer,
} from "@/pages/ClientsGroup/TableClients";
import { ModalEdit } from "@/components/ModalsVeiculo/ModalEdit";
import { ModalView } from "@/components/ModalsVeiculo/ModalView";

interface TableVeiculos {
  id: number;
  placa: string;
  marcaModelo: string;
}

interface PropsView extends TableVeiculos {
  anoFabricacao: number;
  kmAtual: number;
}
interface PropsEdit {
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: string;
}

export default function TableVeiculos() {
  const [openSnackbarDelete, setOpenSnackbarDelete] = React.useState(false);
  const [openSnackbarEdit, setOpenSnackbarEdit] = React.useState(false);
  const [openSnackbarEditErro, setOpenSnackbarEditErro] = React.useState(false);
  const [dataTable, setDataTable] = React.useState<TableVeiculos[]>([
    {
      id: 0,
      placa: "Carregando",
      marcaModelo: "Carregando",
    },
  ]);

  async function getClientsData() {
    try {
      await axios.get(`${apiUrl}/Veiculo`).then((data) => {
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
      field: "placa",
      headerName: "Placa",
      width: 150,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "marcaModelo",
      headerName: "Marca e Modelo",
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
          placa: "Carregando...",
          marcaModelo: "Carregando...",
          anoFabricacao: 0,
          kmAtual: 0,
        });

        const handleVisualizar = async () => {
          try {
            await axios.get(`${apiUrl}/Veiculo/${data.row.id}`).then((data) => {
              setResponseView(data.data);
              handleOpenView();
            });
          } catch (error) {}
        };

        const handleEditar = async (response: PropsEdit) => {
            if(response.kmAtual !== undefined) {
                const kmAtualInt = parseInt(response.kmAtual);
                try {
                  await axios
                    .put(`${apiUrl}/Veiculo/${data.row.id}`, {
                        id: data.row.id,
                        anoFabricacao: response.anoFabricacao,
                        kmAtual: kmAtualInt,
                        marcaModelo: response.marcaModelo
                    })
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

            }

        const handleApagar = async () => {
          try {
            await axios
              .delete(`${apiUrl}/Veiculo/${data.row.id}`, {
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
                <EditIcon />
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
                placa={responseView.placa}
                marcaModelo={responseView.marcaModelo}
                anoFabricacao={responseView.anoFabricacao}
                kmAtual={responseView.kmAtual}
                handleClose={handleCloseView}
              />
            </Modal>

            <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalEdit
                marcaModelo={data.row.marcaModelo}
                anoFabricacao={data.row.anoFabricacao}
                kmAtual={data.row.kmAtual}
                handleEditar={handleEditar}
              />
            </Modal>

            <Modal
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalDelete
                nome={data.row.marcaModelo}
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
        <TitleCard>Tabela Veiculos</TitleCard>
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
        message="Veiculo Apagado com sucesso!"
        variant="success"
        visualizar={false}
        page={0}
      />
      <Snackbars
        openSnackbar={openSnackbarEdit}
        handleSnackbarClose={handleSnackbarCloseEdit}
        message="Veiculo Atualizado com sucesso!"
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
