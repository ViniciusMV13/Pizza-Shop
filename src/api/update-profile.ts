import { api } from '@/lib/axios'

export interface postUptdateManagedRestaurantBody {
  name: string
  description: string | null
}
export async function patchUptdateManagedRestaurant({
  name,
  description,
}: postUptdateManagedRestaurantBody) {
  await api.put('/profile', { name, description })
}
