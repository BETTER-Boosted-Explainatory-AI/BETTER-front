import { styled } from "@mui/material";
import FormControl from '@mui/material/FormControl';

export const LoginContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 48%;
    height: 88vh;
`;

export const PaginationContainer = styled("div")`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 48%;
    height: 88vh;
`;

export const FormContainerStyle = styled(FormControl)`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
    gap: 0.7em;
    border-radius: 25px;
    border: 1px solid #e1e1e1;
`;
