
// Generate calendar array that can be use to display the calendar UI grid
// Example output:
/*
    [
        null, null, null, 1, 2, 3, 4,
        5, 6, 7, 8, 9, 10, 11],
        12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, null, null
    ]
*/
export function generateCalendar(month: number, year: number) {
    const calendar = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendar.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendar.push(day);
    }

    return calendar;
}

// convert 24 hour timestamp to 12 hour time
// example parameter: '13:00:00'
// example output: 1:00 PM
export function to12HourTime(time: string) {
    const [hour, minutes] = time.split(':');
    let parsedHour = parseInt(hour, 10);

    const period = parsedHour >= 12 ? 'PM' : 'AM';

    if (parsedHour === 0) {
        parsedHour = 12;
    } else if (parsedHour > 12) {
        parsedHour -= 12;
    }
    return `${parsedHour}:${minutes} ${period}`;
}