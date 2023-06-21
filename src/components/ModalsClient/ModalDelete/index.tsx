import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

interface PropsModal {
  nome: string;
  handleCloseDelete: () => void;
  handleApagar: () => void;
}

const ModalDeleteStiled = styled(Box)`
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

const ButtonAreaDelete = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default function ModalDelete({
  nome,
  handleCloseDelete,
  handleApagar,
}: PropsModal) {
  return (
    <ModalDeleteStiled>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Deseja realmente apagar o(a) {nome}?
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Esta decisão não tem volta!
      </Typography>
      <ButtonAreaDelete>
        <Button
          sx={{ margin: "2%" }}
          variant="outlined"
          color="inherit"
          onClick={() => handleCloseDelete()}
        >
          Não
        </Button>
        <Button
          sx={{ margin: "2%" }}
          variant="contained"
          color="error"
          onClick={() => handleApagar()}
        >
          Sim
        </Button>
      </ButtonAreaDelete>
    </ModalDeleteStiled>
  );
}
