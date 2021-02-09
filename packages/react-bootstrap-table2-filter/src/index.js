import TextFilter from './components/text';
import SelectFilter from './components/select';
import MultiSelectFilter from './components/multiselect';
import NumberFilter from './components/number';
import DateFilter from './components/date';
import createContext from './context';
import * as Comparison from './comparison';
import { FILTER_TYPE } from './const';

export default (options = {}) => ({
  createContext,
  options
});

export const FILTER_TYPES = FILTER_TYPE;

export const Comparator = Comparison;

export const textFilter = (props = {}, Filter = TextFilter) => ({
  Filter,
  props
});

export const selectFilter = (props = {}, Filter = SelectFilter) => ({
  Filter,
  props
});

export const multiSelectFilter = (props = {}, Filter = MultiSelectFilter) => ({
  Filter,
  props
});

export const numberFilter = (props = {}, Filter = NumberFilter) => ({
  Filter,
  props
});

export const dateFilter = (props = {}, Filter = DateFilter) => ({
  Filter,
  props
});

export const customFilter = (props = {}) => ({
  props
});
