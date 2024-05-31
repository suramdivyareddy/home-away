import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import io from 'socket.io-client';

const ChatScreen = ({ route }) => {
    const { token } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:5000');

    useEffect(() => {
        socket.emit('join', { userId: 'user-id' });

        socket.on('receiveMessage', msg => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.emit('sendMessage', { senderId: 'user-id', receiverId: 'receiver-id', message });
        setMessages(prev => [...prev, { senderId: 'user-id', message }]);
        setMessage('');
    };

    return (
        <View>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text>{item.message}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <TextInput placeholder="Message" value={message} onChangeText={setMessage} />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

export default ChatScreen;
