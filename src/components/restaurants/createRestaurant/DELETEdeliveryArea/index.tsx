import { FC, useState } from 'react'

import { Wrapper, HeaderTitle, Row } from './Styles.elements'
import {IDeliveryArea, IPizzeria} from '../../../../dto/pizzerias.dto'
import { Button } from '@mui/material'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormComponent from './FormComponent'
import { useActions } from 'hooks/useActions'
import Area from './Area'

interface IProps {
	state: IPizzeria
	setState: Function
}

const initialState: IDeliveryArea = {
	id: null,
	pizzeria_id: null,
	cityId: null,
	city: null,
	area: null,
	min_order_price: null,
	streetId: null,
	street: null,
	delivery_price: null,
	delivery_description: null,
	is_active: true,
}

const DeliveryArea: FC<IProps> = ({state, setState}) => {
	const [area, setArea] = useState<IDeliveryArea>(initialState)
	const [open, setOpen] = useState<boolean>(false)
	const { createDeliveryArea, deleteDeliveryArea, editDeliveryArea } = useActions()

	const handleClose = () => {
		setOpen(false)
		setArea(initialState)
  }

	const handleAddForm = (): void => {
		if (area?.id) {
			editDeliveryArea({...area, pizzeria_id: state.id}).then(((res: any) => {
				setState((prev:IPizzeria)=> ({...prev, delivery_area: prev?.delivery_area?.map(item => item.id === res?.payload?.id ? res?.payload : item)}))
			})).catch((error:any)=> console.log(error))
		} else {
			createDeliveryArea({...area, pizzeria_id: state.id}).then(((res: any) => {
				if (!state.delivery_area) {
					setState((prev:IPizzeria)=> ({...prev, delivery_area: [res?.payload]}))
				} else {
					setState((prev:IPizzeria)=> ({...prev, delivery_area: [...prev?.delivery_area!, res?.payload]}))
				}
			})).catch((error:any)=> console.log(error))
		}
		handleClose()
	}

	const handleEdit = (data: IDeliveryArea): void => {
		setArea(data)
		setOpen(true)
	}
	const handleDelete = (): void => {
		deleteDeliveryArea(area).then(((res: any) => {
				setState((prev:IPizzeria)=> ({...prev, delivery_area: prev?.delivery_area?.filter(item => item.id !== res?.payload?.id)}))
		})).catch((error:any)=> console.log(error))
		handleClose()
	}

	return (
		<>
			<Wrapper>
				<Row>
					<HeaderTitle>
						Зоны доставки
					</HeaderTitle>
					<Button onClick={()=>setOpen(true)}>Добавить адрес</Button>
				</Row>
				{state?.delivery_area?.map((area: IDeliveryArea) => (
					<Area key={area.id} state={area} setOpenEdit={handleEdit} />
				))}
			</Wrapper>
			{/* =================== */}
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Добавление адреса доставки</DialogTitle>
        <DialogContent>
          {/* <InputWrapper style={{ margin: '5px 0' }}>
            <CreateComponent state={newStatus} setState={setNewStatus} />
          </InputWrapper> */}
					<FormComponent state={area} setState={setArea} />
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={handleAddForm}>
            Сохранить
          </Button>
          <Button variant='text' onClick={handleDelete} color='error'>
            Удалить
          </Button>
          <Button variant='text' onClick={handleClose} color='error'>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
		</>
	)
}

export default DeliveryArea