import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#bdbdbd",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Table1(props) {

  return (
    <TableContainer component={Paper}>

      <Table size="small" aria-label="a dense table">
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>{props.information.the_LC}</StyledTableCell>
            <StyledTableCell>شماره اعتبار اسنادی</StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={props.information.final_weight} /> </StyledTableCell>
          <StyledTableCell> <p style={{direction:'rtl'}}>مقدار اعتبار اسنادی (کیلوگرم)</p></StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={props.information.final_price} /> </StyledTableCell>
            <StyledTableCell><p style={{direction:'rtl'}}>مبلغ اعتبار اسنادی  (ریال) </p> </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={props.information.sum_before_price} /> </StyledTableCell>
            <StyledTableCell><p style={{direction:'rtl'}}>مجموع مبلغ پارت های ماقبل (ریال) </p> </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={props.information.sum_before_wight} /> </StyledTableCell>
            <StyledTableCell><p style={{direction:'rtl'}}>مجموع مقدار پارت های ماقبل (کیلوگرم) </p> </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={props.information.final_weight - (props.information.sum_current_value + props.information.sum_before_wight)} /> </StyledTableCell>
            <StyledTableCell><p style={{direction:'rtl'}}>مقدار مانده اعتبار اسنادی (کیلوگرم) </p> </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={props.information.final_price - (props.information.sum_current_price + props.information.sum_before_price)} /> </StyledTableCell>
            <StyledTableCell><p style={{direction:'rtl'}}>مبلغ مانده اعتبار اسنادی (ریال) </p> </StyledTableCell>
          </StyledTableRow>

        </TableBody>
      </Table>

    </TableContainer>
  );
}

