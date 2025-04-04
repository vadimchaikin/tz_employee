import { Employee } from '@/shared/types/employee';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
    employee: Employee;
    onEdit?: () => void;
    onDelete?: () => void;
    isSelected?: boolean;
    onToggle?: () => void;
};

export const EmployeeCard = ({ employee, onEdit, onDelete }: Props) => {
    return (
        <div className="p-4 border rounded-xl shadow-sm bg-white flex justify-between items-center hover:shadow-md transition">
            <div>
                <div className="font-semibold text-lg text-gray-800">{employee.name} – {employee.position}</div>
                <div className="text-gray-600 text-sm">{employee.email} | {employee.age} лет | {employee.department}</div>
            </div>
            <div className="flex gap-3">
                {onEdit && (
                    <button onClick={onEdit} className="text-blue-600 hover:text-blue-800 transition" title="Редактировать">
                        <Pencil size={20} />
                    </button>
                )}
                {onDelete && (
                    <button onClick={onDelete} className="text-red-600 hover:text-red-800 transition" title="Удалить">
                        <Trash2 size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};
