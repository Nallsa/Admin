import { FC } from 'react'

import { v4 as uuid } from 'uuid'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ToggleButton from '@mui/material/ToggleButton'
import Tooltip from '@mui/material/Tooltip'

import ContactTypeChoice from './contactTypeChoice'

import { IContacts } from 'dto/pizzerias.dto'
import { HeaderTitle, Row, Wrapper } from './Styles.elements'

interface IProps {
  state: IContacts[] | null | undefined
  setState: (contact: any) => void
  deleteContactById: (id: number) => Promise<void>
}

const AddContact: FC<IProps> = ({ state, setState, deleteContactById }) => {
  const unique_id = uuid()

  const handleAddContactForm = (): void => {
    const small_id = unique_id.slice(0, 8)
    setState({
      uuid: small_id,
      id: null,
      pizzeria_id: null,
      contact_type_id: null,
      contact: null,
    })
  }
	if(!state) return <></>
  return (
    <Wrapper>
      <Row>
        <HeaderTitle>Контакты</HeaderTitle>
        <Tooltip title='Добавить контакт' placement='top'>
          <ToggleButton
            onClick={handleAddContactForm}
            sx={{ height: '20px', width: '20px' }}
            value='left'
            aria-label='left aligned'
          >
            <AddCircleOutlineOutlinedIcon />
          </ToggleButton>
        </Tooltip>
      </Row>
      {state?.map((el, index) => (
        <ContactTypeChoice
          key={index}
          state={el}
          setState={setState}
          deleteContactById={deleteContactById}
        />
      ))}
    </Wrapper>
  )
}

export default AddContact
