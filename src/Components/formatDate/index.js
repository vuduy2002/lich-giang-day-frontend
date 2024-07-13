  // Hàm chuyển từ mm/dd/yyyy sang dd/mm/yyyy
export const convertToMMDDYYYY = (date) => {
    const [day, month, year] = date.split('-');
    return `${month}/${day}/${year}`;
  }

  // Hàm chuyển từ mm/dd/yyyy sang dd/mm/yyyy
export const  convertToDDMMYYYY= (date) => {
    const [month, day, year] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  // Hàm chuyển từ mm/dd/yyyy sang dd/mm/yyyy
export const  convertFromYYYYMMDD = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

export const convertToYYYYMMDD = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return ''; // Return empty string or handle error as needed
  }

  const parts = dateString.split('/');
  if (parts.length !== 3) {
    return ''; // Return empty string or handle error as needed
  }

  const [day, month, year] = parts;
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return ''; // Return empty string or handle error as needed
  }

  // Assuming day, month, year are valid numbers, format them into YYYY-MM-DD
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};


