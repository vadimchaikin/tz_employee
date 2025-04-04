import { baseApi } from '@/shared/api/baseApi';
import type { paths } from '@/shared/types/openapi';

type GetEmployeesResponse = paths['/employees']['get']['responses']['200']['content']['application/json'];
type GetEmployeeByIdResponse = paths['/employees/{id}']['get']['responses']['200']['content']['application/json'];
type CreateEmployeeBody = paths['/employees']['post']['requestBody']['content']['application/json'];
type UpdateEmployeeBody = paths['/employees/{id}']['put']['requestBody']['content']['application/json'];

export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query<GetEmployeesResponse, Partial<CreateEmployeeBody>>({
            query: (params) => ({
                url: '/employees',
                params,
            }),
            providesTags: ['Employee'],
        }),
        getEmployeeById: builder.query<GetEmployeeByIdResponse, number>({
            query: (id) => `/employees/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Employee', id }],
        }),
        createEmployee: builder.mutation<void, CreateEmployeeBody>({
            query: (body) => ({
                url: '/employees',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Employee'],
        }),
        updateEmployee: builder.mutation<void, { id: number; data: UpdateEmployeeBody }>({
            query: ({ id, data }) => ({
                url: `/employees/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        deleteEmployee: builder.mutation<void, number>({
            query: (id) => ({
                url: `/employees/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employee'],
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApi;
