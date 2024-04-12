import { React, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = "https://contact-manager-db17a144bd77.herokuapp.com";


const Container = styled.div`
    width: 1728px;
    height: 1117px;
    border: 1px solid black;
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

const Logo = styled.div`
    width: 92px;
    height: 18px;
    top: 347px;
    left: 818px;
    position: absolute;
    font-family: Open Sans,sans-serif;
    font-size: 40px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.25px;
    text-align: left;
    color: #7D8CC4;
`

const InnerContainer = styled.div`
    width: 450px;
    height: 432px;
    top: 418px;
    left: 639px;
    border-radius: 5px;
    position: absolute;
    border: 1px solid #E2E2E2;
`

const Text = styled.div`
    width: 328px;
    height: 22px;
    top: 418px;
    left: 700px;
    opacity: 0.6px;
    position: absolute;
    font-family: Open Sans,sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.25px;
    text-align: center;
    color: #000000;
`

const Input1 = styled.input`
    width: 428px;
    height: 54px;
    top: 516px;
    left: 639px;
    border-radius: 5px;
    border: 1px;
    position: absolute;
    border: 1px solid #E2E2E2;
    padding-left: 20px;
`

const Input2 = styled.input`
    width: 410px;
    height: 54px;
    top: 604px;
    left: 639px;
    border-radius: 5px;
    border: 1px;
    position: absolute;
    border: 1px solid #E2E2E2;
    padding-left: 20px;
    padding-right: 20px;
`

const Rectangle = styled.div`
    width: 452px;
    height: 54px;
    top: 734px;
    left: 639px;
    position: absolute;
    background: #7D8CC4;
    border-radius: 5px;
`;

const T1 = styled.button`
    width: 450px;
    height: 54px;
    top: 734px;
    left: 639px;
    border-radius: 5px;
    border: 1px;
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
    border-radius: 5px;
    cursor: pointer;
`;

const T2 = styled.div`
    width: 57px;
    height: 18px;
    top: 832px;
    left: 839px;
    font-family: Open Sans,sans-serif;
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.25px;
    text-align: left;
    color: #7D8CC4;
    position: absolute;
    white-space: nowrap;
`
const Message = styled.div`
    position: absolute;
    top: 880px;
    left: 750px;
    color: red;
    font-size: 24px;
`

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message,setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setMessage('Please enter all the required fields !')
            return;
        }

        try {
            const response = await axios.post( apiUrl + '/login', {
                email: email,
                password: password
            });

            // If the request is successful (status code 2xx)
            if (response.status >= 200 && response.status < 300) {
                console.log('Login Successful');
                // Set token in response cookie
                document.cookie = `token=${response.data.token}; path=/;`;
                navigate('/home'); // Redirect to home after successful login
            } else {
                // If the request is not successful (status code is not 2xx)
                throw new Error('Login failed with status code ' + response.status);
            }
        } catch (error) {
            console.error("Error:", error.message);
            setMessage('Username or password doesnot matched !');
        }
    }


    return (
        <>
            <Container>
                <Background>
                    <Ellipse1 />
                    <Ellipse2 />
                    <LoginContainer>
                    </LoginContainer>
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
                    <Logo>Logo</Logo>
                    <InnerContainer />
                    <Text>
                        Enter your credentials to access your account
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <Input1 placeholder='User ID'
                            type='email' value={email}
                            name='email' onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input2 placeholder='Password'
                            value={password}
                            name='password' type='password' onChange={(e) => setPassword(e.target.value)}
                        />
                        <Rectangle />
                        <T1 type='submit' value='login'>Sign In</T1>
                    </form>
                        <Message>{message}</Message>
                    <T2>Dont, have an account ? <Link to="/signup" style={{ color: '#7D8CC4' }}>Sign Up</Link></T2>
                </Background>
            </Container>
        </>
    )
}

export default Login