const { format } = require('date-fns')
const getSales = (salesData) => {

  const previousYearDate = new Date(new Date());
  previousYearDate.setFullYear(new Date().getFullYear() - 1);


  const filterDate = (dateKey, date2, formatting) => {
    return salesData.filter(item => String(item[dateKey]) === format(date2, formatting))
      .map(item => ({ sold: item.sold, revenue: item.revenue }));
  }

  const currentYearSales = filterDate('year', new Date(), 'yyyy').reduce((acc, sale) => acc + Number(sale.sold), 0);

  const previousYearSales = filterDate('year', previousYearDate, 'yyyy').reduce((acc, sale) => acc + Number(sale.sold), 0);

  console.log(previousYearSales)


  // console.log(filterDate('year', new Date().getFullYear() - 1, 'yyyy'))

  // // 3. Current Sales This Month (November 2023)
  // const currentMonthSales = data.filter(item => item.month === 'November' && item.year === 2023)
  //   .reduce((acc, item) => acc + parseInt(item.sold), 0);

  // // 4. Previous Month Sales (October 2023)
  // const prevMonthSales = data.filter(item => item.month === 'October' && item.year === 2023)
  //   .reduce((acc, item) => acc + parseInt(item.sold), 0);

  // // 5. Average Yearly Sales
  // const averageYearlySales = currentYearSales / (new Set(data.map(item => item.year)).size);

  // // 6. Average Monthly Sales This Year (up to November 2023)
  // const averageMonthlySalesThisYear = currentYearSales / 11; // January to November

  // // 7. This Week Sales (Week 48, November 2023)
  // const thisWeekSales = data.filter(item => item.week === 48 && item.year === 2023)
  //   .reduce((acc, item) => acc + parseInt(item.sold), 0);

  // // 8. Average Weekly Sales This Year
  // const averageWeeklySalesThisYear = currentYearSales / (new Set(data.map(item => item.week)).size);

  // // 9. All-Time Sales
  // const allTimeSales = currentYearSales + prevYearSales;

  const sales = {
    sold: {
      current_year: '',
      prev_year: "",
      yearly: "",
      year_monthly: "",
      all_time: 0
    },
    revenue: {
      current_year: '',
      prev_year: "",
      yearly: "",
      year_monthly: "",
      all_time: 0

    }
  }






  return salesData
}

module.exports = getSales