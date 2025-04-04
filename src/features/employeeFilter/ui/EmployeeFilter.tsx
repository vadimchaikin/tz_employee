'use client';

import { useForm } from 'react-hook-form';
// @ts-ignore
import { EmployeeFilter } from '@/shared/types/employee';

type Props = {
    onFilter: (filter: EmployeeFilter) => void;
};

// @ts-ignore
export const EmployeeFilter = ({ onFilter }: Props) => {
    const { register, handleSubmit } = useForm<EmployeeFilter>();

    return (
        <form onSubmit={handleSubmit(onFilter)} className="grid grid-cols-3 gap-4">
            <input {...register('name')} placeholder="Имя" className="p-2 border rounded" />
            <input {...register('email')} placeholder="Email" className="p-2 border rounded" />
            <input type="number" {...register('age')} placeholder="Возраст" className="p-2 border rounded" />
            <input {...register('position')} placeholder="Должность" className="p-2 border rounded" />
            <input {...register('department')} placeholder="Отдел" className="p-2 border rounded" />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Фильтровать</button>
        </form>
    );
};