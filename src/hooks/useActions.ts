import Actions from '../redux/actions';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppDispatch, RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(Actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
