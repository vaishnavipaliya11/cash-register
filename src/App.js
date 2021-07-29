import "./styles.css";
import React, { useState } from "react";

const notes = {
  1: "",
  5: "",
  10: "",
  20: "",
  50: "",
  100: "",
  500: "",
  2000: ""
};
var billAmt, cashGivenByUser;

export default function App() {
  const [cashReturn, setCashReturn] = useState(notes);
  //array of the notes, digits gets stored in ascending order
  const notesArray = Object.keys(cashReturn).sort(function (a, b) {
    return b - a;
  });

  console.log(notesArray);

  const [cashGivenDiv, setCashGivenDiv] = useState("none");

  const [output, setOutput] = useState("none");

  const [errorDisplay, setErrorDisplay] = useState(["none", ""]);

  const [nextbtnDisplay, setNextbtnDisplay] = useState("block");

  function checkBtnHandler() {
    if (cashGivenByUser > 0 && billAmt > 0) {
      if (Number.isInteger(cashGivenByUser)) {
        if (cashGivenByUser >= billAmt) {
          if (cashGivenByUser === billAmt) {
            setOutput("none");
            setErrorDisplay(["block", "No amount should be returned"]);
            return;
          }
          setErrorDisplay(["none", ""]);
          setOutput("block");
          calculateNoNotes(cashGivenByUser, billAmt);
          return;
        } else {
          setOutput("none");
          setErrorDisplay([
            "block",
            "Cash is less than bill, please enter right amount"
          ]);
          return;
        }
      }
    } else {
      setOutput("none");
      setErrorDisplay([
        "block",
        "Enter valid bill amount and cash given to continue"
      ]);
    }
  }

  function calculateNoNotes(cash, bill) {
    let diff = cash - bill;
    notesArray.map((note) => {
      let noteNo = Number(note);
      console.log("note:", noteNo);
      console.log("difference", diff);
      if (diff >= noteNo) {
        let count = Math.floor(diff / noteNo);
        diff = diff - noteNo * count;
        notes[noteNo] = count;
        console.log(count);
      } else {
        notes[noteNo] = "";
      }
    });
    setCashReturn(notes);
  }

  return (
    <div className="App">
      <h1>Cash Register Manager</h1>
      <p>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <div>
        <div className="label">Bill Amount:</div>
        <input
          className="inputArea"
          type="number"
          id="billAmt"
          onChange={(e) => {
            //billAmt stores the value which user enters
            billAmt = Number(e.target.value);
            console.log(billAmt);
          }}
        />
        <div className="btnNext">
          <button
            style={{ display: `${nextbtnDisplay}` }}
            className="nextBtn"
            onClick={() => {
              //function to display error if invalid input or display cash given block
              if (billAmt > 0) {
                setNextbtnDisplay("none");
                setErrorDisplay(["none", ""]);
                setCashGivenDiv("block");
              } else {
                setOutput("none");
                setErrorDisplay([
                  "block",
                  "Enter valid bill amount to continue"
                ]);
              }
            }}
          >
            Next
          </button>
        </div>

        <div style={{ display: `${cashGivenDiv}` }}>
          <div className="label">Cash Given:</div>
          <input
            className="inputArea"
            id="cashGiven"
            onChange={(e) => {
              //stores the user input
              cashGivenByUser = Number(e.target.value);
              console.log(cashGivenByUser);
            }}
          />
          <br />
          <button className="checkBtn" onClick={checkBtnHandler}>
            Check
          </button>
        </div>

        <div style={{ display: `${errorDisplay[0]}` }} className="errorMsg">
          {errorDisplay[1]}
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ display: `${output}` }} className="returnChange">
            <div className="label">Return Change:</div>
            <div id="output">
              <table>
                <tbody>
                  <tr>
                    <th>No.of Notes</th>
                    {notesArray.map((note) => {
                      return (
                        <td className="noOfNotes" key={note}>
                          {cashReturn[note]}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <th>Note</th>
                    {notesArray.map((note) => {
                      return <td key={note}>{note}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
