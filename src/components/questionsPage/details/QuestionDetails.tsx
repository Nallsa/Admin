import React from 'react';
import { IQuestion } from '../../../dto/questions.dto';
import moment from 'moment';
import { QuestionWrapper, QuestionInfo, Title } from './Styles.element';
import Chip from '../../../components/chip';
import { ColorTypes } from '../../../components/chip/Styles.elements';
import { IUser } from '../../../dto/users.dto';

interface IQuestionDetailstProps {
  state?: IQuestion | null;
}

const QuestionDetails: React.FC<IQuestionDetailstProps> = ({ state }) => {
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

  const viewerUser = users?.filter(user => user.id === state?.viewerId)[0];

  return (
    <QuestionWrapper>
      <QuestionInfo>
        <Title>Имя</Title> {state?.name}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Номер телефона</Title> {state?.phone}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Тема сообщения</Title> {state?.subject}
      </QuestionInfo>
      <QuestionInfo>
        <Title>id пиццерии</Title> {state?.pizzeria_id}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Прочитано</Title>{' '}
        <Chip
          style={{ width: 'fit-content' }}
          color={ColorTypes[state?.is_viewed ? 'light_blue' : 'red']}
        >
          {state?.is_viewed ? 'Прочитано' : 'Не прочитано'}
        </Chip>
      </QuestionInfo>
      <QuestionInfo>
        <Title>Согласие на обработку персональных данных</Title>
        {state?.is_agree ? 'Согласен' : 'Не согласен'}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Посмотрел сообщение</Title>
        {viewerUser?.first_name} {viewerUser?.last_name}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Дата создания</Title>
        {state?.create_at && (
          <>
            {moment(state?.create_at).format('L')} -{' '}
            {moment(state?.create_at).format('LT')}
          </>
        )}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Дата редактирования</Title>
        {state?.update_at && (
          <>
            {moment(state?.update_at).format('L')} -{' '}
            {moment(state?.update_at).format('LT')}
          </>
        )}
      </QuestionInfo>
    </QuestionWrapper>
  );
};

export default QuestionDetails;
