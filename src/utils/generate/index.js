import data from './data.json';
import { addItem } from '../indexdb';

//add generated date to the indexedDB
export const addData = () => data.forEach((item) => addItem(item));
