import styled from "@emotion/styled";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/pt-br";
import dayjs, { Dayjs } from "dayjs";
import { Typography } from "@mui/material";

dayjs.locale("pt-br");

export const WhiteDatePicker = styled(DatePicker)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#d3d3d3",
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "#00cfc8;",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

interface WhiteDatePikerProps {
  label: string;
  helperText?: string;
  setData: (data: string) => void;
}

export function WhiteDatePickerCompont({
  label,
  helperText,
  setData,
}: WhiteDatePikerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <WhiteDatePicker
        label={
          <Typography color="white" variant="body1">
            {label}
          </Typography>
        }
        slotProps={{
          textField: {
            helperText: helperText,
            placeholder: "Dia/Mes/Ano",
          },
        }}
        sx={{
          color: "white",
          width: "100%",
          margin: "2% 1%",
          "@media (max-width: 900px)": {
            margin: "2% 0",
          },
        }}
        disablePast={true}
        onChange={(newValue: unknown) => {
          const data = newValue as string;
          setData(data);
        }}
      />
    </LocalizationProvider>
  );
}
