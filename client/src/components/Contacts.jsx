import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-modal';
import EditContacts from './EditContacts';
import editContact from '../components/Images/edit.png';
import deleteContact from '../components/Images/deleteContact.png';
import img6 from '../components/Images/filter.png';
import img7 from '../components/Images/delete.png';
import img8 from '../components/Images/import.png';
import img9 from '../components/Images/export.png';

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

const SelectDate = styled.input`
    width: 150px;
    height: 40px;
    top: 26px;
    left: 34px;
    border-radius: 10px;
    position: absolute;
    border: 2px solid #7D7D7D;
    font-family: Titillium Web,sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 30.42px;
    text-align: left;
    background: #FFFFFF;
    cursor: pointer;
`
const Option = styled.option`
    font-family: Titillium Web,sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 30.42px;
    text-align: center;
`
const Filter = styled.select`
    width: 170px;
    height: 40px;
    top: 26px;
    left: 220px;
    border-radius: 10px;
    border: 2px solid #7D7D7D;
    position: absolute;
    padding-left:30px;
    font-family: Titillium Web,sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 27.38px;
    text-align: left;
    color: #000000;
    background: #FFFFFF;
`
const FilterLogo = styled.img`
    width: 18px;
    height: 12px;
    top: 40px;
    left: 230px;
    gap: 0px;
    opacity: 0px;
    color: black;
    position: absolute;
`
  const Delete = styled.button`
    width: 139px;
    height: 41px;
    top: 26px;
    left: 950px;
    border-radius: 10px;
    font-family: Titillium Web,sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 27.38px;
    text-align: left;
    color: #000000;
    position: absolute;
    padding-left: 50px;
    background: #FFFFFF;
    border: 2px solid #7D7D7D;
    cursor: pointer;
`
const DeleteImg = styled.img`
    width: 15px;
    height: 16px;
    top: 38px;
    left: 970px;
    position: absolute;
    cursor: pointer;
`
const ImportImg = styled.img`
    width: 14.3px;
    height: 17.56px;
    top: 38px;
    left: 1130px;
    position: absolute;
    cursor: pointer;
`
const ExportImg = styled.img`
    width: 16px;
    height: 16px;
    top: 38px;
    left: 1280px;
    position: absolute;
    cursor: pointer;
`
const Import = styled.button`
    width: 141px;
    height: 41px;
    top: 26px;
    left: 1105px;
    border-radius: 10px;
    font-family: Titillium Web,sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 27.38px;
    text-align: left;
    color: #000000;
    position: absolute;
    border: 2px solid #7D7D7D;
    padding-left: 50px;
    background: #FFFFFF;
    cursor: pointer;
`
const Export = styled.button`
    width: 139px;
    height: 41px;
    top: 26px;
    left: 1260px;
    border-radius: 10px;
    font-family: Titillium Web,sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 27.38px;
    border: 2px solid #7D7D7D;
    text-align: left;
    color: #000000;
    position: absolute;
    padding-left: 50px;
    background: #FFFFFF;
    cursor: pointer;
`

const Contacts = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editingContactData, setEditingContactData] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  const fetchContacts = () => {
    axios.get('http://localhost:8080/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        setError(error.message || 'An error occurred while fetching contacts');
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleEdit = (contactId, initialData) => {
    setEditingContactId(contactId);
    setEditingContactData(initialData);
    setEditModalIsOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalIsOpen(false);
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
      await axios.delete(`http://localhost:8080/deleteContacts/${id}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError(error.message || 'An error occurred while deleting contact');
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleImportButtonClick = () => {
    setModalIsOpen(true);
  };

  const handleCancel = () => {
    setModalIsOpen(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('csvFile', file);

    axios.post('http://localhost:8080/importContacts', formData)
      .then(response => {
        console.log(response.data);
        alert('Contacts imported successfully');
        setModalIsOpen(false);
        fetchContacts();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error importing contacts');
      });
  };

  const handleExportContacts = async () => {
    // Display a confirmation dialog before exporting contacts
    const confirmed = window.confirm('Are you sure you want to export contacts?');
    
    // Check if user confirmed the action
    if (!confirmed) {
        // User canceled the action
        return;
    }
    
    try {
        const response = await axios.get('http://localhost:8080/exportContacts', {
            responseType: 'blob' // Important to receive file as blob
        });

        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: 'text/csv' });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contacts.csv'); // Specify the filename
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Alert message after successful export
        alert('Contacts exported successfully!');
    } catch (error) {
        console.error('Error exporting contacts:', error);
        // Handle error
    }
  };

  const toggleSelectContact = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const deleteSelectedContacts = () => {
    setDeleteModalIsOpen(true);
  };

  const confirmDeleteContacts = async () => {
    try {
      // Map selected contact IDs to an array of delete requests
      const deleteRequests = selectedContacts.map(id => axios.delete(`http://localhost:8080/deleteContacts/${id}`));
      
      // Send all delete requests concurrently
      await Promise.all(deleteRequests);
  
      // Update state after successful deletion
      setContacts(contacts.filter(contact => !selectedContacts.includes(contact._id)));
      setSelectedContacts([]);
      setDeleteModalIsOpen(false); // Close the modal after deletion
      alert("Contacts deleted Successfully.")
    } catch (error) {
      console.error('Error deleting contacts:', error);
      // Handle error
    }
  };
  
  // Add a function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  return (
    <div>
      <SelectDate type="date" placeholder='Select Date'></SelectDate>
      <Filter>
        <Option value="all">All</Option>
        <Option value="designation">By Designation</Option>
        <Option value="company">By Company</Option>
        <Option value="name">By Name</Option>
        <Option value="industry">By Industry</Option>
        <Option value="country">By Country</Option>
      </Filter>
      <FilterLogo src={img6} alt='filter' />
      <Delete onClick={deleteSelectedContacts}>Delete</Delete>
      {error && <div>Error: {error}</div>}
      <Import onClick={handleImportButtonClick}>Import</Import>
      <Export onClick={handleExportContacts}>Export</Export>
      <DeleteImg src={img7} alt='delete' onClick={deleteSelectedContacts}/>
      <ImportImg src={img8} alt='import' onClick={handleImportButtonClick}/>
      <ExportImg src={img9} alt='export' onClick={handleExportContacts}/>
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
              <Td style={{display:'flex'}}>
              <input type="checkbox" style={{marginRight:'20px',cursor:'pointer'}}
            checked={selectedContacts.includes(contact._id)} onChange={() => toggleSelectContact(contact._id)}
            />
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Upload Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            width: '400px',
            height: '230px',
            margin: 'auto'
          }
        }}
      >
        <div
          style={{
            width: '370px',
            height: '170px',
            border: '2px dashed #ccc',
            textAlign: 'center',
            lineHeight: '200px'
          }}
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <h2 style={{whiteSpace:'nowrap',color:'#2DA5FC'}}>Drop and Drag your file here</h2>
        </div>
        <button onClick={handleCancel} style={{background:'#2DA5FC',color:'white',borderRadius:'20px',width:'90px',height:'40px',fontSize:'18px',marginLeft:'150px',cursor:'pointer',marginTop:'10px',padding:'10px'}}>Cancel</button>
      </Modal>
      <Modal
            isOpen={editModalIsOpen}
            onRequestClose={handleCloseEditModal}
            contentLabel="Edit Contact Modal"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              },
              content: {
                width: '300px',
                height: '250px',
                margin: 'auto'
              }
            }}
          >
            {/* Render the EditContacts component inside the modal */}
            {editingContactId && (
              <EditContacts
                contactId={editingContactId}
                initialData={editingContactData}
                onComplete={() => {
                  handleEditComplete();
                  handleCloseEditModal();
                }}
                onCancel={handleCloseEditModal}
              />
            )}
          </Modal>
          <Modal
            isOpen={deleteModalIsOpen}
            onRequestClose={closeDeleteModal}
            contentLabel="Delete Confirmation Modal"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              },
              content: {
                width: '300px',
                height: '150px',
                margin: 'auto'
              }
            }}
          >
            <div>
              <h2 style={{whiteSpace:'nowrap',color:'#2DA5FC'}}>Confirm Delete</h2>
              <div style={{display:'flex'}}>
              <button onClick={confirmDeleteContacts} style={{background:'#2DA5FC',color:'white',borderRadius:'20px',width:'90px',height:'40px',fontSize:'18px',marginLeft:'50px',cursor:'pointer',marginTop:'10px',padding:'10px'}}>Yes</button>
              <button onClick={closeDeleteModal} style={{background:'#2DA5FC',color:'white',borderRadius:'20px',width:'90px',height:'40px',fontSize:'18px',marginLeft:'50px',cursor:'pointer',marginTop:'10px',padding:'10px'}}>No</button>
              </div>
            </div>
          </Modal>
    </div>
  );
};

export default Contacts;