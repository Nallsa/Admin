import { ChangeEvent, FC } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { IPizzeria } from 'dto/pizzerias.dto'

import {Wrapper, HeaderTitle, Row} from './Styles.elements'

interface IProps {
	state: IPizzeria | null
	setState: Function
	handleSave: ()=>void
	handleCancel: ()=>void
}

const AccountingSystem: FC<IProps> = ({ state, setState, handleSave, handleCancel }) => {


  const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IPizzeria) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

	return (
		<Wrapper>
			<HeaderTitle>Система учёта</HeaderTitle>
			<TextField
				value={state?.accounting_secret_key}
				name='accounting_secret_key'
				onChange={handleChangeData}
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-accounting_secret_key'
				label='Секретный ключ'
				fullWidth
				variant='outlined'
				type='password'
			/>
			<TextField
				value={state?.accounting_key_affiliate}
				name='accounting_key_affiliate'
				onChange={handleChangeData}
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-accounting_key_affiliate'
				label='Ключ филиала'
				fullWidth
				variant='outlined'
				type='text'
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

export default AccountingSystem
