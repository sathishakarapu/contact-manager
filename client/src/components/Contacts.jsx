import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditContacts from './EditContacts';
import editContact from '../components/Images/edit.png';
import deleteContact from '../components/Images/deleteContact.png';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #B2DFFF;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  background: #B2DFFF4F;
  border: 1px solid #ddd;
  text-align: center;
`;

const Contacts = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editingContactData, setEditingContactData] = useState(null);

  const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
      axios.get('http://localhost:8080/contacts')
        .then(response => {
          setContacts(response.data);
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
          setError(error.message || 'An error occurred while fetching contacts');
        });
    }, []);

  // const filteredContacts = contacts.filter(contact => {
  //   if (filter === 'all') {
  //     return true; // Return all contacts if filter is 'all'
  //   } else {
  //     // Example: Filtering based on 'designation' option
  //     return contact.designation === filter;
  //   }
  // });

  const handleEdit = (contactId, initialData) => {
    setShowEditForm(true);
    setEditingContactId(contactId);
    setEditingContactData(initialData);
  };

  const handleEditComplete = () => {
    setShowEditForm(false);
    setEditingContactId(null);
    // Fetch contacts data again after editing a contact
    axios.get('http://localhost:8080/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/contacts/${id}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError(error.message || 'An error occurred while deleting contact');
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Designation</Th>
            <Th>Company</Th>
            <Th>Industry</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
            <Th>Country</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id}>
              <Td style={{ display: 'flex' }}>
                <input type='checkbox' style={{ marginRight: '30px', cursor: 'pointer', height: '20px', width: '20px' }} />
                {contact.name}
              </Td>
              <Td>{contact.designation}</Td>
              <Td>{contact.company}</Td>
              <Td>{contact.industry}</Td>
              <Td>{contact.email}</Td>
              <Td>{contact.phone}</Td>
              <Td>{contact.country}</Td>
              <Td>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => handleEdit(contact._id, contact)}><img alt='edit' src={editContact} /></button>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => handleDelete(contact._id)}><img alt='delete' src={deleteContact} /></button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showEditForm && editingContactId && (
        <EditContacts
          contactId={editingContactId}
          initialData={editingContactData}
          onComplete={handleEditComplete}
          onCancel={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
};

export default Contacts;