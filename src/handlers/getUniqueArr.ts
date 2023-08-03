import { IOrder } from 'dto/orders.dto'

type IUniqueCity = { text: string; value: string }[]

export const getUniqueCityArr = (data: IOrder[]): IUniqueCity => {
  const arr = data?.map((el: any) => el?.pizzeria?.address?.city)
  const unique = new Set(arr)
  const map = []

  for (const elem of unique) {
    if (elem) {
      map.push({ text: elem, value: elem })
    }
  }

  return map
}
