import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import { Input, Label, Wrapper } from './Meta.elements';

import { ICategoryProducts, IProduct } from '../../../dto/products.dto';
import { IPromo } from '../../../dto/promo.dto';

interface IProp {
  setState: Function;
  state: IProduct | ICategoryProducts | IPromo;
}

const EditMeta: React.FC<IProp> = ({ state, setState }) => {
  interface IChangeProp {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: IChangeProp): void => {
    setState((prev: IProduct | ICategoryProducts) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <Input>
        <Tooltip title='Рекомендации по заполнению МЕТА-данных можно посмотреть в разделе документации'>
          <Label>Заголовок</Label>
        </Tooltip>
        <TextField
          name='metaTitle'
          id='metaTitle'
          value={state?.metaTitle || ''}
          size='small'
          fullWidth
          onChange={handleChange}
        />
      </Input>

      <Input>
        <Tooltip title='Рекомендации по заполнению МЕТА-данных можно посмотреть в разделе документации'>
          <Label>Описание</Label>
        </Tooltip>
        <TextField
          name='metaDescription'
          id='metaDescription'
          value={state?.metaDescription || ''}
          size='small'
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </Input>

      <Input>
        <Tooltip title='Рекомендации по заполнению МЕТА-данных можно посмотреть в разделе документации'>
          <Label>Ключевые слова</Label>
        </Tooltip>
        <TextField
          name='metaKeywords'
          id='metaKeywords'
          value={state?.metaKeywords || ''}
          size='small'
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </Input>

      <Input>
        <Tooltip title='Рекомендации по заполнению МЕТА-данных можно посмотреть в разделе документации'>
          <Label>Поисковый робот</Label>
        </Tooltip>
        <TextField
          name='metaRobots'
          id='metaRobots'
          value={state?.metaRobots || ''}
          size='small'
          fullWidth
          onChange={handleChange}
        />
      </Input>
    </Wrapper>
  );
};

export default EditMeta;
