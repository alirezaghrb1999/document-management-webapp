import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
  },
}));

export default function Mybutton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button id={props.myid} variant="contained" color="primary" onClick={props.click} style={props.the_style}>
        {props.name}
      </Button>
    </div>
  );
}