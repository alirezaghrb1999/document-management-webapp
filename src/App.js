import React, { Component } from 'react';
import './App.css';
import './assets/fonts/sans.ttf';

import Filter from './filter';
import Fetch from './fetch';
import Mybutton from './material/mybutton';


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
      if (day_1 > day_2) {
        return 1;
      }
    }
  }

  return 0;
}

function factor_sort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < (arr.length - i - 1); j++) {
      if (arr[j].factor_number > arr[j + 1].factor_number) {
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

function date_sort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < (arr.length - i - 1); j++) {
      if (date_compare(arr[j].date, arr[j + 1].date)) {
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      same_LC: [],
      LC_info: [],
      final_array: [],
      show: false,
      upload_1: false,
      upload_2: false,
    }
  }

  handleFetchData_1 = (input) => {
    const arr = input
    const LC_number = "شماره رسید وجه"
    const Factor_date = "تاریخ فاکتور"
    const factor_value = "مقدار فاکتور"
    const factor_final_price = "مبلغ نهایی فاکتور"
    const Havale_number = "شماره حواله"
    const factor_num = "شماره فاکتور"
    const contract_num = "شماره قرارداد بورسی"
    let part = [];
    let parts = [];
    let k = 0;

    for (var i = 0; i < arr.length; i++) {
      if (parseInt(arr[i][LC_number].replace(/[^\d]/g, ''))) {
        let row = {
          LC: arr[i][LC_number],
          LC_id: parseInt(arr[i][LC_number].replace(/[^\d]/g, '')),
          date: [arr[i][Factor_date].split("/")[0], arr[i][Factor_date].split("/")[1], arr[i][Factor_date].split("/")[2]],
          value: parseInt(arr[i][factor_value]),
          price: parseInt(arr[i][factor_final_price]),
          Havale: arr[i][Havale_number],
          factor_number: parseInt(arr[i][factor_num]),
          contract_number: arr[i][contract_num],
          key: k,
        }

        part.push(row);
        if (i + 1 == arr.length || arr[i][LC_number] !== arr[i + 1][LC_number]) {
          date_sort(part);
          parts.push(part);
          part = [];
          k++;
        }
      }
    }

    this.setState({
      same_LC: parts,
    });

    let all_parts = [];
    for (var i = 0; i < parts.length; i++) {
      let same_LC = parts[i];
      let same_date = [];

      for (var j = 0; j < same_LC.length; j++) {
        same_date.push(same_LC[j]);
        if (j + 1 == same_LC.length || date_compare(same_LC[j + 1].date, same_LC[j].date)) {
          all_parts.push(same_date);
          same_date = [];
        }
      }
    }

    this.setState({
      payments: all_parts,
    });
    this.setState({
      upload_1: true,
    });
  }

  handleFetchData_2 = (input) => {
    const arr = input
    const LC_num = "شماره ال سی"
    const LC_weight = "وزن ال سی\r\n(کیلوگرم)"
    const LC_price = "مبلغ ال سی\r\n(ریال)"
    let credits = [];

    for (var i = 0; i < arr.length; i++) {
      let row = { the_LC: arr[i][LC_num], LC_id: parseInt(arr[i][LC_num].replace(/[^\d]/g, '')), weight: arr[i][LC_weight], price: arr[i][LC_price] }
      credits.push(row);
    }

    this.setState({
      LC_info: credits,
    });
    this.setState({
      upload_2: true,
    });
  }

  final_information = () => {
    const info_1 = this.state.payments;
    const info_2 = this.state.LC_info;
    const info_3 = this.state.same_LC;

    let new_info_1 = []
    let new_innerpart = []
    let new_sum_value = 0;

    for (var i = 0; i < info_1.length; i++) {
      factor_sort(info_1[i])
      new_sum_value = 0;
      new_innerpart = [];
      for (var j = 0; j < info_1[i].length; j++) {
        new_sum_value += info_1[i][j].value;

        if (j + 1 == info_1[i].length || info_1[i][j].factor_number !== info_1[i][j + 1].factor_number) {
          info_1[i][j].value = new_sum_value;
          new_innerpart.push(info_1[i][j]);
          new_sum_value = 0;
        }
      }
      new_info_1.push(new_innerpart);
    }

    let final_arr = []
    let sum_price, sum_curr_price;
    let sum_value, sum_curr_value;
    let k, x;
    for (var i = 0; i < new_info_1.length; i++) {
      sum_price = 0;
      sum_value = 0;
      sum_curr_price = 0;
      sum_curr_value = 0;
      for (var j = 0; j < info_2.length; j++) {
        if (new_info_1[i][0].LC_id == info_2[j].LC_id) {
          k = new_info_1[i][0].key;
          x = 0;
          while (date_compare(new_info_1[i][0].date, info_3[k][x].date)) {
            sum_price += info_3[k][x].price;
            sum_value += info_3[k][x].value;
            x++;
          }

          for (var z = 0; z < new_info_1[i].length; z++) {
            sum_curr_price += new_info_1[i][z].price;
            sum_curr_value += new_info_1[i][z].value;
          }

          let row = {
            the_LC: info_2[j].the_LC,
            orders: new_info_1[i],
            final_weight: info_2[j].weight,
            final_price: info_2[j].price,
            sum_before_price: sum_price,
            sum_before_wight: sum_value,
            sum_current_price: sum_curr_price,
            sum_current_value: sum_curr_value,
          }

          final_arr.push(row)
          break;
        }
      }
    }

    this.setState({
      final_array: final_arr,
    });
    this.setState({
      show: true
    });
    console.log("final array : ", final_arr)
  }

  render() {
    let hiddenstyle = null;
    let btn_style = { display: "none" }
    let filter_style = { display: "none" }
    let upload_style_1 = null;
    let upload_style_2 = null;

    if (this.state.upload_1 && this.state.upload_2) {
      btn_style = { textAlign: 'center', padding: "5px", margin: "5px", display: "block" }
    }

    if (this.state.show) {
      hiddenstyle = {
        display: "none"
      }
      btn_style = {
        display: "none"
      }
      filter_style = {
        display: "block"
      }
    }

    if (this.state.upload_1) {
      upload_style_1 = { backgroundColor: "green", fontWeight: "bold" }
    }
    if (this.state.upload_2) {
      upload_style_2 = { backgroundColor: "green", fontWeight: "bold" }
    }

    return (
      <div style={{ marginTop: 80 }}>

        <div style={hiddenstyle}>
          <Fetch the_style={upload_style_1} fetchdata={this.handleFetchData_1} name="فایل ریز برداشت" />
          <Fetch the_style={upload_style_2} fetchdata={this.handleFetchData_2} name="فایل اعتبار اسنادی" />
        </div>

        <div style={btn_style}>
          <Mybutton the_style={{ height: "60px", width: "200px", disable: true, fontWeight: "bold" }} myid="start" name={"صفحه فیلتر"} click={this.final_information} />
        </div>

        <div style={filter_style}>
          <Filter entry={this.state.final_array} />
        </div>

      </div>
    );
  }
}

export default App;
