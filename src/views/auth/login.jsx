import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { Button } from "@/components/ui/button"
import TextAnimation from "@/components/animations/textanimation";
import { Link, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

const StyledInput = styled(Input)(({ theme }) => `
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
`);

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
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleDismissError = () => {
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('sessionToken', data.sessionToken);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
        console.log('Login successful');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'An error occurred during login');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center flex-col items-center">
      <br />
      <br />
      <TextAnimation />
      <br />
      <div className="formContainer max-w-md w-full rounded-lg shadow-sm shadow-black p-8">
        <div className="flex flex-col gap-6">
          {errorMessage && (
            <div className="flex justify-between items-center bg-red-500 text-white p-2 rounded">
              <p className="text-xs">{errorMessage}</p>
              <button onClick={handleDismissError} className="ml-4 text-xl font-bold">&times;</button>
            </div>
          )}
         
          <FormControl required>
            <Label>Email</Label>
            <StyledInput
              placeholder="Enter your email here"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
            />
            <HelperText />
          </FormControl>
          <FormControl required>
            <Label>Password</Label>
            <StyledInput
              type="password"
              placeholder="Enter your password here"
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            <HelperText />
          </FormControl>
          <div className="flex justify-between">
            <div className="flex items-center">
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
                inputProps={{ 'aria-label': 'Remember Me' }}
                disabled={loading}
              />
              <span>Remember Me</span>
            </div>
            <Link to="/forgot-password">
              <p>Forgot Password?</p>
            </Link>
          </div>
          <Button
            variant="outline"
            className="w-[100%] bg-slate-900 p-2 rounded-md"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
          <br />
          <hr />
          <p>Don’t have an account? <Link to='/signup' className="text-blue-500">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
