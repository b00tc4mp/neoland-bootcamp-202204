import retrieveClockUser from "../../logic/retrieveClockUser";
import { useState, useEffect } from "react";
import CardJob from "../Jobs/CardJob";
import toast from "react-hot-toast";

export default function ClockAll() {
  const [clocks, setClok] = useState(null);
  useEffect(() => {
    loadclocks();
  }, []);

  const loadclocks = () => {
    retrieveClockUser(sessionStorage.token)
      .then((clocks) => {
        setClok(clocks);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return clocks && clocks.length ? (
    <ul>
      {clocks.map((clock) => (
        <li key={clock._id}>
          <input id="prodId" name="clocId" value={clock._id} disabled />
          <li />
          {clock.timeout}
          <li>{clock.timein}</li>
        </li>
      ))}
    </ul>
  ) : (
    <p>No tienes trabajos asignados</p>
  );
}
