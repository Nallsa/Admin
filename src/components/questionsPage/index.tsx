import React, { Ref } from 'react';

import { IQuestion } from '../../dto/questions.dto';

import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import moment from 'moment';

import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Chip from '../../components/chip';
import { ColorTypes } from '../../components/chip/Styles.elements';
import { Wrapper } from './Styles.element';
import QuestionDetails from './details/QuestionDetails';

import { IUser } from '../../dto/users.dto';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const QuestionsPage: React.FC = () => {
  const questions: any = [
    {
      id: 1,
      name: 'Азиз',
      phone: '+7996328064',
      subject: 'Текст',
      pizzeria_id: 2,
      create_at: '2022-11-24T08:49:35.457Z',
      update_at: '2022-11-24T08:49:35.457Z',
      is_viewed: true,
      viewerId: 2,
      is_agree: true,
    },
  ];

  const pizzerias: any[] = [
    {
      id: 3,
      name: null,
      map: '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af7d1bab7fc50aec993f5b8c6c78d1838774910de15622a3b1904c4a7f03afe63&amp;source=constructor" width="100%" height="500" frameborder="0"></iframe>',
      addressId: 7,
      delivery_description: null,
      orderMail: '',
      adminsIds: [],
      ownerId: 1,
      min_order_price: 1000,
      delivery_price: null,
      create_at: '2022-09-22T13:27:35.449Z',
      update_at: '2022-12-01T22:21:45.605Z',
      is_active: true,
      payment_method: 'sber',
      api_login: 'P230209262147-api',
      secret_key: null,
      accounting_secret_key: null,
      accounting_key_affiliate: null,
      api_password: 'REMkCAKAGbqZEY2',
      yandex_metrica: null,
      yandex_counter: null,
      time_open: '10:00',
      time_close: '22:00',
      address: {
        id: 7,
        cityId: '7373058',
        streetId: '30909608',
        street: 'Кореновская улица',
        house: '10',
        housing: null,
        apartment: null,
        entrance: null,
        floor: null,
        intercom: null,
        user_id: null,
        pizzeria_id: null,
        create_at: '2022-09-22T13:27:35.449Z',
        description: null,
        update_at: '2022-09-22T13:27:35.449Z',
        is_active: true,
        city: 'Краснодар',
        cityData: {
          id: '7373058',
          place: 'city',
          city: 'Краснодар',
          official_status: 'город',
          addr_region: 'Краснодарский край',
          addr_district: null,
          region_id: '108082',
          district_id: '269701',
          lat: 45.06109899907286,
          lon: 39.009510639144246,
        },
      },
      contacts: [
        {
          id: 2,
          pizzeria_id: 3,
          contact_type_id: 1,
          contact: '+79649337933',
          create_at: '2022-09-22T13:27:35.449Z',
          update_at: '2022-12-07T22:26:11.438Z',
          contact_type: 'Тел.',
        },
      ],
      legalData: null,
      delivery_area: [
        {
          id: 1,
          pizzeria_id: 3,
          area: null,
          min_order_price: null,
          delivery_price: 0,
          delivery_description: null,
          create_at: '2022-12-05T21:16:29.995Z',
          update_at: '2022-12-05T21:16:29.995Z',
          is_active: true,
          paid_zone: false,
          cityId: 7373058,
        },
      ],
    },
  ];
  const users: IUser[] = [
    {
      id: 5,
      first_name: 'тест',
      last_name: 'тест',
      phone: '+79000000000',
      email: 'ttt@mail.ru',
      is_active: true,
      parentId: null,
      is_legal: false,
      is_admin: true,
      legalData: null,
    },
  ];

  const userId = 1;

  const [selected, setSelected] = React.useState<IQuestion | null>(null);

  const handleClose = (): void => {
    setSelected(null);
  };

  const handleOpen = (order: IQuestion): void => {
    setSelected(order);
  };

  const getPizzeria = (id: number) => {
    const pizzeriaAddress = pizzerias.filter(el => el.id === id);
    if (pizzeriaAddress[0] === undefined) return '';
    return `${pizzeriaAddress[0]?.address?.city}, ${pizzeriaAddress[0]?.address?.street}`;
  };

  const getFilteredQuestions = () => {
    let filteredQuestions: IQuestion[] = [];

    questions.forEach((question: IQuestion) => {
      const pizzeriaId = pizzerias.filter(
        (el: { id: any }) => el.id === question.pizzeria_id
      )[0];
      if (userId && pizzeriaId?.adminsIds!.includes(userId)) {
        filteredQuestions.push(question);
      }
    });

    if (filteredQuestions.length > 0) return filteredQuestions;
    return questions;
  };

  const columns = React.useMemo<MRT_ColumnDef<IQuestion>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '№',
        size: 0,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'pizzeria_id',
        header: 'Отделение',
        size: 180,
        enableColumnFilter: false,
        accessorFn: (row: { pizzeria_id: number }) =>
          getPizzeria(row.pizzeria_id),
      },
      {
        accessorKey: 'name',
        header: 'Имя',
        size: 0,
      },
      {
        accessorKey: 'is_viewed',
        header: 'Статус',
        size: 0,
        enableColumnFilter: false,
        accessorFn: (row: { is_viewed: any }) => (
          <Chip
            style={{ width: 'fit-content' }}
            color={ColorTypes[row.is_viewed ? 'light_blue' : 'red']}
          >
            {row.is_viewed ? 'Прочитано' : 'Не прочитано'}
          </Chip>
        ),
      },
      {
        accessorKey: 'viewerId',
        header: 'Просмотрел',
        size: 0,
        accessorFn: (row: { viewerId: any }) => (
          <>
            {users?.filter((user: { id: any }) => user.id === row.viewerId)[0]
              ?.first_name ?? ''}{' '}
            {users?.filter((user: { id: any }) => user.id === row.viewerId)[0]
              ?.last_name ?? ''}
          </>
        ),
      },
      {
        accessorKey: 'is_agree',
        header: 'Согласие',
        size: 0,
        enableColumnFilter: false,
        accessorFn: (row: { is_agree: any }) =>
          row?.is_agree ? 'Согласен' : 'Не согласен',
      },
      {
        accessorKey: 'create_at',
        header: 'Создан',
        size: 0,
        accessorFn: (row: { create_at: moment.MomentInput }) => (
          <>
            {moment(row.create_at).format('L')}{' '}
            {moment(row.create_at).format('LT')}
          </>
        ),
      },
      {
        accessorKey: 'update_at',
        header: 'Отредактирован',
        size: 0,
        accessorFn: (row: { create_at: moment.MomentInput }) => (
          <>
            {moment(row.create_at).format('L')}{' '}
            {moment(row.create_at).format('LT')}
          </>
        ),
      },
    ],
    [pizzerias]
  );

  return (
    <Wrapper>
      <MaterialReactTable
        muiTablePaperProps={{
          elevation: 0,
          sx: { width: '100%', overflowY: 'auto' },
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: [9, 30, 50, 100],
        }}
        initialState={{
          pagination: { pageSize: 9, pageIndex: 0 },
          showColumnFilters: true,
        }}
        state={{ showSkeletons: questions.length > 0 ? false : true }}
        columns={columns}
        data={getFilteredQuestions() ?? []}
        memoMode={'rows'}
        muiTableBodyRowProps={({ row }: any) => ({
          onClick: () => {
            handleOpen(row.original);
          },
        })}
      />

      <Dialog
        disableEscapeKeyDown
        open={Boolean(selected)}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              X
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Данные заказа
            </Typography>
            <Button autoFocus color='inherit' onClick={handleClose}>
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <QuestionDetails state={selected} />
      </Dialog>
    </Wrapper>
  );
};

export default QuestionsPage;
