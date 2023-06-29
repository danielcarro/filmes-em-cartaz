import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, FlatList, View, Image, StyleSheet, ActivityIndicator } from 'react-native';

type Movie = {
  titulo: string;
  avatar: string;
}
const App = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const requjestMovies = async () => {
      setLoading(true);
      const req = await fetch('https://api.b7web.com.br/cinema/');
      const json = await req.json();
      if (json) {
        setMovies(json);
        setLoading(false);
      }
    }
    requjestMovies();
  }, []);

  const handleLoadButton = async () => {
    setLoading(true);
    const req = await fetch('https://api.b7web.com.br/cinema/');
    const json = await req.json();
    if (json) {
      setMovies(json);
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button title='carregar Filmes' onPress={handleLoadButton} />
      {loading &&
        <View style={styles.loadingArea}>
          <ActivityIndicator size='large' color='#fff' />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      }



      {!loading &&
        <>
          <Text style={styles.totalMoviesText}>Total de Filmes: {movies.length}</Text>
          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({ item }) => (
              <View style={styles.movieItem}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.movieImage}
                  resizeMode='contain'
                />
                <Text style={styles.movieTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={item => item.titulo}
          />
        </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  totalMoviesText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  list: {
    flex: 1
  },
  movieItem: {
    marginBottom: 30
  },
  movieImage: {
    height: 400
  },
  movieTitle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center'
  }
})

export default App;