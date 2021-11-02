import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from '@mui/lab/DatePicker';

export default function BasicDateTimePicker({
   value,
   setValue,
   label,
   checked,
   error,
   helperText,
   disabled,
}) {

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DateTimePicker
            format="yyyy-MM-dd HH:mm:ss"
            renderInput={(props) => (
               <TextField
                  {...props}
                  sx={{ width: "100%" }}
                  type="datetime-local"
                  error={error}
                  helperText={helperText}
                  disabled={disabled}
               />
            )}
            label={label}
            value={value}
            onChange={(newValue) => {
               setValue('state', newValue);
            }}
         />
      </LocalizationProvider>
   );
}
