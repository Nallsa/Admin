import {FC} from 'react'
import { IDeliveryArea } from '../../../../dto/pizzerias.dto';
import { IconButton, TextField } from '@mui/material';
import {Row} from './Styles.elements'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface IProps {
	state: IDeliveryArea
	setOpenEdit: Function
}

const Area: FC<IProps> = ({state, setOpenEdit}) => {
	return (
		<Row>
			<IconButton onClick={()=>setOpenEdit(state)}><ModeEditOutlineOutlinedIcon /></IconButton>
			<TextField
				value={state?.city?.city}
				name="city"
				type="text"
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-city'
				label='Населённый пункт'
				fullWidth
				variant='outlined'
				disabled
			/>
			<TextField
				value={state?.street?.street}
				name="street"
				type="text"
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-street'
				label='Улица'
				fullWidth
				variant='outlined'
				disabled
			/>
			<TextField
				value={state?.delivery_price}
				name="delivery_price"
				type="number"
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-delivery_price'
				label='Стоимость доставки'
				fullWidth
				variant='outlined'
				disabled
			/>
			<TextField
				value={state?.delivery_description}
				name="delivery_description"
				type="text"
				sx={{ marginTop: '5px', marginBottom: '5px' }}
				size='small'
				id='outlined-basic-delivery_description'
				label='Коментарий'
				fullWidth
				variant='outlined'
				disabled
			/>

		</Row>
	)
}

export default Area