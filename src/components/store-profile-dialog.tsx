import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  getManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { patchUptdateManagedRestaurant } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: restaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ['managed-restaurant'],
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurant?.name ?? '',
      description: restaurant?.description ?? '',
    },
  })

  async function handleUpdateRestaurant(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        description: data.description,
        name: data.name,
      })

      toast.success('Informações atualizadas com sucesso.')
    } catch {
      toast.error('Falha ao enviar as informações.')
    }
  }

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<getManagedRestaurantResponse>([
      'managed-restaurant',
    ])
    console.log(cached)
    if (cached) {
      queryClient.setQueryData<getManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: patchUptdateManagedRestaurant,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })
      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações da loja visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateRestaurant)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome da loja
            </Label>
            <Input
              className="col-span-3"
              id="name"
              type="text"
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              className="col-span-3 resize-none"
              id="description"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="succes" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
