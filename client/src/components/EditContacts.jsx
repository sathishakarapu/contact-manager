import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = "https://contact-manager-db17a144bd77.herokuapp.com";

const EditContacts = ({ contactId, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    industry: '',
    email: '',
    phoneNumber: '',
    country: ''
  });

  useEffect(() => {
    // Fetch the contact data from the backend using the contact ID
    axios.get(apiUrl + `/contactById/${contactId}`)
      .then(response => {
        // Destructure response data and set form data
        const { name, designation, company, industry, email, phone, country } = response.data;
        setFormData({ name, designation, company, industry, email, phone, country });
      })
      .catch(error => {
        console.error('Error fetching contact:', error);
      });
  }, [contactId]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Send a PUT request to update the contact
      await axios.put(apiUrl + `/contacts/${contactId}`, formData);

      // Notify the parent component that editing is complete
      onComplete();
    } catch (error) {
      console.error('Error updating contact:', error);
      // Handle error appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Designation:</label>
        <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
      </div>
      <div>
        <label>Company:</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} />
      </div>
      <div>
        <label>Industry:</label>
        <input type="text" name="industry" value={formData.industry} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Country:</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
      </div>
      <button type="submit" style={{cursor:'pointer',marginLeft:'85px',color:'white',marginTop:'20px',background:'#2DA5FC',border:'1px solid black',borderRadius:'15px',padding:'10px'}}>Save Changes</button>
    </form>
  );
};

export default EditContacts;