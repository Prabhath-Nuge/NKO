import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function EmployeeSalaryHistory() {
    const { state } = useLocation();
    const employee = state?.employee;

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`/salary/history/${employee._id}`);
                if (response.data.error) {
                    return setError(response.data.message);
                }
                setHistory(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch salary history.');
                setLoading(false);
            }
        };

        fetchHistory();
    }, [employee._id]);

    if (loading) return <div className="text-white text-center">Loading history...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto mt-10 p-6 bg-gray-900 text-white rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Salary History for {employee?.name}</h2>
            <p className="mb-1"><strong>Type:</strong> {employee?.type}</p>
            <p className="mb-1"><strong>Base Salary:</strong> Rs {employee?.basicSalary?.toLocaleString()}</p>
            <p className="mb-4"><strong>Current Salary:</strong> Rs {employee?.currentSalary?.toLocaleString()}</p>

            <h3 className="text-xl font-semibold mb-2">History</h3>
            <table className="w-full text-left border border-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="p-2 border-b border-gray-700">Changed Amount</th>
                        <th className="p-2 border-b border-gray-700">Current Amount</th>
                        <th className="p-2 border-b border-gray-700">Effective Date</th>
                        <th className="p-2 border-b border-gray-700">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry) => (
                        <tr key={entry._id} className="hover:bg-gray-800">
                            <td className="p-2 border-b border-gray-700">Rs {entry.changedAmount}</td>
                            <td className="p-2 border-b border-gray-700">Rs {entry.currentAmount}</td>
                            <td className="p-2 border-b border-gray-700">{new Date(entry.effectiveDate).toLocaleString()}</td>
                            <td className="p-2 border-b border-gray-700">{entry.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeSalaryHistory;
