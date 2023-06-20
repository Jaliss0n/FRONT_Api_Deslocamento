import { CustomBox } from "../Clients";
import { Weather } from "../../Weather";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import styled from "@emotion/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import ModalDelete from "@/components/ModalDelete";
import { ModalEdit } from "@/components/ModalEdit";

const TableContainer = styled(Box)`
  width: 50%;
  background-color: #384ce3;

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100vh;
  }
`;

const SnackbarContainer = styled(Snackbar)`
  position: fixed;
  left: 0;
  bottom: 0;
`;

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

export function TableClients() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
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
        .get("https://api-deslocamento.herokuapp.com/api/v1/Cliente")
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
      width: 100,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "cidade",
      headerName: "Cidade",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "acoes",
      headerName: "Ações",
      width: 180,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (data) => {
        const [openDelete, setOpenDelete] = React.useState(false);
        const handleOpenDelete = () => setOpenDelete(true);
        const handleCloseDelete = () => setOpenDelete(false);

        const [openEdit, setOpenEdit] = React.useState(false);
        const handleOpenEdit = () => setOpenEdit(true);
        const handleCloseEdit = () => setOpenEdit(false);

        const handleVisualizar = () => {
          console.log(`Visualizar item ${data.row.id}`);
        };

        const handleEditar = async (response: PropsEdit) => {
          try {
            await axios
              .put(
                `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${data.row.id}`,
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
                handleShowSnackbar();
                getClientsData();
              }).catch((erro) => console.log(erro));
          } catch (error) {}
        };

        const handleApagar = async () => {
          try {
            await axios
              .delete(
                `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${data.row.id}`,
                {
                  data: { id: data.row.id },
                }
              )
              .then(() => {
                handleShowSnackbar();
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
                onClick={handleVisualizar}
              >
                <VisibilityIcon />
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

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleShowSnackbar = () => {
    setOpenSnackbar(true);
  };

  return (
    <CustomBox>
      <TableContainer>
        <DataGrid
          rows={dataTable}
          columns={columns}
          sx={{ color: "white", padding: "2%" }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            columns: {
              columnVisibilityModel: {
                id: false,
                cidade: false,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </TableContainer>
      <SnackbarContainer
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success">
          <AlertTitle>Cliente Apagado com sucesso!</AlertTitle>
        </Alert>
      </SnackbarContainer>
      <Weather />
    </CustomBox>
  );
}
