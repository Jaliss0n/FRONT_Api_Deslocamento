import styled from "@emotion/styled";
import { Alert, AlertColor, AlertTitle, Button, Snackbar } from "@mui/material";
import { useNavContext } from "../context/navProvider";

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
  visualizar: boolean;
  page:number;
}

export function Snackbars({
  openSnackbar,
  handleSnackbarClose,
  message,
  description,
  variant,
  visualizar,
  page
}: PropsSnack) {
  const { setNumberPag } = useNavContext();

  return (
    <SnackbarContainer
      open={openSnackbar}
      autoHideDuration={5000}
      onClose={handleSnackbarClose}
    >
      {visualizar ? (
        <Alert
          action={<Button onClick={() => setNumberPag(page)}>Visualizar</Button>}
          severity={variant}
        >
          <AlertTitle>{message}</AlertTitle>
          {description}
        </Alert>
      ) : (
        <Alert
          severity={variant}
        >
          <AlertTitle>{message}</AlertTitle>
          {description}
        </Alert>
      )}
    </SnackbarContainer>
  );
}
