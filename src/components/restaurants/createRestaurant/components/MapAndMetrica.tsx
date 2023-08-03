import { ChangeEvent, FC } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { IContacts, IPizzeria } from 'dto/pizzerias.dto'

import AdminData from './AdminData'
import ChangeStatus from './ChangeStatus'
import AddContact from './addContact'

import {Wrapper, HeaderTitle, Row} from './Styles.elements'

interface IProps {
	state: IPizzeria | null
	setState: Function
	handleSave: ()=>void
	handleCancel: ()=>void
}

const MapAndMetrica: FC<IProps> = ({ state, setState, handleSave, handleCancel }) => {


  const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IPizzeria) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

	return (
		<Wrapper>
			<HeaderTitle>Метрика</HeaderTitle>
				<TextField
					value={state?.yandex_metrica}
					name='yandex_metrica'
					onChange={handleChangeData}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					size='small'
					id='outlined-basic-name'
					label='Код метрики'
					fullWidth
					variant='outlined'
				/>
				<TextField
					value={state?.yandex_counter}
					name='yandex_counter'
					onChange={handleChangeData}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					size='small'
					id='outlined-basic-name'
					label='Ссылка на счётчик'
					fullWidth
					variant='outlined'
			/>
			<HeaderTitle>Ссылка на карту IFrame</HeaderTitle>
			<TextField
				value={state?.map}
				name='map'
				onChange={handleChangeData}
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-map'
				label='Карта'
				fullWidth
				variant='outlined'
			/>
			<TextField
				value={state?.delivery_description}
				name='delivery_description'
				onChange={handleChangeData}
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				multiline
				rows={4}
				id='outlined-basic-delivery'
				fullWidth
				label='Условия доставки'
				variant='outlined'
			/>

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

export default MapAndMetrica
