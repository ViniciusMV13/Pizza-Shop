import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularpoductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    { product: 'pizza 01', amount: 10 },
    { product: 'pizza 02', amount: 8 },
    { product: 'pizza 03', amount: 5 },
    { product: 'pizza 04', amount: 3 },
    { product: 'pizza 05', amount: 2 },
  ])
})
