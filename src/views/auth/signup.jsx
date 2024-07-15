import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import TextAnimation from "@/components/animations/textanimation";
import { Link , useNavigate} from 'react-router-dom';
import { Button } from "@/components/ui/button"
import Toast from "@/components/toastmsg";
import { Loader } from "@/components/loader";

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

const SignUpPage = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastType, setToastType] = React.useState('success');

   const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleDismissError = () => {
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setShowToast(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username ,email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        navigate('/login');
        triggerToast(`${data.message || 'Account registed successful please login'} `, 'success')
      } else {
        const errorData = await response.json();
        triggerToast(`${errorData.message || 'An error occurred during login'} `, 'danger')

      }
    } catch (error) {
      console.log(error);
      triggerToast(`An error occurred during login `, 'danger')
      
    }finally {
    setLoading(false);
  }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center flex-col items-center">
       {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
        />
      )}
      <br />
      <br />
      <TextAnimation />
      <br />
      <div className="formContainer max-w-md w-full  rounded-lg shadow-2xl p-8">
        <div className="flex flex-col gap-6">
          {errorMessage && (
            <div className="flex justify-between items-center bg-red-500 text-white p-2 rounded">
              <p className="text-xs">{errorMessage}</p>
              <button onClick={handleDismissError} className="ml-4 text-xl font-bold">&times;</button>
            </div>
          )}
            <FormControl required>
            <Label>Username</Label>
            <StyledInput
              placeholder="Enter your username here"
              value={username}
              onChange={handleUsernameChange}
              disabled={loading}
            />
            <HelperText />
          </FormControl>
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

          <Button
            variant="outline"
            className="w-[100%] p-2  bg-slate-900 rounded-md text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <p className="flex items-center gap-2"><Loader size={30}/> Loading...</p> : 'Register'}
          </Button>
          <hr />
          <p>Already have an account <Link to='/login' className="text-blue-500" >Login?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
