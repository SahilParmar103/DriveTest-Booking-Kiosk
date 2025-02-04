// Fetch available appointment slots for the selected date
function fetchAvailableTimes(date) {
  // Replace this with your own function to fetch available times from a database
  const availableTimes = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "1:00",
    "1:30",
    "2:00",
  ];

  // Check if the selected date already has appointments
  // If it does, remove those times from the available times
  const existingAppointments = getAppointmentsForDate(date);
  if (existingAppointments.length > 0) {
    existingAppointments.forEach((appointment) => {
      const index = availableTimes.indexOf(appointment.time);
      if (index !== -1) {
        availableTimes.splice(index, 1);
      }
    });
  }

  return availableTimes;
}

// Get appointments for a given date
function getAppointmentsForDate(date) {
  // Replace this with your own function to fetch appointments from a database
  const appointments = [
    { date: "01-01-2022", time: "9:00" },
    { date: "01-01-2022", time: "10:00" },
    { date: "01-01-2022", time: "11:00" },
    { date: "01-01-2022", time: "12:00" },
  ];

  return appointments.filter((appointment) => appointment.date === date);
}

// Add a new appointment slot
function addAppointment() {
  const date = document.getElementById("appointment-date").value;
  const time = document.querySelector(
    'input[name="appointment-time"]:checked'
  ).value;

  // Check if the selected date and time already exist in the Appointment collection
  const existingAppointments = getAppointmentsForDate(date);
  const exists = existingAppointments.some(
    (appointment) => appointment.time === time
  );
  if (exists) {
    alert("Appointment slot already exists for this date and time.");
    return;
  }

  // Create a new Appointment object and save it to the database
  const appointment = { date, time };
  // Replace this with your own function to save the appointment to the database
  saveAppointment(appointment);

  // Display a success message and reset the form
  alert("Appointment slot added successfully.");
  document.getElementById("appointment-date").value = "";
  document
    .querySelectorAll('input[name="appointment-time"]')
    .forEach((input) => (input.checked = false));
  document.getElementById("appointment-times").innerHTML = "";
}

// Render the available appointment times for the selected date
function renderAvailableTimes() {
  const date = document.getElementById("appointment-date").value;
  const availableTimes = fetchAvailableTimes(date);
  let html = "";
  availableTimes.forEach((time) => {
    html += `<input type="radio" name="appointment-time" value="${time}">${time}<br>`;
  });
  document.getElementById("appointment-times").innerHTML = html;
}

// Bind event listeners
document
  .getElementById("appointment-date")
  .addEventListener("change", renderAvailableTimes);
document
  .getElementById("add-appointment")
  .addEventListener("click", addAppointment);
