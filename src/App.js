import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { showSideBar } from "./features/appSlice";
import Login from "./components/Login";
import { PushSpinner } from "react-spinners-kit";
import Menu from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";

function App() {
  const [user, loading] = useAuthState(auth);
  const [sideBar, setSideBar] = useState(false);
  // const dispatch = useDispatch();
  const showSideBar = (s) => {
    console.log(s);
    setSideBar(s);
    // dispatch(showSideBar);
  };
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContent>
          <img
            src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
            alt=""
          />
          <PushSpinner size={100} color="#686769" loading={loading} />
        </AppLoadingContent>
      </AppLoading>
    );
  }
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <AppBodyOuter>
            <Header />
            <Menu onClick={() => showSideBar(!sideBar)} />
            <AppBody>
              <SideBar sideBar={sideBar} showSideBar={showSideBar} />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </AppBodyOuter>
        )}
      </Router>
    </div>
  );
}

export default App;
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
`;
const AppLoadingContent = styled.div`
  padding: 100px;
  > img {
    height: 200px;
  }
`;
const AppBodyOuter = styled.div`
  display: flex;
  flex-direction: column;
  > .MuiSvgIcon-root {
    position: absolute;
    top: 60px;
  }
`;
