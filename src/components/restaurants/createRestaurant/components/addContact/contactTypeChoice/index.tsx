import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'dataStore/state'
import { useActions } from 'hooks/useActions'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'
import { IContacts } from 'dto/pizzerias.dto'

interface IProps {
  state: IContacts
  setState: (contact: any) => void
  deleteContactById: (id: number) => Promise<void>
}

interface IContactState {
  showInput: boolean
  contact_type: string
  contact_type_id: number | null
}

const ContactTypeChoice: FC<IProps> = ({
  state,
  setState,
  deleteContactById,
}) => {
  const { contactTypes } = useSelector((state: RootState) => state.pizzerias)
  const { getAllContactsTypes, createContactType } = useActions()
  const [contactState, setContactState] = useState(state?.contact)
  const [addContact, setAddContact] = useState<IContactState>({
    showInput: false,
    contact_type_id: null,
    contact_type: '',
  })

  const fetchHandler = async () => {
    if (contactTypes.length === 0) {
      const query = await getAllContactsTypes()
      return query
    }
    return null
  }

  useEffect(() => {
    fetchHandler()
  }, [])

  const handleChange = (type: any): void => {
    /* 	setAddContact({ ...addContact, contact_type_id: Number(type.id), contact_type: type.contact_type }) */
    setState({
      ...state,
      contact_type_id: Number(type.id),
      contact_type: type.contact_type,
    })
  }

  const handleShowInput = (): void => {
    setAddContact({ ...addContact, showInput: !addContact.showInput })
  }

  const handleChangeTypeInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddContact({ ...addContact, contact_type: event.currentTarget.value })
    /* setState({...state, contact_type: event.currentTarget.value}) */
  }

  const handleChangeInputContact = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    /* setAddContact({ ...addContact, contact: event.currentTarget.value }) */
    setContactState(event.currentTarget.value)
    setState({ ...state, contact: event.currentTarget.value })
  }

  const handleCreateType = (): void => {
    if (!state.contact_type_id && addContact.contact_type.length > 0) {
      createContactType({ contact_type: addContact.contact_type }).then(() => {
        setAddContact({
          ...addContact,
          contact_type: '',
          showInput: !addContact.showInput,
        })
      })
    }
    setAddContact({ ...addContact, showInput: !addContact.showInput })
  }

  const handleDeleteContact = (): void => {
    if (state.id) {
      deleteContactById(state.id)
    }
  }

  return (
    <div>
      {state.contact_type_id ? (
        <>
          <FormControl
            fullWidth
            variant='outlined'
            sx={{ marginTop: '5px', marginBottom: '5px' }}
          >
            <InputLabel size='small' htmlFor='adornment-contact'>
              {state.contact_type}
            </InputLabel>
            <OutlinedInput
              id='adornment-contact'
              type='text'
              size='small'
              label={state.contact_type}
              value={contactState}
              onChange={handleChangeInputContact}
              endAdornment={
                <InputAdornment position='end'>
                  <Tooltip title='Удалить контакт' placement='top'>
                    <IconButton
                      aria-label='toggle city'
                      onClick={handleDeleteContact}
                      edge='end'
                    >
                      <ClearIcon sx={{ color: 'red' }} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
            />
          </FormControl>
        </>
      ) : (
        <>
          {addContact.showInput ? (
            <FormControl
              fullWidth
              variant='outlined'
              sx={{ marginTop: '5px', marginBottom: '5px' }}
            >
              <InputLabel size='small' htmlFor='adornment-type'>
                Новый тип контакта
              </InputLabel>
              <OutlinedInput
                id='adornment-type'
                type='text'
                size='small'
                label='Новый тип контакта'
                value={addContact.contact_type}
                onChange={handleChangeTypeInput}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle type'
                      onClick={handleCreateType}
                      edge='end'
                    >
                      <CheckBoxOutlinedIcon sx={{ color: 'green' }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          ) : (
            <FormControl
              fullWidth
              sx={{ marginTop: '5px', marginBottom: '5px' }}
            >
              <InputLabel size='small' id='contact-select-label'>
                Тип контакта
              </InputLabel>
              <Select
                labelId='contact-select-label'
                id='contact-select'
                /* value={contactTypes?.filter(contact=> contact.id === state.cityId).length > 0 ? state.streetId : ''} */
                label='Тип контакта'
                size='small'
                /* onChange={handleChange} */
              >
                {contactTypes?.map((type, index) => (
                  <MenuItem
                    value={type?.id || index}
                    key={index}
                    onClick={() => handleChange(type)}
                  >
                    {type.contact_type}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleShowInput}>
                  + Добавить тип контакта
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </>
      )}
    </div>
  )
}

export default ContactTypeChoice
