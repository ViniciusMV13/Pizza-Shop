import { http, HttpResponse } from 'msw'

import { postUptdateManagedRestaurantBody } from '../update-profile'

export const updateProfileMock = http.put<
  never,
  postUptdateManagedRestaurantBody
>('/profile', async ({ request }) => {
  const { name } = await request.json()

  if (name === 'Rocket Shop') {
    return new HttpResponse(null, {
      status: 204,
    })
  }

  return new HttpResponse(null, { status: 400 })
})
