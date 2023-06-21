import { TextField, styled } from "@mui/material";
import { DeepMap, RegisterOptions,FieldError } from 'react-hook-form';
import { ReactNode } from 'react';
import { DatePicker } from "@mui/x-date-pickers";

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

// interface Props {
//   id: string;
//   label: ReactNode;
//   variant: 'outlined';
//   error?: boolean;
//   helperText?: string;
//   sx?: Record<string, any>;
//   // Aqui você pode adicionar outras propriedades específicas do componente

//   // Props do `register` e `errors` do `useForm`
//   register: (name: string) => void;
//   errors: {
//     [key: string]: {
//       message?: string;
//     };
//   };
// //   register: <TFieldValues extends Record<string, any>>(
// //     rules?: RegisterOptions<TFieldValues>
// //   ) => (ref: HTMLInputElement | null) => void;
// //   error: DeepMap<TFieldValues, FieldError>;


// }
// //usa um map amanha pra renderiza os campo, ou nao tem numero no meio né
// export function WtextField({ setProp, labelText }: Props) {
//   return (
//     <WhiteTextField
//       fullWidth
//       color="primary"
//       id="outlined-basic"
//       onChange={(e) => setProp(e.target.value)}
//       inputProps={{ maxLength: 20 }}
//       label={<p style={{ color: "white" }}>{labelText}</p>}
//       variant="outlined"
//       sx={{ margin: "2.5% 0 2.5% 0" }}
//     />
//   );
// }
