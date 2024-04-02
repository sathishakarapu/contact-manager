import React, { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import img from '../components/Images/dashboard.png';
import img1 from '../components//Images/vector.png';
import img2 from '../components/Images/group.png';
import img3 from '../components/Images/search.png';
import img4 from '../components/Images/profile.png';
// import img5 from '../components/Images/date.png';
import img6 from '../components/Images/filter.png';
import img7 from '../components/Images/delete.png';
import img8 from '../components/Images/import.png';
import img9 from '../components/Images/export.png';
import Modal from 'react-modal';
import Contacts from './Contacts';
Modal.setAppElement(document.body);

const Container = styled.div`
    width: 1728px;
    height: 1117px;
    background: #FFFFFF;
    border: 1px solid black;
    overflow: hidden;
    position: relative;
`;
const SideBar = styled.div`
    width: 231px;
    height: 1117px;
    background: #CEF3FF;
    border: 1px blue solid;
`;
const Logo = styled.div`
    width: 83px;
    height: 61px;
    top: 13px;
    left: 50px;
    position: absolute;
    font-family: Titillium Web,sans-serif;
    font-size: 40px;
    font-weight: 600;
    line-height: 60.84px;
    text-align: left;
    color: #0884FF;
`
const DashBoard = styled.img`
    width: 24px;
    height: 24px;
    top: 142px;
    left: 40px;
    position: absolute;
`
const DashBoardText = styled.div`
    width: 84px;
    height: 27px;
    top: 141px;
    left: 72px;
    position: absolute;
    font-family: Titillium Web,sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 27.38px;
    text-align: left;
    color: #181818;
`
const TotalContacts = styled.div`
    width: 183px;
    height: 65px;
    top: 203px;
    left: 24px;
    border-radius: 6px;
    background: #2DA5FC;
    border: 2px solid #FFFFFF;
    position: absolute;
`
const Vector = styled.img`
    width: 20px;
    height: 24px;
    top: 224px;
    left: 40px;
    color: #FFFFFF;
    position: absolute;
`
const TotalContactsText = styled.div`
    width: 108px;
    height: 27px;
    top: 222px;
    left: 68px;
    opacity: 0.8px;
    position: absolute;
    font-family: Titillium Web,sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 27.38px;
    text-align: left;
    color: #FFFFFF;
    white-space: nowrap;
`
const Line = styled.div`
    width: 231px;
    height: 0px;
    top: 1022px;
    border: 2px solid #EAEAEA;
    position: absolute;
`
const Vector1 = styled.div`
    width: 0px;
    height: 32px;
    top: 220px;
    left: 195px;
    color: #FFFFFF;
    position: absolute;
    border: 2px solid #FFFFFF;
`
const LoginImg = styled.img`
    width: 18.75px;
    height: 18.75px;
    top: 1050px;
    left: 35px;
    color: #000000;
    position: absolute;
    cursor: pointer;
`
const LogOut = styled.div`
    width: 57px;
    height: 27px;
    top: 1047px;
    left: 67px;
    opacity: 0.8px;
    position: absolute;
    font-family: Titillium Web,sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 27.38px;
    text-align: left;
    color: #000000;
    white-space: nowrap;
    cursor: pointer;
`
const NavBar = styled.div`
    width: 1497px;
    height: 98px;
    left: 231px;
    top: 0px;
    border: 1px solid darkgreen;
    position: absolute;
`;
const Total = styled.div`
    width: 194px;
    height: 49px;
    top: 25px;
    left: 24px;
    opacity: 0.8px;
    font-family: Titillium Web,sans-serif;
    font-size: 32px;
    font-weight: 600;
    line-height: 48.67px;
    text-align: left;
    color: #454545;
    white-space: nowrap;
    position: absolute;
`
const SearchInput = styled.img`
    width: 17.49px;
    height: 17.49px;
    top: 40px;
    left: 680px;
    color: #000000;
    position: absolute;
`
const Input = styled.input`
    width: 458px;
    height: 50px;
    top: 24px;
    left: 654px;
    border-radius: 6px;
    position: absolute;
    background: #F2F2F2;
    padding-left: 64px;
    font-family: Titillium Web,sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 27.38px;
    text-align: left;
    border: none;
`
const Profile = styled.img`
    width: 44px;
    height: 44px;
    top: 27px;
    left: 1330px;
    position: absolute;
`
const Name = styled.div`
    width: 80px;
    height: 24px;
    top: 27px;
    left: 1393px;
    opacity: 0.8px;
    font-family: Titillium Web,sans-serif;
    position: absolute;
    font-size: 16px;
    font-weight: 600;
    line-height: 24.34px;
    text-align: left;
    color: #000000;
    white-space: nowrap;
`
const SubName = styled.div`
    width: 76px;
    height: 21px;
    top: 51px;
    left: 1393px;
    gap: 0px;
    opacity: 0.7px;
    font-family: Titillium Web,sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 21.29px;
    text-align: left;
    color: #000000;
    position: absolute;
    white-space: nowrap;
`
const Body = styled.div`
    width: 1449px;
    height: 898px;
    top: 124px;
    left: 255px;
    position: absolute;
    border: 1px solid purple;
    background: #FBFBFB;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
`
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
    left: 970px;
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
    left: 990px;
    position: absolute;
    cursor: pointer;
`
const ImportImg = styled.img`
    width: 14.3px;
    height: 17.56px;
    top: 38px;
    left: 1150px;
    position: absolute;
    cursor: pointer;
`
const ExportImg = styled.img`
    width: 16px;
    height: 16px;
    top: 38px;
    left: 1300px;
    position: absolute;
    cursor: pointer;
`
const Import = styled.button`
    width: 141px;
    height: 41px;
    top: 26px;
    left: 1125px;
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
    left: 1280px;
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
const ContactsContainer = styled.div`
  margin-top: 90px;
`;

const Home = () => {

    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);


    useEffect(() => {
        const token = getCookie('token');
    
        if (!token) {
            navigate('/login');
        } else {
            axios.get("http://localhost:8080/verifyUser", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                const userEmail = response.data?.user?.email || '';
                const userName = userEmail.split('@')[0];
                setUser(userName);
            })
            .catch(error => {
                console.error('Error verifying user:', error.message);
                if (error.response.status === 401 || error.response.data.message === 'jwt expired') {
                    // Redirect to login page when token is expired
                    navigate('/login');
                }
            });
        }
    }, [navigate]);

    const handleImport = () => {
        setModalIsOpen(true);
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleFileUpload = (file) => {
        const formData = new FormData();
        formData.append('csvFile', file);
    
        axios.post('http://localhost:8080/importContacts', formData)
    .then(response => {
        console.log(response.data);
        alert('Contacts imported successfully');
        setModalIsOpen(false);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error importing contacts');
    });
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];
        handleFileUpload(file);
    };

    const handleLogout = () => {
        // Clear authentication token and log out
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null); // Clear user state
        // Redirect to login page
        navigate('/login');
    };

    // Function to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
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
            alert('Contacts exported successfully!');
        } catch (error) {
            console.error('Error exporting contacts:', error);
            // Handle error
        }
    };    

  return (
    <>
      <Container>
        <SideBar>
            <Logo>Logo</Logo>
            <DashBoard src={img} alt='dashboard'/>
            <DashBoardText>Dashboard</DashBoardText>
            <TotalContacts></TotalContacts>
            <Vector src={img1} alt='vector'/>
            <TotalContactsText>Total contacts</TotalContactsText>
            <Vector1/>
            <Line/>
            <LoginImg onClick={handleLogout} src={img2} alt='group'/>
            <LogOut onClick={handleLogout}>Log out</LogOut>
        </SideBar>
        <NavBar>
            <Total>Total Contacts</Total>
            <Input placeholder='Search by Email Id.....'/>
            <SearchInput src={img3} alt='search' />
            <Profile src={img4} alt='profile'/>
            <Name>{user}</Name>
            <SubName>Super Admin</SubName>
        </NavBar>
        <Body>
            <SelectDate type="date" placeholder='Select Date'></SelectDate>
            <Filter >
                <Option value="all">All</Option>
                <Option value="designation">By Designation</Option>
                <Option value="company">By Company</Option>
                <Option value="name">By Name</Option>
                <Option value="industry">By Industry</Option>
                <Option value="country">By Country</Option>
            </Filter>
            <FilterLogo src={img6} alt='filter'/>
            <Delete>Delete</Delete>
            <Import onClick={handleImport}>Import</Import>
            <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleModalClose}
                contentLabel="Upload Modal"
                style={{
                    content: {
                        width: '21%',
                        height: '21%', 
                        margin: 'auto'
                    }
                }}
            >
                <div
                    style={{ width: '95%', height: '75%', border: '2px dashed #ccc', textAlign: 'center', lineHeight: '200px' }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <h2>Drop and Drag to Upload File</h2>
                </div>
                <button onClick={handleModalClose} style={{
                    backgroundColor: '#0884FF',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '5px 200px',
                    cursor: 'pointer',
                }}>Cancel</button>
            </Modal>
            </div>
            <Export onClick={handleExportContacts}>Export</Export>
            <DeleteImg src={img7} alt='delete'/>
            <ImportImg src={img8} alt='import'/>
            <ExportImg  onClick={handleExportContacts} src={img9} alt='export'/>
            <ContactsContainer>
            <Contacts user={user} onImport={handleImport}/>
            </ContactsContainer>
        </Body>
      </Container>
    </>
  )
}

export default Home