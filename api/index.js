// console.log("Date and Time in UTC", new Date())

// Convert the date and time to Indian Standard Time (IST)
console.log(
  "Date and Time in IST",
  new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
);
