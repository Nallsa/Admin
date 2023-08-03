import {FC, ChangeEvent} from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { IDeliveryArea } from 'dto/pizzerias.dto'
import { useActions } from 'hooks/useActions'
import { useSelector } from 'react-redux'
import { RootState } from 'dataStore/state'
import AddressService from 'dataStore/service/address.service'
import CityChoice from './CityChoice'
import StreetChoice from './StreetChoice'

interface IProps {
	state: IDeliveryArea
	setState: Function
}

const FormComponent: FC<IProps> = ({state, setState}) => {

	const handleChangeAddress = (
    name: string,
    value: number | string | null
  ): void => {
    setState((prev: IDeliveryArea) => ({
      ...prev, [name]: value
    }))
	}

	const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.name === 'delivery_price') {
			setState((prev: IDeliveryArea) => ({
				...prev, [e.target.name]: Number(e.target.value)
			}))
		} else {
			setState((prev: IDeliveryArea) => ({
				...prev, [e.target.name]: e.target.value
			}))
		}
	}

	return (
		<>
			<CityChoice state={state} setState={handleChangeAddress} />
			{/* <StreetChoice state={state} setState={handleChangeAddress} /> */}
			<TextField
				value={state?.area}
				name="area"
				type="text"
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-city'
				label='Название зоны как на карте'
				fullWidth
				variant='outlined'
				onChange={handleChangeData}
			/>
			<TextField
				value={state?.min_order_price}
				name="min_order_price"
				onChange={handleChangeData}
				type="number"
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-min_order_price'
				label='Минимальная сумма заказа'
				fullWidth
				variant='outlined'
				/>
			<TextField
				value={state?.delivery_price}
				name="delivery_price"
				onChange={handleChangeData}
				type="number"
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-delivery_price'
				label='Стоимость доставки'
				fullWidth
				variant='outlined'
				/>
			<TextField
				value={state?.delivery_description}
				name="delivery_description"
				onChange={handleChangeData}
				type="text"
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-delivery_description'
				label='Комментарий'
				fullWidth
				variant='outlined'
				/>
		</>
	)
}

export default FormComponent