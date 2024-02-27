import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Crud.css";

function Crud() {
  // Define state variables for users, form inputs, and selected user for update
  const [users, setUsers] = useState([]);
  console.log("users",users)
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [age, setAge] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateMode, setUpdateMode] = useState(false); // To track whether update mode is active

  // useEffect hook is called when the component mounts
  useEffect(() => {
    // Call fetchUsers function to fetch user data from the backend
    fetchUsers();
  }, []);

  // Function to fetch user data from the backend
  const fetchUsers = async () => {
    try {
      // Make a GET request to the backend endpoint '/users' using axios
      const response = await axios.get("http://localhost:3000/users");
      // Update the 'users' state with the data received from the backend
      setUsers(response.data);
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle form submission for adding or updating a user
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (updateMode) {
        // Update existing user if update mode is active
        await axios.put(`http://localhost:3000/users/${selectedUser._id}`, {
          name,
          mail,
          age,
          phone_number,
        });
        // Reset update mode
        setUpdateMode(false);
      } else {
        // Add new user if update mode is inactive
        if (name.trim() === "" || mail.trim() === "" || age.trim() === "" || phone_number.trim() === "") {
          alert("Please fill in all details");
          return; // Exit the function if any field is empty
        }
        else{
          await axios.post("http://localhost:3000/users", {
            name,
            mail,
            age,
            phone_number,
          });
        }
        
      }
      // Reset form inputs and fetch updated user data
      setName("");
      setMail("");
      setAge("");
      setPhoneNumber("");
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle deleting a user
  const deleteUser = async (userId) => {
    try {
      // Make a DELETE request to delete the user with the given userId
      await axios.delete(`http://localhost:3000/users/${userId}`);
      // Fetch updated user data after deletion
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to handle editing a user
  const editUser = (user) => {
    // Set the selected user and populate form inputs with user data
    setSelectedUser(user);
    setName(user.name);
    setMail(user.mail);
    setAge(user.age);
    setPhoneNumber(user.phone_number);
    // Activate update mode
    setUpdateMode(true);
  };

  // Render the component
  return (
    <div className="container">
      <h2>Add / Update User</h2>
      {/* Form for adding or updating a user */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {/* Conditional rendering for the form button */}
        <button type="submit">{updateMode ? "Update" : "Add"}</button>
      </form>
      
      <h2>User List</h2>
      {/* Render the list of users fetched from the backend */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {/* Display user information */}
            {user.name} - {user.mail} - {user.age} - {user.phone_number}
            {/* Button to edit user */}
            <button className="btn-edit" onClick={() => editUser(user)}>
              {updateMode && selectedUser._id === user._id ? "Cancel" : "Edit"}
            </button>
            {/* Button to delete user */}
            <button className="btn-del" onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crud;
