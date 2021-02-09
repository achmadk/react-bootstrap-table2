import createContext from './context';
import withRowLevelCellEdit from './row-consumer';
import createEditingCell from './editing-cell-consumer';
import {
  EDITTYPE,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK
} from './const';

export default (options = {}) => ({
  createContext,
  createEditingCell,
  withRowLevelCellEdit,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK,
  options
});

export const Type = EDITTYPE;
