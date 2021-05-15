import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { enterRoom } from "../features/appSlice";
import { db } from "../firebase";
const SidebarOptions = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const addChannel = () => {
    const channelName = prompt("Enter a channel name");
    if (channelName) {
      db.collection("rooms").add({ name: channelName });
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10, color: "#fff" }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOptions;
const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #340e36;
    > h3 {
      font-weight: 500;
    }
  }
`;
const SidebarOptionChannel = styled.h3`
  font-weight: 300;
  padding: 10px 0;
  > span {
    padding: 15px;
  }
`;
