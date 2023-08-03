import { IPizzeria } from 'dto/pizzerias.dto'
import { FC } from 'react'
import { Wrapper, Row, HeaderTitle } from './Styles.elements'

interface IProps {
	state: IPizzeria
	handleCancel: Function
}

const DeliveryAreaSettings: FC<IProps> = ({state, handleCancel}) => {
	return (
		<Wrapper>
			<Row>
					<HeaderTitle>
						Настройка зон доставки
					</HeaderTitle>
				</Row>
		</Wrapper>
	)
}

export default DeliveryAreaSettings