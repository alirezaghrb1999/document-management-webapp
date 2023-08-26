import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TextInput(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off" >
      <TextField id="mytitle" onChange={(event)=>props.titleHandler(event.target.value)} label={props.name} variant="outlined" />
    </form>
  );
}
