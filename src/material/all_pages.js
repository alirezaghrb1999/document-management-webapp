import React, { Component } from 'react';
import '../App.css';
import { create } from 'jss';
import rtl from 'jss-rtl';
import '../assets/fonts/sans.ttf';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CustomTheme from '../assets/CustomTheme';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ReactToPrint from 'react-to-print';
import NestedGrid from './grid';
import Mybutton from './mybutton';
import Detail from './show_detail'


const columns = [
    { label: 'ردیف', minWidth: 20, align: 'right', },
    { label: 'نمایش جداول', minWidth: 120, align: 'right', },
    {
        label: '',
        minWidth: 300,
        align: 'right'
    },
    {
        label: 'شماره LC',
        minWidth: 120,
        align: 'right'
    },
];

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

class All_Pages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            counter: 0,
            filename: ""
        }
    }

    nexthandler = () => {
        this.setState(prevstate => ({ counter: prevstate.counter + 1 }));
    }

    printhandler = () => {
        const myfile = this.props.entry[this.state.counter];
        this.setState({ filename: myfile.the_LC });
        document.getElementById("button").click()
    }

    getback = () => {
        this.setState({ show: false })
    }

    show_details = (cnt) => {
        this.setState({ counter: cnt })
        this.setState({ show: true })
    }

    render() {
        let printing = null;
        let nextstyle = { display: "none" }
        let main_style = { display: "block" }
        let to_filter = { display: "block", padding: "10px" }

        if (this.state.show) {
            to_filter = { display: "none" }
            main_style = {
                display: "none"
            }
            nextstyle = {
                display: "block",
                padding: "10px",
                margin: "10px"
            }

            printing = (
                <NestedGrid content={this.props.entry[this.state.counter]} title={this.props.title} />
            )
        }

        return (
            <div>
                <div style={to_filter}>
                    <Mybutton myid="next" name={"بازگشت به صفحه فیلتر"} click={this.props.back} />
                </div>

                <div style={main_style}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader aria-label="sticky table">

                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: "20px", backgroundColor: "#E8F9FD" }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {this.props.entry.map((row, index) => {
                                        return (
                                            <TableRow hover >
                                                <TableCell align='right'>{index + 1}</TableCell>
                                                <TableCell align='right'><Detail click={this.show_details} cnt={index} /></TableCell>
                                                <TableCell align='right'><p style={{ fontSize: "15px" }}></p></TableCell>
                                                <TableCell align='right'><p style={{ fontSize: "15px" }}>{row.the_LC}</p></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Paper>
                </div>

                <div style={nextstyle}>
                    <Mybutton myid="print" name={"چاپ"} click={this.printhandler} />
                    <Mybutton myid="next" name={"بعدی"} click={this.nexthandler} />
                    <Mybutton myid="back" name={"بازگشت"} click={this.getback} />
                </div>

                <ReactToPrint
                    documentTitle={this.state.filename}
                    fonts={[{ family: "sans", source: "../assets/fonts/sans.ttf" }]}
                    trigger={() => { return <button style={{ display: "none" }} id="button">Print</button>; }}
                    content={() => this.componentRef}
                />

                <div id="area" ref={el => (this.componentRef = el)}>
                    <ThemeProvider theme={CustomTheme}>
                        <StylesProvider jss={jss}>
                            {printing}
                        </StylesProvider>
                    </ThemeProvider>
                </div>

            </div>

        );
    }
}

export default All_Pages;
