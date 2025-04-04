'use client';

import { useForm } from 'react-hook-form';
import { useCreateEmployeeMutation } from '@/entities/employee/api/employeeApi';
import { EmployeeInput } from '@/shared/types/employee';

export const EmployeeCreateForm = () => {
    const { register, handleSubmit, reset } = useForm<EmployeeInput>();
    const [createEmployee] = useCreateEmployeeMutation();

    const onSubmit = async (data: EmployeeInput) => {
        await createEmployee(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 p-4 border rounded">
            <input {...register('name')} placeholder="Имя" className="p-2 border rounded" required />
            <input {...register('email')} placeholder="Email" className="p-2 border rounded" required />
            <input type="number" {...register('age')} placeholder="Возраст" className="p-2 border rounded" required />
            <input {...register('position')} placeholder="Должность" className="p-2 border rounded" required />
            <input {...register('department')} placeholder="Отдел" className="p-2 border rounded" required />
            <button type="submit" className="p-2 bg-green-500 text-white rounded col-span-2">Добавить сотрудника</button>
        </form>
    );
};