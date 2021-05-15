import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOptions from "./SidebarOptions";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Add,
  Apps,
  BookmarkBorder,
  Clear,
  Drafts,
  ExpandLess,
  ExpandMore,
  FileCopy,
  Inbox,
  InsertComment,
  Menu,
  PeopleAlt,
} from "@material-ui/icons";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const SideBar = ({ sideBar, showSideBar }) => {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  return (
    <SidebarContainer sideBar={sideBar}>
      <Clear onClick={() => showSideBar(!sideBar)} />
      <SidebarHeader>
        <SidebarInfo>
          <h2>Aditya Chatroom</h2>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <SidebarOptions Icon={InsertComment} title="Threads" />
      <SidebarOptions Icon={Inbox} title="Mentions & reactions" />
      <SidebarOptions Icon={Drafts} title="Saved Items" />
      <SidebarOptions Icon={BookmarkBorder} title="Channel browser" />
      <SidebarOptions Icon={PeopleAlt} title="People & user groups" />
      <SidebarOptions Icon={Apps} title="Apps" />
      <SidebarOptions Icon={FileCopy} title="File Browser" />
      <SidebarOptions Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOptions Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOptions Icon={Add} title="Add Channel" addChannelOption />
      {channels?.docs.map((doc) => (
        <SidebarOptions key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
};

export default SideBar;
const SidebarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  min-width: 260px;
  border-top: 1px solid #49274b;
  overflow-y: scroll;
  margin-top: 60px;
  transition: transform 400ms linear;
  &::-webkit-scrollbar {
    width: 0px;
  }
  > .MuiSvgIcon-root {
    display: none;
    align-self: flex-end;
    margin-right: 15px;
  }
  @media (max-width: 820px) {
    transform: ${(p) => (p.sideBar ? "translateX(0%)" : "translateX(-105%)")};
    > .MuiSvgIcon-root {
      display: block;
    }
  }
  > hr {
    margin: 10px 0;
    border: 1px solid #49274b;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
