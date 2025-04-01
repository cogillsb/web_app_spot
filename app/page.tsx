"use client";

import React, { useState, useEffect } from 'react';
import WebPlaybackTest from './components/WebPlaybackTest';
import Login from './components/Login';
import Header from "./components/Header";
import { setAccessToken } from './actions/setAccessToken';
import { getCookie } from './actions/userSettings';
import NoAccess from './components/NoAccess';

export default function Home() {
  const [refresh_token, setrtok] = useState<string>("");
  const [atok, setatok] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const findAccessToken = async () => {
    const result = await setAccessToken(refresh_token);
    setatok(result);
  };

  const getRtoken = async () => {
    const result = await getCookie('refreshToken')||"none";
    setrtok(result);
  };  

  useEffect(() => {
    //Havent fetched the rtoken yet
    if (refresh_token === "") {
      getRtoken();
    }
  }, [refresh_token]);

  useEffect(() => {
    //No R token exists or the atok fetch did not work
    //User needs to login
    if (refresh_token === "none" || atok !== "") {
      setLoading(false);
    }
  }, [refresh_token, atok]); 

  useEffect(() => {
    if (refresh_token !== "" && refresh_token !== "none" && atok === "") {
      findAccessToken();
    };    
  }, [refresh_token, atok]);

  return (
    <>
      <Header token={atok} loading={loading} />
      <main className="  flex items-center justify-center">
        <div className="m-4  items-center justify-center">
          {atok !== "" ? (
            atok === "no_access" ? (
              <NoAccess />
            ) : (
              <WebPlaybackTest token={atok} />
            )
          ) : (
            <Login />
          )}
        </div>
      </main>
    </>
  );
}

