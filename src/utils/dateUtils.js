export function formatDate(date) {
    return new Date(date).toISOString().substring(0, 10);
  }
  
export function getFormattedDateRange(start = -8, end = -1) {
    if(start > end){
        throw new Error("Start date must be before end date");
    }

    const today = new Date();
    const startDate = new Date(today).setDate(today.getDate() + start);
    const endDate = new Date(today).setDate(today.getDate() + end);

    return {
        endDate: formatDate(endDate),
        startDate: formatDate(startDate),
    };
}