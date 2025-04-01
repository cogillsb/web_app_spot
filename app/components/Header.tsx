
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,  } from "@/components/ui/dialog";
import Image from 'next/image'
import { getProfile } from "../actions/getProfile";

interface props {
  loading: boolean;
  token: string;
}

function Header({ token, loading }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {  
    if (!profile && token!=="" && token!=="no_access"){
      const getDat = async () => {
        const result = await getProfile(token);        
        if (result['images'].length >1){
          setProfile(result['images'][1]['url']);
        };       
      };
      getDat();
    };
  }, [token]);

  return (
    <header className="flex gap-x-1 flex-row items-center justify-between bg-yellow-200  border-b-2 bg-gray-100">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About</DialogTitle>
            <DialogDescription>
              <p>Built by Kesho-AI. This is a free (even ad free) web app for interval training.
                Spotify Premium is required. Sync up to your Spotify player and cycle through a playlist at
                given time intervals. We do not track user data. Enjoy your workout!
              </p>

            </DialogDescription>
          </DialogHeader>
          {/* Add your dialog content here */}
        </DialogContent>
      </Dialog>
      <Dialog open={contactIsOpen} onOpenChange={setContactIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact</DialogTitle>
            <DialogDescription>
              <div className="flex flex-row">
                <Image
                  src="/contact.png"
                  width={200}
                  height={200}
                  alt="Kesho-AI"
                />
                <p style={{ textAlign: 'justify' }}>
                  Hope you are enjoying the app. If you have questions, suggestions, or would like
                  to collaborate on something. We can be reached at: <br />
                  <a href="mailto:cogillsb@kesho-ai.com" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>cogillsb@kesho-ai.com</a>
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>        
        </DialogContent>
      </Dialog>
      <div className="p-2">
      {(profile) && <img  className="rounded-xl" src={profile} width={30} height={30}/>}
      </div>
      <div className="flex space-x-1 m-3">
        <Button disabled={loading} variant="link">
          {(token==="") ? <a href="/login" >Access</a> : <a href="/logout" >Logout</a>}
        </Button>
        <Button disabled={loading} variant="link" onClick={() => setIsOpen(true)}>
          About
        </Button>
        <Button disabled={loading} variant="link" onClick={() => setContactIsOpen(true)}>
          Contact
        </Button>
      </div>
    </header>
  );
};

export default Header;