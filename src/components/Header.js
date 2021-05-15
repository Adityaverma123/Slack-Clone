import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { Search } from "@material-ui/icons";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      {/* {Header-Left} */}
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => {
            auth.signOut();
          }}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTime />
      </HeaderLeft>

      {/* {Header-Search} */}
      <HeaderSearch>
        <Search />
        <input type="text" placeHolder="Search Aditya" />
      </HeaderSearch>

      {/* {Header-Right} */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  background-color: #421f44;
  border-radius: 6px;
  /* text-align: center; */
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;
  > .MuiSvgIcon-root {
    color: white;
  }
  > input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: flex-end;
  > .MuiSvgIcon-root {
    color: white;
    margin-right: 20px;
    margin-left: auto;
  }
`;
const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-right: 30px;
    margin-left: auto;
    color: white;
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
