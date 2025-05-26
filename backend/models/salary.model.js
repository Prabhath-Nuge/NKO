import mongoose from "mongoose";

const SalaryHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    currentAmount: {
        type: Number,
        required: true
    },
    changedAmount: {
        type: Number,
        required: true
    },
    effectiveDate: {
        type: Date,
        default: Date.now
    },
    reason: {
        type: String
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const SalaryHistory = mongoose.model("SalaryHistory", SalaryHistorySchema);

export default SalaryHistory;
