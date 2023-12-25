import React, { useEffect, useState } from "react";
import "./App.css";
import doors from "./json/doors.json";
import moment from 'moment-timezone';

function App() {
  const [isOpen, setIsOpen] = useState([]);
  const [submitToStorage, setSubmitToStorage] = useState([]);
  const checkIfAllowedToOpen = (inputdate) => {
    const doordate = new Date(inputdate);
    const today = new Date();

    today >= doordate
      ? openDoor(inputdate)
      : alert(
          " Not allowed to open yet, wait a few days"
        );
  };

  const openDoor = (doordate) => {
    setSubmitToStorage([...isOpen, doordate]);
    localStorage.setItem("isOpen", submitToStorage);
  };

  const converDateToDay = (inputdate) => {
    const date = moment.tz(inputdate, "America/Los_Angeles");
    const day = date.date(); 
    return day;
  };
  

  const resetDoors = () => {
    setSubmitToStorage([]);
    localStorage.removeItem("isOpen");
  };

  useEffect(() => {
    const local = localStorage.getItem("isOpen");
    setIsOpen(local ? local : []);
  }, [submitToStorage]);

  
  return (
    <div className="container">
      <div className="content">
        <div className="calendar">
          {doors.map((door, i) => {
            return (
              <div key={i}>
                {isOpen.includes(door.day) ? (
                  <div className="dooropen">
                     <a href={door.imageUrl} target="_blank" rel="noopener noreferrer">
                    <p>{door.message}</p>
                    </a>
                  </div>
                ) : (
                  <div
                    className="door"
                    onClick={() => checkIfAllowedToOpen(door.day)}
                  >
                    <p>{converDateToDay(door.day)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button className="resetbutton" onClick={resetDoors}>
          Reset my calendar
        </button>
      </div>
    </div>
  );
}

export default App;
