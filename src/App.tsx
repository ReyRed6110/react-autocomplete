import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  const filterUsers = useCallback(() => {
    if (inputValue.trim() === '') {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(inputValue.toLowerCase())
    );

    console.log(filtered); // Log filtered users
    setFilteredUsers(filtered);
  }, [inputValue, users]);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedUser(null);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setInputValue(`${user.firstName} ${user.lastName}`);
    setFilteredUsers([user]);
  };

  return (
    <div className="auto-complete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
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
          {filteredUsers.map(user => (
            <tr key={user.id} onClick={() => handleUserClick(user)}>
              <td>{user.id}</td>
              <td>
                <span className="highlight">{inputValue}</span>
                {user.firstName.substring(inputValue.length)}
              </td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div className="selected-user">
          <strong>Selected User:</strong> {selectedUser.firstName} {selectedUser.lastName} ({selectedUser.email})
        </div>
      )}
    </div>
  );
};

export default AutoComplete;