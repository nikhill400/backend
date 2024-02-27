const SampleModel = require('../Models/Model')
const path = require('path')




module.exports.dataget = async (req, res) => {
    await SampleModel.find({}, {
        _id: 1,
        Name: 1,
        Email: 1,
        PhoneNumber: 1,
       
    }).then((samples) => {
            console.log(samples);
            res.json(samples);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting samples", err });
        });
}

module.exports.datapost = (req,res)=>{
        const task = req.body
    
        SampleModel.create(task)
        .then((data) => {
            console.log("Saved successfully");
            res.status(201).send(data)
        }).catch((err)=>{
            console.log(err.errors);
            res.send({error : err , msg:"Something went wrong"});
        });
    };

    
    module.exports.datadelete = async (req, res) => {
        try {
            const userId = req.params.userId;
            console.log('Received delete request for user ID:', userId);
    
            const deletedUser = await SampleModel.findByIdAndDelete(userId);
    
            if (!deletedUser) {
                console.log('User not found');
                return res.status(404).json({ error: 'User not found' });
            }
    
            console.log("User deleted successfully: ", deletedUser);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error("Error deleting user: ", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    

module.exports.dataupdate = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updates = {
            Name: req.body. Name,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
           
          
        };

        const updatedUser = await SampleModel.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log("User updated successfully: ", updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
