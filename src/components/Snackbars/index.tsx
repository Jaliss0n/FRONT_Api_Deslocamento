import styled from "@emotion/styled";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const SnackbarContainer = styled(Snackbar)`
  position: fixed;
  left: 0;
  bottom: 0;
`;

interface PropsSnack {
  openSnackbar: boolean;
  handleSnackbarClose: () => void;
  message: string;
  description?: string;
}

export function Snackbars({
  openSnackbar,
  handleSnackbarClose,
  message,
  description
}: PropsSnack) {
  return (
    <SnackbarContainer
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert severity="success">
        <AlertTitle>{message}</AlertTitle>
        {description}
      </Alert>
    </SnackbarContainer>
  );
}
