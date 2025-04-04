export type Position = 'Developer' | 'Designer' | 'Project Manager' | 'QA Engineer' | 'System Administrator';
export type Department = 'Development' | 'Design' | 'Project Management' | 'QA' | 'IT Operations';

export interface Employee {
    id: number;
    name: string;
    email: string;
    age: number;
    position: Position;
    department: Department;
}

export type EmployeeInput = Omit<Employee, 'id'>;
export type EmployeeFilter = Partial<Omit<Employee, 'id'>>;
