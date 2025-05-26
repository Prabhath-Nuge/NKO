import SalaryHistory from "../models/salary.model.js";
import User from "../models/user.model.js";

export const getCurrentSalary = async (req, res) => {

    try {
        const user = await req.session.user;
        if (!user) {
            return res.status(401).json({ error: true, message: 'Session not found' });
        }
        if (user.type !== 'admin') {
            return res.status(403).json({ error: true, message: 'Access denied' });
        }
        const users = await User.find({ type: { $in: ['emp', 'manager'] } }).select('name type basicSalary');

        const enrichedUsers = await Promise.all(users.map(async (user) => {
            const latestSalary = await SalaryHistory.findOne({ user: user._id })
                .sort({ effectiveDate: -1 }) // Get the most recent
                .select('currentAmount effectiveDate');

            return {
                _id: user._id,
                basicSalary: user.basicSalary,
                name: user.name,
                type: user.type,
                currentSalary: latestSalary?.currentAmount || null,
                salaryEffectiveDate: latestSalary?.effectiveDate || null
            };
        }));

        return res.status(200).json({ error: false, data: enrichedUsers });

    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
}

export const updateSalary = async (req, res) => {
    try {
        const user = await req.session.user;
        if (!user) {
            return res.status(401).json({ error: true, message: 'Session not found' });
        }
        if (user.type !== 'admin') {
            return res.status(403).json({ error: true, message: 'Access denied' });
        }

        const { userId, changedAmount, reason, effectiveDate } = req.body;

        if (!userId || !changedAmount || !reason || !effectiveDate) {
            return res.status(400).json({ error: true, message: 'All fields are required' });
        }
        console.log(userId, changedAmount, reason, effectiveDate);

        const lastSalary = await SalaryHistory.findOne({ user: userId })
            .sort({ effectiveDate: -1 });
        const currentAmount = lastSalary?.currentAmount || 0;
        const newAmount = currentAmount + Number(changedAmount);

        const updatedSalary = await SalaryHistory.create({
            user: userId,
            currentAmount: newAmount,
            changedAmount,
            effectiveDate: new Date(effectiveDate),
            reason,
            recordedBy: user._id
        });

        return res.status(200).json({ error: false, data: updatedSalary });

    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
}

export const getSalaryHistoryById = async (req, res) => {
    try {
        const user = await req.session.user;
        if (!user) {
            return res.status(401).json({ error: true, message: 'Session not found' });
        }
        if (user.type !== 'admin') {
            return res.status(403).json({ error: true, message: 'Access denied' });
        }

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: true, message: 'User ID is required' });
        }

        const history = await SalaryHistory.find({ user: id });

        return res.status(200).json({ error: false, data: history });

    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
}