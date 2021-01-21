export function formatDateFromMillis(millis) {
    const date = new Date(millis);
    let formattedDate = formatDateNumber(
        date.getDate() + '.' + formatDateNumber(date.getMonth() + 1) + '.' + date.getFullYear()
    );
    return formattedDate;
}

export function formatHourFromMillis(millis) {
    const date = new Date(millis);
    let formattedDate = formatDateNumber(date.getHours()) + ':' + formatDateNumber(date.getMinutes());
    return formattedDate;
}

function formatDateNumber(number) {
    return number < 10 ? '0' + number : number;
}
