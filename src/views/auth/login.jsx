import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { Button } from '@mui/base/Button';
import TextAnimation from "@/components/animations/textanimation";
import { Link } from 'react-router-dom';
import  Checkbox  from '@mui/material/Checkbox';

const StyledInput = styled(Input)(
    ({ theme }) => `
  
    .${inputClasses.input} {
      width: 100%;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
    }
  `,
  );
  
  const Label = styled(({ children, className }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);
  
    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);
  
    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }
  
    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;
  
    return (
      <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
        {children}
        {required ? ' *' : ''}
      </p>
    );
  })`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;
  
    &.invalid {
      color: red;
    }
  `;
  
  const HelperText = styled((props) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);
  
    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);
  
    if (formControlContext === undefined) {
      return null;
    }
  
    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;
  
    return showRequiredError ? <p {...props}>This field is required.</p> : null;
  })`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
  `;
  
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleRememberMeChange = (event) => {
      setRememberMe(event.target.checked);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // eslint-disable-next-line no-undef
      console.log('processenv',process.env.APIURL);
      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(`${process.env.APIURL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, rememberMe }),
        });
  
        if (response.status === 200) {
          // Handle successful login
          console.log('Login successful');
        } else {
          // Handle login error
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'An error occurred during login');
        }
      } catch (error) {
        console.log(error)
        setErrorMessage('An error occurred during login');
      }
    }
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center flex-col items-center">
        <br />
        <br />
        <TextAnimation />
        <br />
        <div className="formContainer max-w-md w-full bg-slate-950 rounded-lg shadow-md p-8">
          <div className="flex flex-col gap-6">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <FormControl defaultValue="" required>
              <Label>Email</Label>
              <StyledInput placeholder="Enter your email here" value={email} onChange={handleEmailChange} />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Password</Label>
              <StyledInput type="password" placeholder="Enter your password here" value={password} onChange={handlePasswordChange} />
              <HelperText />
            </FormControl>
            <div className="flex justify-between">
              <div className="flex items-center">
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  inputProps={{ 'aria-label': 'Remember Me' }}
                  style={{ color: 'white' }}
                />
                <span className="text-white">Remember Me</span>
              </div>
              <Link href="/login">
                <p className="text-white">Forgot Password?</p>
              </Link>
            </div>
            
            <Button variant="contained" className=" w-[100%] bg-slate-900 p-2 rounded-md" onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginPage;