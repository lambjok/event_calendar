import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { bindActionCreators } from "redux";
import { allActionCreators } from "../store/reducers/action-creators";

export const useActions = () => {
  const dispatch: AppDispatch = useDispatch();
  return bindActionCreators(allActionCreators, dispatch);
}