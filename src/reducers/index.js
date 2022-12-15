import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import testReducer from './testReducer';
import uiReducer from './uiSlice';
import childrenReducer from './childrenReducer';
import serviceSlice from './serviceSlice';
import attendanceSlice from './attendanceSlice';
import searchSlice from './searchSlice';
import invoiceSlices from './invoiceSlices';
import authReducer from './authReducer';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tester: testReducer,
    ui: uiReducer,
    children: childrenReducer,
    service: serviceSlice,
    attendance: attendanceSlice,
    search: searchSlice,
    invoice: invoiceSlices,
    auth: authReducer
  },
});
