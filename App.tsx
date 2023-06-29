import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, TextInput } from 'react-native';

const App = () => {

    const [title, setTitle] = useState<string>();
    const [body, setBody] = useState<string>();

    const handleSend = async () => {
        if (title != '' && body != '') {
            const req = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: 326
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await req.json();
          
                alert('Salvo com sucesso! '+ json.id);
           
        } else {
            alert('Preencha as informações');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Titulo:</Text>
            <TextInput style={styles.input} value={title} onChangeText={t => setTitle(t)} />
            <Text style={styles.label}>Body:</Text>
            <TextInput style={styles.input} value={body} onChangeText={t => setBody(t)} />
            <Button  title='Enviar' onPress={handleSend} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    label: {
        color: '#fff',
        padding: 10
    },
    input: {       
        padding: 10,
        margin: 10,
        backgroundColor: "#ccc",
        color: '#000',
        borderRadius: 5
    }
});

export default App;