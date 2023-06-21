import { CustomBox, TitleCard } from "../../ClientsGroup/Clients";
import { Weather } from "../../Weather";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import styled from "@emotion/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import ModalDelete from "@/components/ModalsClient/ModalDelete";
import { ModalEdit } from "../../../components/ModalsCondutor/ModalEdit";
import { Snackbars } from "@/components/Snackbars";
import { ModalView } from "../../../components/ModalsCondutor/ModalView";
import { apiUrl } from "@/data/api";
import {
  DataGridWhite,
  TableContainer,
} from "@/pages/ClientsGroup/TableClients";

interface TableCondutor {
  id: number;
  nome: string;
  catergoriaHabilitacao: string;
}

interface PropsView {
  id: number;
  catergoriaHabilitacao: string;
  nome: string;
  numeroHabilitacao: string;
  vencimentoHabilitacao: string;
}

export function TableCondutor() {
  const [openSnackbarDelete, setOpenSnackbarDelete] = React.useState(false);
  const [openSnackbarEdit, setOpenSnackbarEdit] = React.useState(false);
  const [openSnackbarEditErro, setOpenSnackbarEditErro] = React.useState(false);
  const [dataTable, setDataTable] = React.useState<TableCondutor[]>([
    {
      id: 0,
      nome: "Carregando",
      catergoriaHabilitacao: "Carregando",
    },
  ]);

  async function getClientsData() {
    try {
      await axios.get(`${apiUrl}/Condutor`).then((data) => {
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
      field: "nome",
      headerName: "Nome",
      width: 150,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "catergoriaHabilitacao",
      headerName: "Categoria da Habilitação",
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
          nome: "Carregando...",
          numeroHabilitacao: "Carregando...",
          catergoriaHabilitacao: "Carregando...",
          vencimentoHabilitacao: "Carregando...",
        });

        const handleVisualizar = async () => {
          try {
            await axios
              .get(`${apiUrl}/Condutor/${data.row.id}`)
              .then((data) => {
                setResponseView(data.data);
                handleOpenView();
              });
          } catch (error) {}
        };

        const handleEditar = async (response: any, dataPic: string) => {
          const newCategory = [data.row.catergoriaHabilitacao];
          newCategory.push(response.catergoriaHabilitacao);
          const jsonString = JSON.stringify(newCategory);
          try {
            await axios
              .put(`${apiUrl}/Condutor/${data.row.id}`, {
                id: data.row.id,
                categoriaHabilitacao: jsonString,
                vencimentoHabilitacao: dataPic,
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

        const handleApagar = async () => {
          try {
            await axios
              .delete(`${apiUrl}/Condutor/${data.row.id}`, {
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
                nome={responseView.nome}
                vencimentoHabilitacao={responseView.vencimentoHabilitacao}
                numeroHabilitacao={responseView.numeroHabilitacao}
                catergoriaHabilitacao={responseView.catergoriaHabilitacao}
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
                catergoriaHabilitacao={data.row.catergoriaHabilitacao}
                vencimentoHabilitacao={data.row.vencimentoHabilitacao}
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
                nome={data.row.nome}
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

  const dataFormatedTable = dataTable.map((data) => {
    data.catergoriaHabilitacao = data.catergoriaHabilitacao.replace(
      /[\[\]"\s\\]/g,
      ""
    );
    return data;
  });

  return (
    <CustomBox>
      <TableContainer>
        <TitleCard>Tabela Condutor</TitleCard>
        <DataGridWhite
          rows={dataFormatedTable}
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
        message="Condutor Apagado com sucesso!"
        variant="success"
        visualizar={false}
        page={0}

      />
      <Snackbars
        openSnackbar={openSnackbarEdit}
        handleSnackbarClose={handleSnackbarCloseEdit}
        message="Condutor Atualizado com sucesso!"
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
