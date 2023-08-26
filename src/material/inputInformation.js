import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function InputInformation(props) {
    const classes = useStyles();
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">مدت دوره </InputLabel>
                <Select
                    native
                    onChange={(event) => props.myhandler(parseInt(event.target.value))}
                    id="selecting"
                    label="مدت دوره"
                >
                    <option aria-label="None" value="" />
                    <option value={3}>سه ماهه</option>
                    <option value={6}>شش ماهه</option>
                    <option value={12}>یک ساله</option>
                </Select>
            </FormControl>
        </div>
    );
}
