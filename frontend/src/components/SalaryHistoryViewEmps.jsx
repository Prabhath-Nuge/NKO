import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SalaryHistoryViewEmps() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/salary/getsalary');
                if (response.data.error) {
                    return setError(response.data.message);
                }
                setEmployees(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch employee data.');
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleRowClick = (employee) => {
        navigate('history', { state: { employee } });
    };

    if (loading) return <div className="text-white text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto mt-8 p-4 bg-gray-900 rounded shadow">
            <h2 className="text-white text-2xl font-bold mb-4">Employee Current Salaries</h2>
            <table className="w-full text-white text-left border border-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="p-2 border-b border-gray-700">Name</th>
                        <th className="p-2 border-b border-gray-700">Type</th>
                        <th className="p-2 border-b border-gray-700">Base Salary</th>
                        <th className="p-2 border-b border-gray-700">Current Salary</th>
                        <th className="p-2 border-b border-gray-700">Effective Date</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr
                            key={emp._id}
                            className="hover:bg-blue-800  cursor-pointer"
                            onClick={() => handleRowClick(emp)}
                        >
                            <td className="p-2 border-b border-gray-700">{emp.name}</td>
                            <td className="p-2 border-b border-gray-700 capitalize">{emp.type}</td>
                            <td className="p-2 border-b border-gray-700">
                                Rs {emp.basicSalary?.toLocaleString() || 'N/A'}
                            </td>
                            <td className="p-2 border-b border-gray-700">
                                Rs {emp.currentSalary?.toLocaleString() || 'N/A'}
                            </td>
                            <td className="p-2 border-b border-gray-700">
                                {emp.salaryEffectiveDate
                                    ? new Date(emp.salaryEffectiveDate).toLocaleDateString()
                                    : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalaryHistoryViewEmps;
