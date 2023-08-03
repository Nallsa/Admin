import { List as MList } from '@mui/material'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import { settings } from '../../../ThemeStyle'
import Block from '../../block'

interface IProps {
  selectedPage: string
  setSelectedPage: any
  pages: { title: string; page: string }[]
}

const PagesList: React.FC<IProps> = ({
  selectedPage,
  setSelectedPage,
  pages,
}) => {
  const handleListItemClick = (value: string) => {
    setSelectedPage(value)
  }
  return (
    <Block>
      <Box sx={{ width: '100%', maxWidth: 360, bgColor: 'background.paper' }}>
        <Typography variant='h6' gutterBottom component='div'>
          Страницы
        </Typography>
        <MList>
          {pages?.map((item, index) => (
            <ListItemButton
              key={`${index}_${item.title}`}
              selected={selectedPage === item.page}
              onClick={() => handleListItemClick(item.page)}
              sx={{
                borderRadius: `${settings.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                py: 1,
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </MList>
      </Box>
    </Block>
  )
}

export default PagesList
