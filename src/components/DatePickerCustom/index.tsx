import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

dayjs.locale("pt-br");

export default function DatePickerCustom() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        label={
          <Typography color="white" variant="body1">
            Numero da Habilitação
          </Typography>
        }
        slotProps={{
            textField: {
              helperText: 'Dia/Mes/Ano',
            },
        }}
        disablePast={true}
      />
    </LocalizationProvider>
  );
}
