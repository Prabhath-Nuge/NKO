import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

function SalaryEditSalary() {
    const { state } = useLocation();
    const employee = state?.employee;
    const navigate = useNavigate();

    const [changedAmount, setChangedAmount] = useState('');
    const [reason, setReason] = useState('');
    const [effectiveDate, setEffectiveDate] = useState(() => {
        const now = new Date();
        const tzOffset = now.getTimezoneOffset() * 60000; // offset in ms
        return new Date(now - tzOffset).toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
    });
    const [submitting, setSubmitting] = useState(false);


    if (!employee) {
        return <div className="text-red-500 text-center mt-10">No employee data received.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post('/salary/updatesalary', {
                userId: employee._id,
                changedAmount,
                reason,
                effectiveDate,
            });

            const data = response.data;

            if (data.error) {
                toast.error(data.message || 'Failed to update salary.');
            } else {
                toast.success('Salary updated successfully.');
                navigate(-1, { replace: true });
            }
        } catch (err) {
            toast.error('An error occurred while updating salary.');
        } finally {
            setSubmitting(false);
        }
    }


        return (
            <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-2xl shadow max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Edit Salary for {employee.name}</h2>
                <p><strong>Type:</strong> {employee.type}</p>
                <p><strong>Base Salary:</strong> ${employee.basicSalary?.toLocaleString()}</p>
                <p><strong>Current Salary:</strong> ${employee.currentSalary?.toLocaleString()}</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Changed Amount ($)</label>
                        <input
                            type="number"
                            value={changedAmount}
                            onChange={(e) => setChangedAmount(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Reason</label>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Effective Date</label>
                        <input
                            type="datetime-local"
                            value={effectiveDate}
                            onChange={(e) => setEffectiveDate(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                            required
                            disabled
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                        {submitting ? 'Updating...' : 'Update Salary'}
                    </button>

                </form>
            </div>
        );
    }

    export default SalaryEditSalary;
