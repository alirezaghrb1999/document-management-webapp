import React from "react";
import './fetch.css'
import * as XLSX from "xlsx";
import Button from '@material-ui/core/Button';

function Fetch(props) {

  let file = "";

  const handler = (e) => {
    file = e.target.files[0];
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      //console.log(d[0])
      //console.log(Object.keys(d[0]))
      props.fetchdata(d);
    });
  }

  return (
    <div style={props.hidden} className="container">
      <div className="center">
        <Button
          variant="contained"
          component="label"
          style={props.the_style}
        >
          <p>{props.name}</p>
          <input
            id="excelinput"
            type="file"
            onChange={(e) => handler(e)}
            hidden
          />
        </Button>
      </div>
    </div>
  );
}

export default Fetch;