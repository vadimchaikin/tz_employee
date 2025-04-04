'use client';

import { useState } from 'react';
import { EmployeeTable } from '@/widgets/EmployeeTable';
import { EmployeeCreateForm } from '@/features/employeeCreate/ui/EmployeeCreateForm';
import { EmployeeEditForm } from '@/features/employeeEdit/ui/EmployeeEditForm';
import { Employee } from '@/shared/types/employee';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    return (
        <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">Сотрудники компании</h1>
            {editingEmployee ? (
                <EmployeeEditForm employee={editingEmployee} onCancel={() => setEditingEmployee(null)} />
            ) : (
                <EmployeeCreateForm />
            )}
            <EmployeeTable onEdit={setEditingEmployee} />
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar pauseOnFocusLoss draggable pauseOnHover />
        </main>
    );
}
