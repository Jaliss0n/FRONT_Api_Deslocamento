import React from "react";
import { AutoCompleteWhiteStyles } from "../autoCompleteWhite";
import WhiteTextField from "../WTextField";
import { Typography } from "@mui/material";

interface ReusableAutoCompleteProps<T> {
  id: string;
  options: T[];
  register: any;
  getOptionLabel?: (option: unknown) => string;
  error?: boolean;
  helperText?: string;
  label: React.ReactNode;
  sx?: object;
}

const ReusableAutoComplete = <T,>({
  id,
  options,
  getOptionLabel,
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
