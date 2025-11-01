import { useState } from "react";
import AppointmentsList from "./components/AppointmentsList";
import CalendarWeek from "./components/CalendarWeek";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(0);

  return (
    <>
      <div style={{ padding: 20 }}>
        <h1>Appointment Booking (MVP)</h1>
        <CalendarWeek
          refreshFlag={refreshFlag}
          setRefreshFlag={setRefreshFlag}
        />
        <AppointmentsList
          refreshFlag={refreshFlag}
          setRefreshFlag={setRefreshFlag}
        />
      </div>
    </>
  );
}

export default App;
