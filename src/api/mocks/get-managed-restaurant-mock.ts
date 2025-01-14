import { http, HttpResponse } from 'msw'

import { getManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  getManagedRestaurantResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    name: 'Pizza Shop',
    createdAt: new Date(),
    description: 'A nice restaurant',
    managerId: 'custom-manager-id',
    updatedAt: null,
  })
})
