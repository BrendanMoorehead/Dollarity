export default function useDates() {
    var today = new Date();
    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
      ];
    var monthIndex = today.getMonth();
    var currentMonth = monthNames[monthIndex];

    return { currentMonth }
}