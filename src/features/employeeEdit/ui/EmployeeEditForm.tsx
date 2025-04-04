'use client';

import { useForm } from 'react-hook-form';
import { useUpdateEmployeeMutation } from '@/entities/employee/api/employeeApi';
import type { paths } from '@/shared/types/openapi';
import { toast } from 'react-toastify';
import { Employee } from '@/shared/types/employee';

type UpdateEmployeeBody = paths['/employees/{id}']['put']['requestBody']['content']['application/json'];

type Props = {
    employee: Employee;
    onCancel: () => void;
};

export const EmployeeEditForm = ({ employee, onCancel }: Props) => {
    const { register, handleSubmit } = useForm<UpdateEmployeeBody>({
        defaultValues: employee,
    });

    const [updateEmployee] = useUpdateEmployeeMutation();

    const onSubmit = async (data: UpdateEmployeeBody) => {
        try {
            await updateEmployee({ id: employee.id, data }).unwrap();
            toast.success('Сотрудник успешно обновлён');
            onCancel();
        } catch (error) {
            toast.error('Ошибка при обновлении сотрудника');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 p-4 border rounded bg-yellow-50">
            <input {...register('name')} placeholder="Имя" className="p-2 border rounded" required />
            <input {...register('email')} placeholder="Email" className="p-2 border rounded" required />
            <input type="number" {...register('age')} placeholder="Возраст" className="p-2 border rounded" required />
            <input {...register('position')} placeholder="Должность" className="p-2 border rounded" required />
            <input {...register('department')} placeholder="Отдел" className="p-2 border rounded" required />
            <div className="col-span-2 flex gap-4">
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Сохранить</button>
                <button type="button" onClick={onCancel} className="p-2 bg-gray-300 text-black rounded">Отмена</button>
            </div>
        </form>
    );
};
