import PizzeriaService from 'dataStore/service/pizzeria.service'
import { IDeliveryArea, IDeliveryAreaSettings, IPizzeria } from 'dto/pizzerias.dto'
import { FC, useState, useEffect, ChangeEvent } from 'react'

import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'


import { Wrapper, Row, HeaderTitle } from './Styles.elements'
import Area from './Area'
import FormComponent from './FormComponent';
import { useActions } from 'hooks/useActions'
import { toast } from 'react-toastify'

interface IProps {
	state: IPizzeria
	handleCancel: ()=>void
}

const initialState: IDeliveryAreaSettings = {
	id: null,
	pizzeria_id: null,
	pizzeria_coords: [],
	search_coords:[],
	geo_json: '',
	api_key: '',
}

const initialAreaState: IDeliveryArea = {
	id: null,
	pizzeria_id: null,
	cityId: null,
	city: null,
	area: '',
	min_order_price: null,
	streetId: null,
	street: null,
	delivery_price: null,
	delivery_description: null,
	is_active: true,
}

const Delivery: FC<IProps> = ({ state, handleCancel }) => {
	const { deleteDeliveryArea, editDeliveryArea, createDeliveryArea } = useActions()
	const [deliveryAreaSettings, setDeliveryAreaSettings] = useState<IDeliveryAreaSettings>(initialState)
	const [area, setArea] = useState<IDeliveryArea[]>([])
	const [createArea, setCreateArea] = useState<IDeliveryArea>(initialAreaState)
	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		if (state.id) {
			PizzeriaService.getDeliveryAreaSettingsByPizzeria(state.id).then(res => {
				const { area, ...rest } = res.data
				setDeliveryAreaSettings(rest)
				if (area) {
					setArea(area)
				}
			}).catch ((error: any) => {
				if (error?.data?.message) {
					toast.error(error?.data?.message)
				} else {
					toast.error(error?.statusText ?? 'Ошибка получения данных')
				}
			})
		}

		return () => {
		}
	}, [state.id])

	const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    setDeliveryAreaSettings((prev: IDeliveryAreaSettings) => ({
      ...prev,
      [e.target.name]: e.target.name !=='geo_json' ? e.target.value.replaceAll(/\s/g,'') : e.target.value,
    }))
	}

	const handleClose = () => {
		setOpen(false)
		setCreateArea(initialAreaState)
  }

	const handleEdit = (data: IDeliveryArea): void => {
		setCreateArea(data)
		setOpen(true)
	}
	const handleDelete = (): void => {
		deleteDeliveryArea(createArea).then(((res: any) => {
				setArea((prev:IDeliveryArea[]) => (prev?.filter(item => item.id !== res?.payload?.id)))
		})).catch((error:any)=> console.log(error))
		handleClose()
	}

	const handleSave = (): void => {
		if (deliveryAreaSettings?.id) {
			PizzeriaService.editDeliveryAreaSettings({ ...deliveryAreaSettings, pizzeria_id: state.id }).then(res => {
				const { area, ...rest } = res.data
					setDeliveryAreaSettings(rest)
					if (area) {
						setArea(area)
					}
				toast.success('Данные обновлены')
			}).catch ((error: any) => {
				if (error?.data?.message) {
					toast.error(error?.data?.message)
				} else {
					toast.error(error?.statusText ?? 'Ошибка сохранения данных')
				}
			})
		} else {
			PizzeriaService.createDeliveryAreaSettings({ ...deliveryAreaSettings, pizzeria_id: state.id }).then(res => {
				const { area, ...rest } = res.data
					setDeliveryAreaSettings(rest)
					if (area) {
						setArea(area)
					}
					toast.success('Данные сохранены')
			}).catch ((error: any) => {
				if (error?.data?.message) {
					toast.error(error?.data?.message)
				} else {
					toast.error(error?.statusText ?? 'Ошибка сохранения данных')
				}
			})
		}
	}

	const handleAddForm = (): void => {
		if (createArea?.id) {
			editDeliveryArea({...createArea, pizzeria_id: state.id}).then(((res: any) => {
				setArea((prev: IDeliveryArea[]) => (prev?.map(item => item.id === res?.payload?.id ? res?.payload : item)))
				setCreateArea(initialAreaState)
			})).catch((error:any)=> console.log(error))
		} else {
			createDeliveryArea({...createArea, pizzeria_id: state.id}).then(((res: any) => {
				if (!area.length) {
					setArea([res?.payload])
					setCreateArea(initialAreaState)
				} else {
					setArea((prev: IDeliveryArea[]) => ([...prev, res?.payload]))
					setCreateArea(initialAreaState)
				}
			})).catch((error:any)=> console.log(error))
		}
		handleClose()
	}

	return (
		<>
			<Wrapper>
				<HeaderTitle>
					Настройка зон доставки
				</HeaderTitle>
				<TextField
					value={deliveryAreaSettings?.pizzeria_coords}
					name='pizzeria_coords'
					onChange={handleChangeData}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					size='small'
					id='outlined-basic-pizzeria_coords'
					label='Координаты пиццерии'
					fullWidth
					variant='outlined'
					type='text'
				/>
				<TextField
					value={deliveryAreaSettings?.search_coords}
					name='search_coords'
					onChange={handleChangeData}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					size='small'
					id='outlined-basic-search_coords'
					label='Координаты квадрата поиска'
					fullWidth
					variant='outlined'
					type='text'
				/>
				<TextField
					value={deliveryAreaSettings?.geo_json}
					name='geo_json'
					onChange={handleChangeData}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					size='small'
					id='outlined-basic-geo_json'
					label='GeoJson объект яндекса'
					fullWidth
					variant='outlined'
					type='text'
				/>
				<TextField
					value={deliveryAreaSettings?.api_key}
					name='api_key'
					onChange={handleChangeData}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					size='small'
					id='outlined-basic-api_key'
					label='API ключ яндекс карт'
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

			<Wrapper style={{marginTop: '20px'}}>
				<Row style={{alignItems: 'center'}}>
					<HeaderTitle>
						Зоны доставки
					</HeaderTitle>
					<Button onClick={()=>setOpen(true)}>Добавить адрес</Button>
				</Row>
				{area?.map((area: IDeliveryArea) => (
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
					<FormComponent state={createArea} setState={setCreateArea} />
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

export default Delivery