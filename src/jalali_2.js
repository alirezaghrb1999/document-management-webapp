import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@material-ui/core/Button';

export default function Jalali_2(props) {
  const [value, setValue] = React.useState(new Date());
  let Main_val = null;

  const change_value = React.useCallback((newValue) => {
    setValue(newValue)
  }, [])

  const get_value = (params) => {
    let main_value = Object.values({ ...params.inputProps.value }).join('').split("/");
    Main_val = main_value;
    return <TextField  {...params} />
  }

  const click_handler = () => {
    props.date_handler(Main_val);
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterJalali}>
        <DatePicker
          mask="____/__/__"
          value={value}
          onChange={(newValue) => change_value(newValue)}
          renderInput={(params) => get_value(params)}
        />
      </LocalizationProvider>

      <Button id={props.myid} variant="contained" color="primary" onClick={click_handler} style={{display:"none"}}>
        {props.name}
      </Button>
    </div>
  );
}
