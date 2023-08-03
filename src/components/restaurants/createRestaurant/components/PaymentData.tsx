import { FC, useState, useEffect, ChangeEvent } from 'react'

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PizzeriaService from 'dataStore/service/pizzeria.service';
import { IPizzeria } from 'dto/pizzerias.dto';

interface IProps {
	state: any
	setState: Function
}

export interface IPaymentMethods {
	id: number;
	type: string;
	description: string;
}

const PaymentData: FC<IProps> = ({ state, setState }) => {
	const [data, setData] = useState<IPaymentMethods[] | null>(null)

	const fetchData = (): void => {
		PizzeriaService.getAllMethods().then(res=> setData(res?.data)).catch(error=> console.log(error))
	}

	useEffect(() => {
		fetchData()
	},[])

	const handleChangeSelect = (event: SelectChangeEvent): void => {
		setState((prev: IPizzeria) => ({ ...prev, payment_method: event.target.value}))
	};

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
		setState((prev: IPizzeria) => ({ ...prev, [event.target.name]: event.target.value}))
	};

	return (
		<div>
			<FormControl fullWidth sx={{marginTop: '5px', marginBottom: '5px'}}>
				<InputLabel id="demo-simple-select-helper-label">Платёжный сервис</InputLabel>
				<Select
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={`${state?.payment_method}`}
					onChange={handleChangeSelect}
					label="Платёжный сервис"
					size="small"
			>
					{data?.map(el => (
					<MenuItem key={el?.type} value={`${el?.type}`}>{`${el?.description}`}</MenuItem>
				))}
				</Select>
			</FormControl>

			<TextField
				value={state?.api_login}
				name='api_login'
				onChange={handleChangeInput}
				sx={{marginTop: '5px', marginBottom: '5px'}}
				size='small'
				id='outlined-basic-login'
				label='Логин'
				fullWidth
				variant='outlined'
				type="password"
			/>

			<TextField
				value={state?.api_password}
				name='api_password'
				onChange={handleChangeInput}
				sx={{marginTop: '5px', marginBottom: '5px'}}
				size='small'
				id='outlined-basic-pass'
				label='Пароль'
				fullWidth
				variant='outlined'
				type="password"
			/>

			<TextField
				value={state?.secret_key}
				name='secret_key'
				onChange={handleChangeInput}
				sx={{marginTop: '5px', marginBottom: '5px'}}
				size='small'
				type="password"
				id='outlined-basic-pass'
				label='Секретный ключ'
				fullWidth
				variant='outlined'
			/>

		</div>
	)
}

export default PaymentData