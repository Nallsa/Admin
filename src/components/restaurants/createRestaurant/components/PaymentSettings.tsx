import { ChangeEvent, FC } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { IPizzeria } from 'dto/pizzerias.dto'

import PaymentData from './PaymentData'

import {Wrapper, HeaderTitle, Row} from './Styles.elements'

interface IProps {
	state: IPizzeria | null
	setState: Function
	handleSave: ()=>void
	handleCancel: ()=>void
}

const PaymentSettings: FC<IProps> = ({ state, setState, handleSave, handleCancel }) => {


  const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IPizzeria) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

	return (
		<Wrapper>
			<HeaderTitle>Минимальная сумма заказа</HeaderTitle>
			<TextField
				value={state?.min_order_price}
				onChange={e =>
					setState((prev: IPizzeria) => ({
						...prev,
						min_order_price: Number(e.target.value),
					}))
				}
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-min_order_price'
				label='Сумма для бесплатной доставки'
				fullWidth
				variant='outlined'
				type='number'
			/>
			<TextField
				value={state?.delivery_price}
				onChange={e =>
					setState((prev: IPizzeria) => ({
						...prev,
						delivery_price: Number(e.target.value),
					}))
				}
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-delivery_price'
				label='Стоимость доставки'
				fullWidth
				variant='outlined'
				type='number'
			/>
			<HeaderTitle>Платёжная система</HeaderTitle>
					<PaymentData state={state} setState={setState} />

			<Row>
        <Button onClick={handleSave} variant='text'>
          Сохранить
        </Button>
        <Button onClick={handleCancel} color='error' variant='text'>
          Отмена
        </Button>
      </Row>
		</Wrapper>
	)
}

export default PaymentSettings
