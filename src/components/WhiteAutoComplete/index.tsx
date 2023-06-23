import React from "react";
import WhiteTextField from "../WTextField";
import { Autocomplete, Typography } from "@mui/material";
import styled from "@emotion/styled";

interface ReusableAutoCompleteProps<T> {
  id: string;
  options: T[];
  register: any;
  defaultValue?: string;
  getOptionLabel?: (option: unknown) => string;
  error?: boolean;
  helperText?: string;
  label: React.ReactNode;
  sx?: object;
}

export const AutoCompleteWhiteStyles = styled(Autocomplete)({
  "& label.Mui-focused": {
    color: "white",
  },
  ".css-i4bv87-MuiSvgIcon-root": {
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

const ReusableAutoComplete = <T,>({
  id,
  options,
  getOptionLabel,
  defaultValue,
  register,
  error,
  helperText,
  label,
  sx,
}: ReusableAutoCompleteProps<T>) => {
  return (
    <AutoCompleteWhiteStyles
      disablePortal
      id={id}
      fullWidth
      defaultValue={defaultValue}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <WhiteTextField
          {...params}
          {...register(id)}
          error={!!error}
          helperText={helperText}
          label={
            <Typography variant="body1" sx={{ color: "#ffffff" }}>
              {label}
            </Typography>
          }
        />
      )}
      sx={{
        margin: "2% 1%",
        "@media (max-width: 900px)": {
          margin: "2% 0%",
        },
        ...sx,
      }}
    />
  );
};

export default ReusableAutoComplete;
