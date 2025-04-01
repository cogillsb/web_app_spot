"use client"

import { useState, useEffect } from 'react';
import { getPlaylist } from '../actions/getPlaylist';
import { getCookie } from '../actions/userSettings';
import { Button } from "@/components/ui/button"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
}

interface props {
  disable: boolean;
  onStateChange: (value: Status) => void;
  token: string;
}

export default function Playlist({ onStateChange, token, disable }: props) {

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>({value:"", label:""});
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    if (statuses.length===0) {
      const getList = async () => {
        const result = await getPlaylist(token);
        const lbl = await getCookie('plist_name') || "";
        const val = await getCookie('plist_uri') || "";
        const lastpl: Status = { value: val, label: lbl };

        // Create an empty array
        const mylist: Status[] = [];
        const names: string[] = [];

        // Use a for loop to add elements to the array
        for (let i = 0; i < result.items.length; i++) {
           if (result.items[i] === null){continue;}
          if (names.includes(result.items[i].name,)) {
            mylist.push(
              {
                value: result.items[i].uri,
                label: result.items[i].name + "_" + i,
              }
            );
          } else {
            mylist.push(
              {
                value: result.items[i].uri,
                label: result.items[i].name,
              }
            );
            names.push(result.items[i].name);
          }
        }
        const sortedItems = [...mylist].sort((a, b) => a.label.localeCompare(b.label));

        setStatuses(sortedItems);
        
        const exists = mylist.some((item) => {
          return Object.keys(item).every((key) => item[key as keyof Status] === lastpl[key as keyof Status]);
        });
   
        if (exists) {
          setSelectedStatus(lastpl);          
        } 
      };
      getList();
    }

  }, [statuses]);

  useEffect(() => {
    onStateChange(selectedStatus);
  }, [selectedStatus]);

  if (statuses) {
    return (
      <div className="flex items-center space-x-4">
        <p >Playlist:</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" style={{ width: 'auto' }} className="w-[150px] justify-start" disabled={disable}>
              {selectedStatus ? <>{selectedStatus.label}</> : <>+ Select Playlist</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change playlist..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.label}
                      value={status.label}
                      onSelect={(value) => {
                        setSelectedStatus(
                        statuses.find((priority) => priority.label === value) ||
                        {value:"", label:"+ Select Playlist"}
                        )
                        setOpen(false)
                      }}
                    >
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
  } else {
    return <h1>Loading</h1>;
  }

}
