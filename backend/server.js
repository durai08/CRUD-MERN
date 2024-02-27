    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");

    mongoose
    .connect("mongodb://127.0.0.1:27017/crud", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
    const app = express();

    const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    mail: String,
    phone_number: Number,
    });

    const User = mongoose.model("User", UserSchema);

    app.use(express.json());
    app.use(cors());

    // Fetch all users
    app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
       
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    });

    // Create a new user
    app.post("/users", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    });

    // Update a user
    app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });
        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    });

    // Delete a user
    app.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    });
