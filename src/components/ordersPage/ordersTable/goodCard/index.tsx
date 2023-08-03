// import { API_URL } from 'dataStore/api'
// import { IProduct } from 'dto/products.dto'
import { FC } from 'react'
import Chip from '../../../chip'
import { ColorTypes } from '../../../chip/Styles.elements'
// import LoadableImage from '../../../loadableImage'
import {
  CardImage,
  Description,
  IngredientWrapper,
  PriceWrapper,
  Row,
  Title,
  Wrapper,
} from './Styles.elements'

interface IProps {
  good?: IProduct
}

const GoodCart: FC<IProps> = ({ good }) => {
  if (!good) {
    return <></>
  }
  return (
    <Wrapper>
      <Row>
        <CardImage>
          <div
            style={{
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
            }}
          >
            {/* {good?.img_small && (
              <LoadableImage
                alt={good?.title}
                src={good?.img_small ? `${API_URL}/${good?.img_small}` : ''}
              />
            )} */}
          </div>
        </CardImage>
        <Description>
          <Title>{good?.title}</Title>
          {good?.deletedIngredients && (
            <>
              Убрать из заказа:
              <IngredientWrapper>
                {good?.deletedIngredients?.map(el => (
                  <Chip key={el} color={ColorTypes.red}>
                    {el}
                  </Chip>
                ))}
              </IngredientWrapper>
            </>
          )}
          {good?.addIngredients && (
            <>
              Добавить в заказ:
              <IngredientWrapper>
                {good?.addIngredients?.map(el => (
                  <Chip key={el.id} color={ColorTypes.green}>
                    {el.title}
                  </Chip>
                ))}
              </IngredientWrapper>
            </>
          )}
        </Description>
        <PriceWrapper>
          <div>
            Размер:{' '}
            {good?.product_type ? <>{good.size}</> : <>{good.single_size}</>}
          </div>
          <div>
            Цена:{' '}
            {good?.product_type ? <>{good.price}</> : <>{good.single_price}</>}
          </div>
          <div>Кол-во: {good?.qty}</div>
        </PriceWrapper>
      </Row>
    </Wrapper>
  )
}

export default GoodCart
