function filterTransactions(transactions, filters) {
  return transactions.filter((t) => {
    if (filters.category && t.category !== filters.category) return false;
    if (filters.isStarred !== undefined && t.isStarred !== filters.isStarred)
      return false;
    if (filters.startDate && new Date(t.date) < new Date(filters.startDate))
      return false;
    if (filters.endDate && new Date(t.date) > new Date(filters.endDate))
      return false;
    if (filters.minValue !== undefined && t.value < filters.minValue)
      return false;
    if (filters.maxValue !== undefined && t.value > filters.maxValue)
      return false;
    if (
      filters.comment &&
      !t.comment.toLowerCase().includes(filters.comment.toLowerCase())
    )
      return false;
    return true;
  });
}

export default filterTransactions;
