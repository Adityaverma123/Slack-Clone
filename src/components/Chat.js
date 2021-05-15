import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import { useEffect, useRef } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import { db } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";
const Chat = () => {
  const roomId = useSelector(selectRoomId);
  const chatRef = useRef(null);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [loading, roomId]);
  return (
    <ChatContainer>
      {roomDetails && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                {roomDetails ? (
                  <strong>{`#${roomDetails.data().name}`}</strong>
                ) : (
                  <strong>#room-name</strong>
                )}
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                ></Message>
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          ></ChatInput>
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;
const ChatContainer = styled.div`
  flex: 0.7;
  overflow-y: scroll;
  flex-grow: 1;
  margin-top: 60px;
  &::-webkit-scrollbar {
    width: 0px;
  }
  @media(max-width:820px){
    flex:0.9;
  }
`;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
const ChatMessages = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > strong {
    text-align: center;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
