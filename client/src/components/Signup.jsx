import {React, useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
const apiUrl = "https://contact-manager-db17a144bd77.herokuapp.com";

const Container = styled.div`
    width:1728px;
    height:1117px;
    border:1px solid black;
    overflow: hidden;
    background: #FFFFFF;
`;

const Background = styled.div`
    position: relative;
`;

const Ellipse1 = styled.div`
    width: 300px;
    height: 300px;
    top: -44px;
    left: -45px;
    background: #B2DFFF;
    border-radius: 50%;
    position: absolute;
`;

const Ellipse2 = styled.div`
    width: 300px;
    height: 300px;
    top: 868.94px;
    left: 1500px;
    background: #B2DFFF;
    border-radius: 50%;
    position: absolute;
`;

const LoginContainer = styled.div`
    width: 1400px;
    height: 800px;
    top: 158px;
    left: 164px;
    border-radius: 20px;
    opacity: 0.36;
    position: absolute;
    background: #CEF3FF;
`;

const EllipseContainer1 = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 13.69px);
  grid-template-rows: repeat(6, 13.69px);
  width: 178px;
  height: 150.62px;
  top: 747px;
  left: 204px;
  gap: 12px;
  position: absolute;
`;
const EllipseContainer2 = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 13.69px);
  grid-template-rows: repeat(6, 13.69px);
  width: 178px;
  height: 150.62px;
  top: 198px;
  left: 1326px;
  gap: 12px;
  position: absolute;
`;

const Ellipse = styled.div`
  max-height: 13.69px;
  max-width: 13.69px;
  border-radius: 50%;
  background: #2DA5FC80;
`;

const Rectangle = styled.div`
    width: 450px;
    height: 450px;
    top: 320px;
    left: 639px;
    border: 1px solid #E2E2E2;
    position: absolute;
    border-radius: 5px;
`;

const Logo = styled.div`
    width: 92px;
    height: 18px;
    top: 335px;
    left: 818px;
    position: absolute;
    font-family: Open Sans,sans-serif;
    font-size: 40px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.25px;
    text-align: left;
    color: #7D8CC4;
`;

const Text = styled.div`
    width: 147px;
    height: 22px;
    top: 406px;
    left: 791px;
    opacity: 0.6px;
    position: absolute;
    font-family: Open Sans,sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.25px;
    text-align: center;
    color: #000000;
`;

const Input1 = styled.input`
    width: 428px;
    height: 54px;
    top: 465px;
    left: 639px;
    border-radius: 5px;
    position: absolute;
    border: 1px solid #E2E2E2;
    padding-left: 20px;
`
const Input2 = styled.input`
    width: 428px;
    height: 54px;
    top: 544px;
    left: 639px;
    border-radius: 5px;
    position: absolute;
    border: 1px solid #E2E2E2;
    padding-left: 20px;
`;

const Input3 = styled.input`
    width: 428px;
    height: 54px;
    top: 623px;
    left: 639px;
    border-radius: 5px;
    background: #FFFFFF;
    position: absolute;
    border: 1px solid #E2E2E2;
    padding-left: 20px;
`;

const B1 = styled.button`
    width: 450px;
    height: 54px;
    top: 702px;
    left: 640px;
    font-family: Open Sans,sans-serif;
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.25px;
    color: #FFFFFF;
    position: absolute;
    white-space: nowrap;
    background: #7D8CC4;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`;

const Bt = styled.p`
    font-size: 14px;
    margin-top: 10px;
    top: 750px;
    left: 750px;
    position: absolute;
`;

const Message = styled.div`
    font-size: 20px;
    margin-top: 10px;
    top: 780px;
    left: 700px;
    position: absolute;
`

const Signup = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('');
        
    // Handle form submission here, e.g., send data to the server
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validation for empty inputs
        if (!email || !password || !confirmPassword) {
            setMessage('Please enter all the required fields !');
            return;
        }

        // Validation for password match
        if (password !== confirmPassword) {
            setMessage('passwords do not match !');
            return;
        }
        
        try {
            const response = await axios.post(apiUrl + '/signup', {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });
        
            // If the request is successful (status code 2xx)
            if (response.status >= 200 && response.status < 300) {
                console.log('Signup successful');
                setMessage('Successfully signed up');
                navigate('/login'); // Redirect to the login page
            } else {
                // If the request is not successful
                throw new Error('Signup failed with status code ' + response.status);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Check if error message indicates existing user
            setMessage('Username is already taken. Please choose a different one.')
            if (error.response && error.response.data && error.response.data.message === 'User already exists') {
                setMessage('Username is already taken. Please choose a different one !')
            }
        }        
    }

    return (
      <>
        <Container>
            <Background>
                <Ellipse1/>
                <Ellipse2/>
                <LoginContainer/>
                    <EllipseContainer1>
                        {[...Array(42)].map((_, index) => (
                            <Ellipse key={index} />
                        ))}
                    </EllipseContainer1>
                    <EllipseContainer2>
                        {[...Array(42)].map((_, index) => (
                            <Ellipse key={index} />
                        ))}
                    </EllipseContainer2>
                    <Rectangle/>
                    <Logo>Logo</Logo>
                    <Text>
                        Create New Account
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <Input1 placeholder='Mail ID' type='email' 
                        value={email} name='email'  autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}/>

                        <Input2 placeholder='Password' type='password' 
                        value={password} name='password' autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}/>

                        <Input3 placeholder='Confirm Password' type='password' autoComplete='off'
                        value={confirmPassword} name='confirmPassword' 
                        onChange={(e) => setConfirmPassword(e.target.value)}/>

                        <B1 style={{textDecoration:'none',color:'#FFFFFF'}} 
                        type='submit'>Sign up</B1>
                    </form>
                    <Message style={{color:'red',position:'absolute'}}>{message}</Message>
                        
                    <Bt>Already have an account ?<Link to='/login'>login</Link></Bt>
            </Background>
        </Container>
      </>
    )
  }
  
  export default Signup