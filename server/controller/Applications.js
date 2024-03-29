const Application = require('../models/Application');

const addNewApplication = async (req, res) => {
    try {
        const newApplication = new Application({
            userId: req.user.id, //this id is fetched from token itself
            company: req.body.company,
            role: req.body.role,
            status: req.body.status,
            remark: req.body.remark,
            url: req.body.url,
            resume: req.body.resume,
            cv: req.body.cv
        })
        await newApplication.save().then(() => {
            res.json({ "message": "application added" })
        })
    } catch (error) {
        //Internal server error
        res.status(500).json(error);
    }
}

const updateApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (application.userId === req.user.id) {
            await Application.findByIdAndUpdate(req.params.id, req.body);
            res.json({ "message": "application updated" })
        } else {
            res.status(401).json({ "message": "unauthorized" })
        }
    } catch (error) {
        res.status(500).json({ "message": "Internal server error" })
    }
}

const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (application.userId === req.user.id) {
            await Application.findByIdAndDelete(req.params.id);
            res.json({ "message": "application deleted" })
        } else {
            res.status(401).json({ "message": "unauthorized" })
        }
    } catch (error) {
        res.status(500).json({ "message": "Internal server error" })
    }
}

const getApplications = async (req, res) => {
    try {
        const userId = req.user.id //provide by middleware
        const applications = await Application.find({ userId: userId })
        res.json(applications);
    } catch (error) {
        res.status(5000).json({ message: "Internal server error" })
    }
}

module.exports = { addNewApplication, updateApplication, deleteApplication, getApplications }