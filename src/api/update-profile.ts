import { api } from '@/lib/axios'

interface postUptdateManagedRestaurantResponse {
  name: string
  description: string | null
}
export async function patchUptdateManagedRestaurant({
  name,
  description,
}: postUptdateManagedRestaurantResponse) {
  await api.put('/profile', { name, description })
}
