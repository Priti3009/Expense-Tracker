import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Income } from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";

//create expense
const createExpense=asyncHandler(async(req,res)=>{
    const { title,category,date,amount}=req.body;
    if(!title || !amount){
        throw new ApiError(400,"All fields are required")
    }

    const totalIncome=await Income.aggregate([
        {
            $match:{user:req.user._id} //stage-1
        },
        {
            $group:{_id:null,total:{ $sum :"$amount"}}   //stage-2 (group all and find sum )
        }
    ])

    const totalExpense=await Expense.aggregate([
        {
            $match:{user:req.user._id}
        },{
            $group:{_id:null , total:{$sum:"$amount"}}
        }
    ])

    const incomeSum=totalIncome[0]?.total || 0
    const expenseSum=totalExpense[0]?.total || 0

    if((expenseSum +amount)>incomeSum){
        throw new ApiError(400,"Expense exceeds total available income")
    }
    const expense=await Expense.create({        
        title,
        amount,
        category,
        date,
        user:req.user._id,
    }
    )

    if (!expense) {
    throw new ApiError(
      500,
      "Something went wrong while creating expense. Please try again"
    );
  }

    return res
    .status(200)
    .json(new ApiResponse(200,expense,"Expense created successfully"))
})

const getExpense=asyncHandler(async(req,res)=>{
    const {month,year}=req.query;  //read from query string(eg- URL :/api/v1/expenses?month=09&year=2025 )

    let filter={user:req.user._id};

    if(month && year){    //only apply when both are provided 

        const start=new Date(`${year}-${month}-01`);   //build js date object
        const end=new Date(start);
        end.setMonth(end.getMonth()+1);     //increase the start date by 1 to get the end date
        filter.date={$gte:start , $lt:end};   //Adds the date range to the filter
    }

    const expenses=await Expense.find(filter).sort({date:-1})

     return res
    .status(200)
    .json(new ApiResponse(200, expenses, "Expenses fetched successfully"));


})

const updateExpense=asyncHandler(async(req,res)=>{
    const expense=await Expense.findById(req.params.id);
     if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  if (expense.user.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Not authorized to update this expense");
  }

  const { title, amount, category, date } = req.body;

  expense.title = title || expense.title;
  expense.amount = amount || expense.amount;
  expense.category = category || expense.category;
  expense.date = date || expense.date;

   const updatedExpense = await expense.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedExpense, "Expense updated successfully"));
})

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  if (expense.user.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Not authorized to delete this expense");
  }

  await expense.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Expense deleted successfully"));
});

export {
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense
}