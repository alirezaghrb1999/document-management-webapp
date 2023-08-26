import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table1 from './table1'
import Table2 from './table2'
import Logo from '../assets/logo.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function NestedGrid(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0} style={{ padding: "15px" }}>
                <Grid container item xs={12} spacing={0}>

                    <Paper className={classes.paper} style={{ textAlign: 'center', color: 'black', width: "100%", padding: "5px", backgroundColor: "#e0e0e0" , margin : "5px"}}>
                        <Grid container xs={12}>
                            <Grid item xs={1}>
                                <img style={{ height: "90px", padding: "5px" }} src={Logo} />
                            </Grid>
                            <Grid item xs={11}>
                                <h3>شرکت پالایش نفت جی </h3>
                                <h4>{props.title}</h4>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper className={classes.paper}  style={{ textAlign: 'center', color: 'black', width: "100%", padding: "15px", backgroundColor: "#e0e0e0" , margin : "5px"}}>
                        <Table1 information={props.content} />
                    </Paper>
                    
                    <Paper className={classes.paper}  style={{ textAlign: 'center', color: 'black', width: "100%", padding: "15px", backgroundColor: "#e0e0e0" , margin : "5px"}}>
                        <Table2 information={props.content} />
                    </Paper>

                </Grid>
            </Grid>
        </div>
    );
}
