import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrdersDetailMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'viniciuscordeiro789@gmail.com',
      phone: '123456789',
    },
    status: 'pending',
    totalInCents: 3900,
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'product-1',
        priceInCents: 1200,
        product: { name: 'Product 1' },
        quantity: 2,
      },
      {
        id: 'product-2',
        priceInCents: 1500,
        product: { name: 'Product 2' },
        quantity: 1,
      },
    ],
  })
})
