import styled from 'styled-components';

const StyledButton = styled.button `
background-color:${props=>props.bg || '#fcfcfc'};
font-size:15px;
border:1px solid ${props=>props.border || '#fcfcfc'};
border-radius:10px;
margin-right:5px;
color:${props=>props.border || '#fcfcfc'}`;

const SubmitButton = styled.button `
border: 1px solid #2b6fa9;
font-size: 15px;
text-align: center;
padding: 4px;
background: #fcfcfc;
border-radius: 5px;
color: #2b6fa9;`;

const Error = styled.div `
padding-top: 5px;
color:#f34646;
font-size:12px;`;

const LogOut = styled.button `
border:0;
background:transparent;
color:#ccc;`;

const CloseButton = styled.button `
background:transparent;
border:0;`;

export {StyledButton, Error, SubmitButton,LogOut, CloseButton};