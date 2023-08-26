import React, { Component } from 'react';
import './App.css';
import './assets/fonts/sans.ttf';

import TextInput from './material/TextInput'
import Jalali_1 from './jalali_1'
import Jalali_2 from './jalali_2'
import Mybutton from './material/mybutton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import All_Pages from './material/all_pages'


function date_compare(date1, date2) {
    let day_1 = parseInt(date1[2])
    let month_1 = parseInt(date1[1])
    let year_1 = parseInt(date1[0])

    let day_2 = parseInt(date2[2])
    let month_2 = parseInt(date2[1])
    let year_2 = parseInt(date2[0])

    if (year_1 > year_2) {
        return 1;
    }

    if (year_1 == year_2) {
        if (month_1 > month_2) {
            return 1;
        }
        if (month_1 == month_2) {
            if (day_1 >= day_2) {
                return 1;
            }
        }
    }

    return 0;
}

function date_compare_2(date1, date2) {
    let day_1 = parseInt(date1[2])
    let month_1 = parseInt(date1[1])
    let year_1 = parseInt(date1[0])

    let day_2 = parseInt(date2[2])
    let month_2 = parseInt(date2[1])
    let year_2 = parseInt(date2[0])

    if (year_1 > year_2) {
        return 1;
    }

    if (year_1 == year_2) {
        if (month_1 > month_2) {
            return 1;
        }
        if (month_1 == month_2) {
            if (day_1 > day_2) {
                return 1;
            }
        }
    }

    return 0;
}

function date_sort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (date_compare_2(arr[j].date, arr[j + 1].date)) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}


class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered_array: [],
            show: false,
            title: "",
            filename: '',
            from_date: null,
            to_date: null,
            LC_filter: "",
            date_enabled: false
        }
    }

    mytitlehandler = (value) => {
        this.setState({ title: value })
    }

    from_date_handler = (value) => {
        this.setState({ from_date: value })
    }

    to_date_handler = (value) => {
        this.setState({ to_date: value })
    }

    LChandler = (value) => {
        this.setState({ LC_filter: value })
    }

    start_process = () => {
        let current_array = this.props.entry;

        // sort current_array by LC_id
        for (var i = 0; i < current_array.length; i++) {
            for (var j = 0; j < (current_array.length - i - 1); j++) {
                if (current_array[j].orders[0].LC_id > current_array[j + 1].orders[0].LC_id) {
                    var temp = current_array[j]
                    current_array[j] = current_array[j + 1]
                    current_array[j + 1] = temp
                }
            }
        }
        for (var i = 0; i < current_array.length; i++) {
            console.log(current_array[i].orders[0].LC_id)
        }
        
        // merge dates
        let merge_dates = [];
        let inner_arr = [];
        let Sum_value = 0;
        let Sum_price = 0;
        for (var i = 0; i < current_array.length; i++) {
            for (var j = 0; j < current_array[i].orders.length; j++) {
                inner_arr.push(current_array[i].orders[j]);
            }
            Sum_value += current_array[i].sum_current_value;
            Sum_price += current_array[i].sum_current_price;

            if (i + 1 == current_array.length || current_array[i].orders[0].LC_id !== current_array[i + 1].orders[0].LC_id) {
                date_sort(inner_arr)
                let row = {
                    the_LC: current_array[i].the_LC,
                    orders: inner_arr,
                    final_weight: current_array[i].final_weight,
                    final_price: current_array[i].final_price,
                    sum_before_price: 0,
                    sum_before_wight: 0,
                    sum_current_price: Sum_price,
                    sum_current_value: Sum_value
                }
                merge_dates.push(row);
                inner_arr = [];
                Sum_value = 0
                Sum_price = 0
            }
        }

        if (this.state.LC_filter !== "") {
            let temp_arr = [];
            for (var i = 0; i < merge_dates.length; i++) {
                let curr_LC = parseInt(this.state.LC_filter.replace(/[^\d]/g, ''))
                if (merge_dates[i].orders[0].LC_id == curr_LC) {
                    temp_arr.push(merge_dates[i]);
                }
            }
            merge_dates = temp_arr;
        }

        if (this.state.date_enabled) {
            let temp_arr = [];
            let before_price = 0;
            let before_value = 0;
            let current_price = 0;
            let current_vlaue = 0;
            for (var i = 0; i < merge_dates.length; i++) {
                before_price = 0;
                before_value = 0;
                current_price = 0;
                current_vlaue = 0;
                temp_arr = [];
                for (var j = 0; j < merge_dates[i].orders.length; j++) {
                    let date_arr = [merge_dates[i].orders[j].date[0], merge_dates[i].orders[j].date[1], merge_dates[i].orders[j].date[2]]

                    if (date_compare_2(this.state.from_date, date_arr)) {
                        before_price += merge_dates[i].orders[j].price;
                        before_value += merge_dates[i].orders[j].value;
                    }

                    let cmp1 = date_compare(date_arr, this.state.from_date)
                    let cmp2 = date_compare(this.state.to_date, date_arr)

                    if (cmp1 && cmp2) {
                        temp_arr.push(merge_dates[i].orders[j]);
                        current_price += merge_dates[i].orders[j].price;
                        current_vlaue += merge_dates[i].orders[j].value;
                    }
                }
                merge_dates[i].sum_before_price = before_price;
                merge_dates[i].sum_before_wight = before_value;
                merge_dates[i].sum_current_price = current_price;
                merge_dates[i].sum_current_value = current_vlaue;
                merge_dates[i].orders = temp_arr;
            }
            let not_empty = [];
            for (var i = 0; i < merge_dates.length; i++) {
                if (merge_dates[i].orders.length != 0) {
                    not_empty.push(merge_dates[i])
                }
            }
            merge_dates = not_empty;
        }

        this.setState({
            filtered_array: merge_dates
        });
        this.setState({
            show: true
        });
    }

    date_enable = () => {
        document.getElementById("jalali1").click()
        document.getElementById("jalali2").click()
        this.setState({
            date_enabled: true
        });
    }

    back_to_filter = () => {
        this.setState({
            filtered_array: this.props.entry,
            show: false,
            date_enabled: false
        });
    }

    render() {
        let tables = null;

        let filter_style = { textAlign: 'center', padding: "5px", backgroundColor: "#e0e0e0", margin: "5px" }
        let date_filter = { height: "40px", width: "150px", disable: true, fontWeight: "bold" };

        if (this.state.date_enabled) {
            date_filter = { height: "40px", width: "150px", disable: true, fontWeight: "bold", backgroundColor: "green" };
        }

        if (this.state.show) {
            filter_style = {
                display: "none"
            }

            tables = (
                <All_Pages entry={this.state.filtered_array} title={this.state.title} back={this.back_to_filter} />
            )
        }

        return (
            <div>
                <div style={filter_style}>
                    <Grid container spacing={0} style={{ padding: "15px" }}>
                        <Grid container item xs={12} spacing={0}>
                            <Paper style={{ textAlign: 'center', color: 'black', width: "100%", padding: "15px", backgroundColor: "#e0e0e0", margin: "5px", display: "flex" }}>
                                <label style={{ margin: "15px", padding: "5px" }}>عنوان:</label>
                                <TextInput name="عنوان" titleHandler={this.mytitlehandler} />
                            </Paper>
                            <Paper style={{ textAlign: 'center', color: 'black', width: "100%", padding: "15px", backgroundColor: "#e0e0e0", margin: "5px", display: "flex" }}>
                                <label style={{ margin: "15px", padding: "5px" }}>فیلتر بر اساس شماره LC :</label>
                                <TextInput name="شماره LC" titleHandler={this.LChandler} />
                            </Paper>
                        </Grid>

                        <Grid container item xs={12} spacing={0}>
                            <Paper style={{ textAlign: 'center', color: 'black', width: "100%", padding: "15px", backgroundColor: "#e0e0e0", margin: "5px", display: "flex" }}>
                                <h4>فیلتر بر اساس تاریخ :</h4>
                                <label style={{ margin: "15px", padding: "5px" }}>از تاریخ:</label>
                                <Jalali_1 date_handler={this.from_date_handler} myid="jalali1" />
                                <label style={{ margin: "15px", padding: "5px" }}>تا تاریخ:</label>
                                <Jalali_2 date_handler={this.to_date_handler} myid="jalali2" />
                                <Mybutton the_style={date_filter} myid="start" name={"اعمال فیلتر تاریخ"} click={this.date_enable} />
                            </Paper>
                        </Grid>

                    </Grid>

                    <Mybutton the_style={{ height: "60px", width: "200px", disable: true, fontWeight: "bold" }} myid="start" name={"شروع عملیات"} click={this.start_process} />
                </div>

                <div>
                    {tables}
                </div>

            </div>
        );
    }
}

export default Filter;
