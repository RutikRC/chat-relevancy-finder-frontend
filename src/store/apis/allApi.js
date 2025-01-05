import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { url } from "../../components/common/api";
const url = "http://localhost:5000";

const allApi = createApi({
    reducerPath: "allapis",
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    refetchOnMountOrArgChange: true,
    tagTypes: ["Relevancy-score"],
    endpoints(build) {
        return {
            fetchRelevancyScores: build.query({
                query: () => ({
                    url: "/api/category-master",
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
                            ...result?.map(({ id }) => ({ type: "Relevancy-score", id })),
                            "Relevancy-score",
                        ]
                        : ["Relevancy-score"],
            }),
            createQuestion: build.mutation({
                query: (createCategoryData) => {
                    return {
                        url: `/api/category-master/`,
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
                    { type: "Relevancy-score", id: arg.id },
                ],
            }),
        };
    },
});

export const {
    useFetchRelevancyScoresQuery,
    useCreateQuestionMutation,
} = allApi;
export { allApi };
