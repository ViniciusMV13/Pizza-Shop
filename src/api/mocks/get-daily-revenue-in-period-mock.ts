import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', async () => {
  return HttpResponse.json([
    { date: '01/01/2025', receipt: 100 },
    { date: '02/01/2025', receipt: 521 },
    { date: '03/01/2025', receipt: 300 },
    { date: '04/01/2025', receipt: 432 },
    { date: '05/01/2025', receipt: 932 },
    { date: '06/01/2025', receipt: 165 },
    { date: '07/01/2025', receipt: 700 },
  ])
})
