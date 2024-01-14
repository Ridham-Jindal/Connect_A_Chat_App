import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box ,Text} from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender,getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { FormControl, Input, Spinner, effect, useToast } from '@chakra-ui/react';
import axios from 'axios';
import "./styles.css";
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;


const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const [messages, setMessages] = useState([]);
    const [loading,setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const {user,selectedChat,setSelectedChat} = ChatState();
    const [socketConnected,setSocketConnected] = useState(false);

    const toast = useToast();

    const fetchMessages = async()=>{
      if(!selectedChat) return;
      try {
        const config = {
          headers:{
            Authorization: `Bearer ${user.token}`,
          },
        };
        setLoading(true);
        const { data } = await axios.get
        (`/api/message/${selectedChat._id}`,
          config
        );
        setMessages(data);
        setLoading(false);
        socket.emit('join chat',selectedChat._id);
      } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Messages",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
      }
    };


    useEffect(()=>{
      socket = io(ENDPOINT);
      socket.emit("setup",user);
      socket.on('connection',()=>setSocketConnected(true));
    }, []);

    //useEffect is basically used to fetch data
    useEffect(()=>{
      fetchMessages();

      //we did the followiung inequality because we want to check whether the chat is updated or not
      //on the basis of this inequality we will decide whether we want to notify about the new message or not
      selectedChatCompare = selectedChat;
    },[selectedChat]);

    useEffect(()=>{
      socket.on("message received",(newMessageReceived)=>{
        if(!selectedChatCompare||selectedChatCompare._id!==newMessageReceived.chat._id)
        {

        }
        else
        {
          setMessages([...messages,newMessageReceived]);
        }
      });
    })

    const sendMessage=async(e)=>{
        if(e.key==="Enter"&&newMessage){
            try {
                const config = {
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token},`
                    },
                };

                setNewMessage("");
                const {data} = await axios.post("/api/message",
                {
                    content: newMessage,
                    chatId: selectedChat._id,
                },
                config
                );

                socket.emit("new message",data);
                setMessages([...messages,data])//... is used for creating an array
            } catch (error) {
                toast({
                title: "Error Occured!",
                description: "Failed to send the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
                });
            }
        }
    };


    const typingHandler=(e)=>{
        setNewMessage(e.target.value);
    }
  return (
    <>
      {selectedChat?
      (<>
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat?(
                <>{getSender(user,selectedChat.users)}
                <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
                </>
            ):(
                <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                fetchMessages={fetchMessages}
                />
                </>
            )

            }
            </Text>
            <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading?(
                <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"/>
            ):(
                <div className="messages">
                  <ScrollableChat messages = {messages}/>
                </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3} alignContent="bottom">
                <Input
                 variant="filled"
                 bg="E0E0E0"
                 placeholder="Enter a Message:)"
                 onChange={typingHandler}
                 value={newMessage}
                 />

            </FormControl>
          </Box>
      </>):(
        <Box d = "Flex" justifyContent="center" h="100%" alignItems="center">
            <Text fontSize="3xl" pb={3} fontFamily="Work Sans">
                Start Connecting!
            </Text>

        </Box>
      )


      }
    </>
  )
}

export default SingleChat;
