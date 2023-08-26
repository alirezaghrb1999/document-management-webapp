import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '..//assets/fonts/sans.ttf';
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
      <Table size="small" aria-label="a dense table" style={{ fontFamily: "sans" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>شماره قرارداد</StyledTableCell>
            <StyledTableCell>شماره حواله</StyledTableCell>
            <StyledTableCell>تاریخ فاکتور</StyledTableCell>
            <StyledTableCell>مبلغ فاکتور</StyledTableCell>
            <StyledTableCell>مقدار فاکتور</StyledTableCell>
            <StyledTableCell>شماره فاکتور</StyledTableCell>
            <StyledTableCell>ردیف</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.information.orders.map((row, index) => {
            return (
              <StyledTableRow>
                <StyledTableCell> {row.contract_number} </StyledTableCell>
                <StyledTableCell> {row.Havale} </StyledTableCell>
                <StyledTableCell> {row.date[0] + "/" + row.date[1] + "/" + row.date[2]} </StyledTableCell>
                <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={row.price} /> </StyledTableCell>
                <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={row.value} /> </StyledTableCell>
                <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={row.factor_number} /> </StyledTableCell>
                <StyledTableCell> <NumberFormat displayType={'text'} thousandSeparator={true} value={index + 1} /> </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
      <Table size="small" aria-label="a dense table" style={{ fontFamily: "sans" }}>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              مجموع مقدار فاکتورها : <NumberFormat displayType={'text'} thousandSeparator={true} value={props.information.sum_current_value} />
            </StyledTableCell>
            <StyledTableCell>
              مجموع مبلغ فاکتورها : <NumberFormat displayType={'text'} thousandSeparator={true} value={props.information.sum_current_price} />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
