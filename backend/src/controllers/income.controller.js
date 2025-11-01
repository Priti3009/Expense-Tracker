import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Income } from "../models/income.model.js";

const createIncome=asyncHandler(async(req,res)=>{

    const {title,amount,category,date,description}=req.body;

    if(!title || !amount || !category){
        throw new ApiError(400,"All fields required")
    }

    const income=await Income.create({
        user:req.user._id,
        title,
        amount,
        date,
        description
   
    })

    if(!income){
        throw new ApiError(500,"Something went wrong while creating income.Please try again");  //check user is present or not
    }
    return res
    .status(201)
    .json(
        new ApiResponse(201, income, "Income created successfully")
    );

})

const getIncomes=asyncHandler(async(req,res)=>{

  {/* to get incomes of a particular month*/}
   const {month,year}=req.query;

    let filter = { user: req.user._id };

    if(month && year){
        const start =new Date(`${year}-${month}-01`);
        const end=new Date(start)
        end.setMonth(end.getMonth()+1);
        filter.date={$gte:start, $lt:end};
    }
    const incomes = await Income.find(filter).sort({ date: -1 });

    return res
    .status(200)
    .json(
        new ApiResponse(200,incomes,"Incomes fetched successfully")
    )
})

const getIncome = asyncHandler(async (req, res, next) => {
  const income = await Income.findById(req.params.id);

  if (!income) return next(new ApiError(404, "Income not found"));

  if (income.user.toString() !== req.user._id.toString()) {
    return next(new ApiError(401, "Not authorized to view this income"));
  }

  res.json(new ApiResponse(true, 200, income, "Income fetched successfully"));
});

const updateIncome=asyncHandler(async(req,res)=>{

    const income=await Income.findById(req.params.id)

    if (!income) {
        throw new ApiError(404,"Income not found")
    }

    if (income.user.toString() !== req.user._id.toString()) {
        throw new ApiError(404,"Not authorized to update this income")
    }

const { title, amount, category, date, description } = req.body;

  income.title = title || income.title;
  income.amount = amount || income.amount;
  income.category = category || income.category;
  income.date = date || income.date;
  income.description = description || income.description;

  const updatedIncome=await income.save();

  return res
  .status(200)
  .json(
    new ApiResponse(200,updatedIncome,"Income updated successfully")
  )
  
})

const deleteIncome = asyncHandler(async (req, res, next) => {

  const income = await Income.findById(req.params.id);

  if (!income) {
        throw new ApiError(404,"Income not found")
    }
 if (income.user.toString() !== req.user._id.toString()) {
        throw new ApiError(404,"Not authorized to update this income")
    }

await income.deleteOne();

return res
  .status(200)
  .json(
    new ApiResponse(200,null,"Income deleted successfully")
  )

})

export { 
    createIncome,
    getIncomes,
    updateIncome,
    deleteIncome,
    getIncome
};
