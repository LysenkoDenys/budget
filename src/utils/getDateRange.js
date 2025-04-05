const getDateRange = (type, period) => {
  const now = new Date();
  let startDate, endDate;

  if (type === 'current') {
    endDate = now;

    if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'week') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(now.setDate(diff));
    }
  } else if (type === 'previous') {
    if (period === 'year') {
      startDate = new Date(now.getFullYear() - 1, 0, 1);
      endDate = new Date(now.getFullYear() - 1, 11, 31);
    } else if (period === 'month') {
      const firstDayLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );
      const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      startDate = firstDayLastMonth;
      endDate = lastDayLastMonth;
    } else if (period === 'week') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      const startOfCurrentWeek = new Date(now.setDate(diff));
      const startOfPreviousWeek = new Date(startOfCurrentWeek);
      startOfPreviousWeek.setDate(startOfCurrentWeek.getDate() - 7);
      const endOfPreviousWeek = new Date(startOfCurrentWeek);
      endOfPreviousWeek.setDate(startOfCurrentWeek.getDate() - 1);
      startDate = startOfPreviousWeek;
      endDate = endOfPreviousWeek;
    }
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};

export default getDateRange;
