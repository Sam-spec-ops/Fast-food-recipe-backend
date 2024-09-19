const recipeModel = require('../models/recipeModel');

const insertRecipeController = async (req, res) => {
	const userId = req.userId;
	console.log(userId)
	await recipeModel.createTable();
	const { ownername,recipename,description,steps,contactname,contactphonenumber,likes } = req.body;
	console.log({ownername,recipename,description,steps,contactname,contactphonenumber,likes, userId})
	try {
        const recipeId = await recipeModel.insertRecipe(ownername,recipename,description,steps,contactname,contactphonenumber,likes,userId);
        if(!recipeId) {
            return res.status(201).json({ id: null, message: "failed" });
        }
        res.status(201).json({ id: recipeId, message: "successful" });
    } catch (error) {
        console.log(error);
    }
}

const updateRecipeController = async (req, res) => {
	const userId = req.userId;
	const { ownername,recipename,description,steps,contactname,contactphonenumber,likes} = req.body;
	try{
        const updateorder=await recipeModel.updateRecipe(ownername,recipename,description,steps,contactname,contactphonenumber,likes,userId);
        if (updateorder=== 0) {
            res.status(403).json({ error: 'Order not found' });
        } else {
            res.status(201).json({ message: 'Order updated' });
        }
    } catch (error) {
        res.status(404).json({ error: 'Failed to update order' });
    }
}

const getAllRecipiesController = async (req, res) => {
	const userId = req.userId;
	try {
		const getrows = await recipeModel.getAllRecipies(userId);
	    if (!getrows) {
	        res.status(403).json({ message: "Orders not found" });
	        return
	    }
	    res.status(201).json({ orders: getrows, message: 'successful' })
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	insertRecipeController,
	updateRecipeController,
	getAllRecipiesController
}