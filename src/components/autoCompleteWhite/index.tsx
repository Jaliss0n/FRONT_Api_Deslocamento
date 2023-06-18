import { Autocomplete, TextField, styled } from "@mui/material";

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

// export function AutoCompleteWhite({ labelProps }: { labelProps: string }) {
//   const defaultValue = [{ label: "Carregando...", year: 0 }];

//   return (
//     <AutoCompleteWhiteStyles
//       disablePortal
//       id="combo-box-demo"
//       options={defaultValue}
//       sx={{ margin: "2.5% 0 2.5% 0" }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={<p style={{ color: "#ffffff" }}>{labelProps}</p>}
//         />
//       )}
//     />
//   );
// }
