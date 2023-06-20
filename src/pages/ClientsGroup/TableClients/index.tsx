import { CustomBox, TitleCard } from "../Clients";
import { Weather } from "../../Weather";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import styled from "@emotion/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import ModalDelete from "@/components/ModalsClient/ModalDelete";
import { ModalEdit } from "@/components/ModalsClient/ModalEdit";
import { Snackbars } from "@/components/Snackbars";
import { ModalView } from "@/components/ModalsClient/ModalView";
import { apiUrl } from "@/data/api";

const TableContainer = styled(Box)`
  position: relative;
  width: 70%;
  background-color: #384ce3;
  border-radius: 12px;
  padding: 3%;

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100vh;
    border-radius: 0px;
  }
`;


const DataGridWhite = styled(DataGrid)({
  "& .MuiTablePagination-selectLabel.css-pdct74-MuiTablePagination-selectLabel, .MuiSelect-select.MuiTablePagination-select.MuiSelect-standard.MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input, .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiSelect-icon.MuiTablePagination-selectIcon.MuiSelect-iconStandard.css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon, .MuiTablePagination-displayedRows.css-levciy-MuiTablePagination-displayedRows, .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-i4bv87-MuiSvgIcon-root":
    {
      color: "white",
    },
});

interface TableClients {
  id: number;
  nome: string;
  cidade: string;
}

interface PropsEdit {
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface PropsView extends PropsEdit {
  numeroDocumento: string;
  tipoDocumento: string;
}

export function TableClients() {
  const [openSnackbarDelete, setOpenSnackbarDelete] = React.useState(false);
  const [openSnackbarEdit, setOpenSnackbarEdit] = React.useState(false);
  const [dataTable, setDataTable] = React.useState<TableClients[]>([
    {
      id: 0,
      nome: "Carregando",
      cidade: "Carregando",
    },
  ]);

  async function getClientsData() {
    try {
      await axios
        .get(`${apiUrl}/Cliente`)
        .then((data) => {
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
      field: "cidade",
      headerName: "Cidade",
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
          tipoDocumento: 'Carregando...',
          numeroDocumento: 'Carregando...',
          nome: "Carregando...",
          logradouro: "Carregando...",
          numero: "Carregando...",
          bairro: "Carregando...",
          cidade: "Carregando...",
          uf: "Carregando...",
        });

        const handleVisualizar = async () => {
          try {
            await axios
              .get(
                `${apiUrl}/Cliente/${data.row.id}`
              )
              .then((data) => {
                setResponseView(data.data);
                handleOpenView();
              });
          } catch (error) {}
        };

        const handleEditar = async (response: PropsEdit) => {
          try {
            await axios
              .put(
                `${apiUrl}/Cliente/${data.row.id}`,
                {
                  id: data.row.id,
                  nome: response.nome,
                  logradouro: response.logradouro,
                  numero: response.numero,
                  bairro: response.bairro,
                  cidade: response.cidade,
                  uf: response.uf,
                }
              )
              .then(() => {
                handleShowSnackbarEdit();
                handleCloseEdit();
                getClientsData();
              })
              .catch((erro) => console.log(erro));
          } catch (error) {}
        };

        const handleApagar = async () => {
          try {
            await axios
              .delete(
                `${apiUrl}/Cliente/${data.row.id}`,
                {
                  data: { id: data.row.id },
                }
              )
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
                tipoDocumento={responseView.tipoDocumento}
                numeroDocumento={responseView.numeroDocumento}
                nome={responseView.nome}
                logradouro={responseView.logradouro}
                numero={responseView.numero}
                bairro={responseView.bairro}
                cidade={responseView.cidade}
                uf={responseView.uf}
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
                nome={data.row.nome}
                logradouro={data.row.logradouro}
                numero={data.row.numero}
                bairro={data.row.bairro}
                cidade={data.row.cidade}
                uf={data.row.uf}
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

  return (
    <CustomBox>
      <TableContainer>
        <TitleCard>Tabela Clientes</TitleCard>
        <DataGridWhite
          rows={dataTable}
          columns={columns}
          autoHeight
          sx={{ color: "white", border: 'none', }}
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
        message="Cliente Apagado com sucesso!"
      />
      <Snackbars
        openSnackbar={openSnackbarEdit}
        handleSnackbarClose={handleSnackbarCloseEdit}
        message="Cliente Atualizado com sucesso!"
      />
      <Weather />
    </CustomBox>
  );
}
