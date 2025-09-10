import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Income } from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";

const getDashboardSummary=asyncHandler(async(req,res)=>{

    const {month,year}=req.query;

    let filter = { user: req.user._id };

    if(month && year){
        const start =new Date(`${year}-${month}-01`);
        const end=new Date(start)
        end.setMonth(end.getMonth()+1);
        filter.date={$gte:start, $lt:end};
    }

    const totalIncome=await Income.aggregate([
        {
            $match:filter

        },
        {
            $group:{
                _id:null,
                total:{$sum:"$amount"}
            }
        }
    ])
    const totalExpense=await Expense.aggregate([
        {
            $match:filter
        },
        {
            $group:{
                _id:null,
                total:{$sum:"$amount"}
            }
        }
    ])

    const incomeSum=totalIncome[0]?.total || 0;
    const expenseSum=totalExpense[0]?.total || 0;

    const savings=incomeSum-expenseSum;

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            totalIncome:incomeSum,
            totalExpense:expenseSum,
            savings,
            month:month || "all",
            year : year || "all",
        },
    "Dashboard summary fetched successfully"
    )
    )

})
export {getDashboardSummary}