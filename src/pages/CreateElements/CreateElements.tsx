import { Box, Grid } from '@mui/material';

import ElementTypes from '../../components/createElement/elementTypes';
import { useActions, useAppSelector } from '../../hooks/useActions';

const CreateElement = () => {
  const {
    getAllMeasureUnits,
    createMeasureUnit,
    editMeasureUnitById,
    deleteMeasureUnitById,
    getAllStatuses,
    createStatuses,
    editStatusesById,
    deleteStatusesById,
    getAllPaymentStatus,
    createPaymentStatus,
    editPaymentStatusById,
    deletePaymentStatusById,
    getAllPayment,
    createPayment,
    editPaymentById,
    deletePaymentById,
    getAllDeliveryType,
    createDeliveryType,
    editDeliveryTypeById,
    deleteDeliveryTypeById,
  } = useActions();

  const { measureUnits, statuses, paymentStatus, payments, deliveryType } =
    useAppSelector(state => state.elementsReducer);

  return (
    <Box>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <ElementTypes
            createType={'Создание еденицы измерения'}
            listType={'Список единиц измерения'}
            editType={'Редактирование единицы измерения'}
            inputType={'Единица измерения'}
            state={measureUnits}
            getAllElemnt={getAllMeasureUnits}
            createElement={createMeasureUnit}
            editElement={editMeasureUnitById}
            deleteElement={deleteMeasureUnitById}
          />
        </Grid>
        <Grid item xs={4}>
          <ElementTypes
            createType={'Создание статуса заказа'}
            listType={'Список статусов заказа'}
            editType={'Редактирование статуса заказа'}
            inputType={'Статус заказа'}
            state={statuses}
            getAllElemnt={getAllStatuses}
            createElement={createStatuses}
            editElement={editStatusesById}
            deleteElement={deleteStatusesById}
          />
        </Grid>
        <Grid item xs={4}>
          <ElementTypes
            createType={'Создание статуса оплаты'}
            listType={'Список статусов оплаты'}
            editType={'Редактирование статуса оплаты'}
            inputType={'Статус оплаты'}
            state={paymentStatus}
            getAllElemnt={getAllPaymentStatus}
            createElement={createPaymentStatus}
            editElement={editPaymentStatusById}
            deleteElement={deletePaymentStatusById}
          />
        </Grid>
        <Grid item xs={4}>
          <ElementTypes
            createType={'Создание способа оплаты'}
            listType={'Список способов оплаты'}
            editType={'Редактирование способа оплаты'}
            inputType={'Способ оплаты'}
            state={payments}
            getAllElemnt={getAllPayment}
            createElement={createPayment}
            editElement={editPaymentById}
            deleteElement={deletePaymentById}
          />
        </Grid>
        <Grid item xs={4}>
          <ElementTypes
            createType={'Создание типа доставки'}
            listType={'Список типов доставки'}
            editType={'Редактирование типа доставки'}
            inputType={'Тип доставки'}
            state={deliveryType}
            getAllElemnt={getAllDeliveryType}
            createElement={createDeliveryType}
            editElement={editDeliveryTypeById}
            deleteElement={deleteDeliveryTypeById}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateElement;
