import styled from "@emotion/styled";
import { Alert, AlertColor, AlertTitle, Snackbar } from "@mui/material";

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
  variant: AlertColor;
}

export function Snackbars({
  openSnackbar,
  handleSnackbarClose,
  message,
  description,
  variant
}: PropsSnack) {
  return (
    <SnackbarContainer
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert severity={variant}>
        <AlertTitle>{message}</AlertTitle>
        {description}
      </Alert>
    </SnackbarContainer>
  );
}
