import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Interface for the User object
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const AutoComplete: React.FC = () => {
  // State variables
  const [inputValue, setInputValue] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Fetch data asynchronously
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        console.log(data); // Log fetched data
        setUsers(data.users);
        setFilteredUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Memoize the filterUsers function to avoid unnecessary re-renders
  const filterUsers = useCallback(() => {
    // If the input value is empty, reset the filtered users to the original data
    if (inputValue.trim() === '') {
      setFilteredUsers(users);
      return;
    }

    // Filter the users based on the input value
    const filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(inputValue.toLowerCase())
    );

    console.log(filtered); // Log filtered users
    setFilteredUsers(filtered);
  }, [inputValue, users]);

  // Call the filterUsers function whenever it changes or the inputValue or users change
  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  // Handle input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedUser(null);
  };

  // Handle user click event
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setInputValue(`${user.firstName} ${user.lastName}`);
    setFilteredUsers([user]);
  };

  return (
    <div className="auto-complete-container">
      {/* Input field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />

      {/* User table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Render filtered users */}
          {filteredUsers.map(user => (
            <tr key={user.id} onClick={() => handleUserClick(user)}>
              <td>{user.id}</td>
              <td>
                {/* Highlight the matching part of the text */}
                <span className="highlight">{inputValue}</span>
                {user.firstName.substring(inputValue.length)}
              </td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display selected user details */}
      {selectedUser && (
        <div className="selected-user">
          <strong>Selected User:</strong> {selectedUser.firstName} {selectedUser.lastName} ({selectedUser.email})
        </div>
      )}
    </div>
  );
};

export default AutoComplete;