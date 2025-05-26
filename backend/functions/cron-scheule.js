import cron from 'node-cron';
import User from '../models/user.model.js';
import SalaryHistory from '../models/salary.model.js';

export const startMonthlySalaryAddition = () => {
    cron.schedule('0 0 1 * *', async () => {
        console.log('Running monthly salary update...');

        try {
            const employees = await User.find({ type: { $in: ['emp', 'manager'] }, status: true });

            for (const emp of employees) {
                const lastEntry = await SalaryHistory.findOne({ user: emp._id }).sort({ effectiveDate: -1 });
                const currentAmount = lastEntry?.currentAmount || 0;
                const newAmount = currentAmount + (emp.basicSalary || 0);

                await SalaryHistory.create({
                    user: emp._id,
                    currentAmount: newAmount,
                    changedAmount: emp.basicSalary || 0,
                    effectiveDate: new Date(),
                    reason: 'Monthly salary credited',
                });
            }

            console.log('Monthly salary update completed.');
        } catch (err) {
            console.error('Error running monthly salary cron:', err);
        }
    });
};
