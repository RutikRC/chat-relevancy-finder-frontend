import { configureStore } from "@reduxjs/toolkit";
import { allApi } from "./apis/allApi";

const store = configureStore({
  reducer: {
    // user: userReducer,
    // remaining: remainingReducer,
    [allApi.reducerPath]: allApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(allApi.middleware);
  },
});

export default store;

export {
  useFetchRoomsQuery,
  useCreateRoomMutation,
  useGetRoomDetailsQuery
} from "./apis/allApi";