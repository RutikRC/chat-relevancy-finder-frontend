import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { url } from "../../components/common/api";
const url = "http://localhost:5000";

const allApi = createApi({
    reducerPath: "allapis",
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    refetchOnMountOrArgChange: true,
    tagTypes: ["Room", "Chat"],
    endpoints(build) {
        return {
            fetchRooms: build.query({
                query: () => ({
                    url: "/api/tutor",
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        "Content-Type": "application/json",
                    },
                }),
                providesTags: (result = [], error, arg) =>
                    result?.length
                        ? [
                            ...result?.map(({ id }) => ({ type: "Room", id })),
                            "Room",
                        ]
                        : ["Room"],
            }),
            createRoom: build.mutation({
                query: (createCategoryData) => {
                    return {
                        url: `/api/tutor/`,
                        method: "POST",
                        body: createCategoryData,
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                            "Content-Type": "application/json",
                        },
                    };
                },
                invalidatesTags: (result, error, arg) => [
                    { type: "Room", id: arg.id },
                ],
            }),
            createChat: build.mutation({
                query: (createCategoryData) => {
                    return {
                        url: `/api/chat/`,
                        method: "POST",
                        body: createCategoryData,
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                            "Content-Type": "application/json",
                        },
                    };
                },
                invalidatesTags: (result, error, arg) => [
                    { type: "Chat", id: arg.id },
                ],
            }),
            getRoomDetails: build.query({
                query: ({ id }) => {
                  return {
                    url: `/api/chat/${id}`,
                    method: "GET",
                  };
                },
                providesTags: (result = [], error, arg) =>
                  result
                    ? [{ type: "Chat", id: result.id }, "Chat"]
                    : ["Chat"],
              }),
        };
    },
});

export const {
    useFetchRoomsQuery,
    useCreateRoomMutation,
    useGetRoomDetailsQuery,
    useCreateChatMutation,
} = allApi;
export { allApi };
