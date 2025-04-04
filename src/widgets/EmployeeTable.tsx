'use client';

import { useState } from 'react';
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from '@/entities/employee/api/employeeApi';
import { EmployeeCard } from '@/entities/employee/ui/EmployeeCard';
import { EmployeeFilter } from '@/features/employeeFilter/ui/EmployeeFilter';
import { EmployeeFilter as EmployeeFilterType, Employee } from '@/shared/types/employee';

import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

type Props = {
    onEdit: (employee: Employee) => void;
};

export const EmployeeTable = ({ onEdit }: Props) => {
    const [filters, setFilters] = useState<EmployeeFilterType>({});
    const { data: employees = [] } = useGetEmployeesQuery(filters);
    const [deleteEmployee] = useDeleteEmployeeMutation();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleDelete = async (id: number) => {
        if (confirm('Вы уверены, что хотите удалить сотрудника?')) {
            try {
                await deleteEmployee(id).unwrap();
                toast.success('Сотрудник успешно удалён');
            } catch {
                toast.error('Ошибка при удалении сотрудника');
            }
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`Удалить выбранных сотрудников (${selectedIds.length})?`)) return;

        try {
            await Promise.all(selectedIds.map((id) => deleteEmployee(id).unwrap()));
            toast.success(`Удалено ${selectedIds.length} сотрудника(ов)`);
            setSelectedIds([]);
        } catch {
            toast.error('Ошибка при массовом удалении');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-2"
                >
                    {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                </button>
                {showFilters && <EmployeeFilter onFilter={setFilters} />}
            </div>

            {selectedIds.length > 0 && (
                <button
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    <Trash2 size={16} /> Удалить выбранных ({selectedIds.length})
                </button>
            )}

            <div className="space-y-3">
                {employees
                    .filter((emp): emp is Employee & { id: number } => typeof emp.id === 'number')
                    .map((emp) => (
                        <EmployeeCard
                            key={emp.id}
                            employee={emp}
                            onEdit={() => onEdit(emp)}
                            onDelete={() => handleDelete(emp.id)}
                            isSelected={selectedIds.includes(emp.id)}
                            onToggle={() => toggleSelect(emp.id)}
                        />
                ))}
            </div>
        </div>
    );
};
