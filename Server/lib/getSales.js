const { format } = require('date-fns')
const getSales = (salesData) => {
  if (!salesData || salesData.length === 0) return null

  const currentDate = new Date();
  const previousYearDate = new Date(currentDate);
  const previousMonthDate = new Date(currentDate);
  const previousDayDate = new Date(currentDate)

  previousYearDate.setFullYear(currentDate.getFullYear() - 1);
  previousMonthDate.setMonth(currentDate.getMonth() - 1);
  previousDayDate.setDate(currentDate.getDate() - 1);

  function filterDate(dateKey, date, formatting, strict) {
    if (!strict) {
      return salesData.filter(item => String(item[dateKey]) === format(date, formatting))
        .reduce((acc, sale) => accumulateSales(acc, sale), { sold: 0, revenue: 0 })
    }
    return salesData.filter(item => format(item[dateKey], formatting) === format(date, formatting))
      .reduce((acc, sale) => accumulateSales(acc, sale), { sold: 0, revenue: 0 })
  }

  function accumulateSales(acc, sale) {
    return {
      sold: acc.sold + Number(sale.sold),
      revenue: acc.revenue + Number(sale.revenue),
    };
  }

  const currentYearSales = filterDate('year', currentDate, 'yyyy', false);
  const previousYearSales = filterDate('year', previousYearDate, 'yyyy', false)
  const currentMonthSales = filterDate('transaction_date', currentDate, 'M, yyyy', true)
  const previousMonthSales = filterDate('transaction_date', previousMonthDate, 'M, yyyy', true)
  const currentDaySales = filterDate('transaction_date', currentDate, 'PP', true);
  const previousDaySales = filterDate('transaction_date', previousDayDate, 'PP', true);
  const allTimeSales = salesData.reduce((acc, sales) => accumulateSales(acc, sales), { sold: 0, revenue: 0 })

  const sales = {
    sold: {
      year: [
        {
          name: 'current year',
          value: currentYearSales.sold ?? 0
        },
        {
          name: 'previous year',
          value: previousYearSales.sold ?? 0,
        },
      ],
      month: [
        {
          name: 'current month',
          value: currentMonthSales.sold ?? 0
        },
        {
          name: 'previous month',
          value: previousMonthSales.sold ?? 0
        },
      ],
      day: [
        {
          name: 'today',
          value: currentDaySales.sold ?? 0
        },
        {
          name: 'yesterday',
          value: previousDaySales.sold ?? 0
        },
      ],
      all: [
        {
          name: 'total sales',
          value: allTimeSales.sold ?? 0
        },
      ]
    },
    revenue: {
      year: [
        {
          name: 'current year',
          value: currentYearSales.revenue ?? 0
        },
        {
          name: 'previous year',
          value: previousYearSales.revenue ?? 0,
        },
      ],
      month: [
        {
          name: 'current month',
          value: currentMonthSales.revenue ?? 0
        },
        {
          name: 'previous month',
          value: previousMonthSales.revenue ?? 0
        },
      ],
      day: [
        {
          name: 'today',
          value: currentDaySales.revenue ?? 0
        },
        {
          name: 'yesterday',
          value: previousDaySales.revenue ?? 0
        },
      ],
      all: [
        {
          name: 'total sales',
          value: allTimeSales.revenue ?? 0
        },
      ]
    }
  }

  return sales
}

module.exports = getSales