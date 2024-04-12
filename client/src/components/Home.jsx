import React, { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import img from '../components/Images/dashboard.png';
import img1 from '../components//Images/vector.png';
import img2 from '../components/Images/group.png';
import img4 from '../components/Images/profile.png';
import Contacts from './Contacts';
const apiUrl = "https://contact-manager-db17a144bd77.herokuapp.com";

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

const ContactsContainer = styled.div`
  margin-top: 90px;
`;

const Home = () => {

    const [user, setUser] = useState();
    const navigate = useNavigate();

    // verify the user and get the name by email id
    useEffect(() => {
        const token = getCookie('token');
    
        if (!token) {
            navigate('/login');
        } else {
            axios.get(apiUrl +"/verifyUser", {
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

    // logout function to remove the token and send back to home page
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
            <Profile src={img4} alt='profile'/>
            <Name>{user}</Name>
            <SubName>Super Admin</SubName>
        </NavBar>
        <Body>
            <ContactsContainer>
            <Contacts />
            </ContactsContainer>
        </Body>
      </Container>
    </>
  )
}

export default Home