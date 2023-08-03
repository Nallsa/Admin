import TextField from '@mui/material/TextField'

interface IProps {
  promoFilter: string
  setPromoFilter: Function
}
const PromoSearch: React.FC<IProps> = ({ promoFilter, setPromoFilter }) => {
  const filterHandler = (e: any) => {
    setPromoFilter(e.target.value)
  }
  return (
    <div>
      <TextField
        size='small'
        label='Поиск акции'
        variant='outlined'
        value={promoFilter}
        onChange={filterHandler}
      />
    </div>
  )
}

export default PromoSearch
