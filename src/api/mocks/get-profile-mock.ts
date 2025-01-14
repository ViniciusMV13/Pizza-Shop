import { http, HttpResponse } from 'msw'

import { getProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, getProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'John Doe',
      email: 'viniciuscordeiro789@gmail.com',
      phone: '123456789',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
