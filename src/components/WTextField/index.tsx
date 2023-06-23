import { InputBaseComponentProps, TextField, styled } from "@mui/material";
import { DeepMap, RegisterOptions, FieldError } from "react-hook-form";
import { ReactNode } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Typography } from "@mui/material";

export const WhiteTextField = styled(TextField)({
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

interface WhiteTextFieldProps {
  id: string;
  label: string | JSX.Element;
  value?: unknown; 
  inputProps?: InputBaseComponentProps | undefined;
  defaultValue?: string;
  variant?: "standard" | "filled" | "outlined";
  fullWidth?: boolean;
  register?: any;
  error?: boolean;
  helperText?: string;
  sx?: object;
  type: "number" | "text";
}

export const WhiteTextFieldComponent: React.FC<WhiteTextFieldProps> = ({
  id,
  label,
  value,
  inputProps,
  defaultValue,
  variant = "outlined",
  fullWidth = true,
  register,
  error,
  helperText,
  sx,
  type,
}) => {
  return register ? (
    <WhiteTextField
      id={id}
      type={type}
      fullWidth={fullWidth}
      defaultValue={defaultValue}
      inputProps={inputProps}
      label={
        <Typography color="white" variant="body1">
          {label}
        </Typography>
      }
      variant={variant}
      {...register(id)}
      error={!!error}
      helperText={helperText?.toString()}
      sx={{
        margin: "2% 1%",
        "@media (max-width: 900px)": {
          margin: "2% 0",
        },
        ...sx,
      }}
    />
  ) : (
    <WhiteTextField
      id={id}
      type={type}
      fullWidth={fullWidth}
      defaultValue={defaultValue}
      inputProps={inputProps}
      label={
        <Typography color="white" variant="body1">
          {label}
        </Typography>
      }
      variant={variant}
      error={!!error}
      helperText={helperText?.toString()}
      value={value}
      sx={{
        margin: "2% 1%",
        "@media (max-width: 900px)": {
          margin: "2% 0",
        },
        ...sx,
      }}
    />
  );
};

export default WhiteTextField;
