
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// =====================================
// 1. PREGUNTAS DE FUTBOL INTERNACIONAL
// =====================================

const videojuegos = [
  {
    pregunta: '¿Cuántos jugadores tiene un equipo de fútbol en la cancha?',
    opciones: ['9', '10', '11', '12'],
    correcta: 2
  },
  {
    pregunta: '¿Qué país ganó el Mundial de fútbol 2022?',
    opciones: ['Brasil', 'Argentina', 'Francia', 'Alemania'],
    correcta: 1
  },
  {
    pregunta: '¿En qué equipo juega actualmente Lionel Messi?',
    opciones: ['Inter Miami', 'Barcelona', 'Real Madrid', 'PSG'],
    correcta: 0
  },
  {
    pregunta: '¿Cada cuántos años se juega el Mundial de fútbol?',
    opciones: ['2 años', '3 años', '4 años', '5 años'],
    correcta: 2
  },
  {
    pregunta: '¿Qué jugador es conocido como CR7?',
    opciones: ['Neymar', 'Cristiano Ronaldo', 'Mbappé', 'Benzema'],
    correcta: 1
  }
];

// =====================================
// 2. PREGUNTAS DE FUTBOL ECUATORIANO
// =====================================

const anime = [
  {
    pregunta: '¿Cómo se conoce a la selección de fútbol de Ecuador?',
    opciones: ['La Tricolor', 'La Canarinha', 'La Albiceleste', 'La Roja'],
    correcta: 0
  },
  {
    pregunta: '¿En qué año clasificó Ecuador por primera vez a un Mundial?',
    opciones: ['1998', '2002', '2006', '2010'],
    correcta: 1
  },
  {
    pregunta: '¿Qué equipo ecuatoriano ganó la Copa Libertadores en 2008?',
    opciones: ['Barcelona SC', 'Emelec', 'Liga de Quito', 'El Nacional'],
    correcta: 2
  },
  {
    pregunta: '¿En qué ciudad juega como local Barcelona Sporting Club?',
    opciones: ['Quito', 'Cuenca', 'Ambato', 'Guayaquil'],
    correcta: 3
  },
  {
    pregunta: '¿Qué jugador ecuatoriano es conocido como Superman?',
    opciones: ['Enner Valencia', 'Antonio Valencia', 'Moisés Caicedo', 'Pervis Estupiñán'],
    correcta: 0
  }
];

// =====================================
// 3. FUNCION PRINCIPAL DE QUIZONE
// =====================================

export default function App() {

  // Estados de la aplicación
  const [pantalla, setPantalla] = useState(1);
  const [tema, setTema] = useState(null);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [correctas, setCorrectas] = useState(0);
  const [incorrectas, setIncorrectas] = useState(0);

  // Seleccionamos las preguntas según el tema
  let preguntas = [];

  if (tema === 'videojuegos') {
    preguntas = videojuegos;
  } else if (tema === 'anime') {
    preguntas = anime;
  }

  const actual = preguntas[indice];

  // =====================================
  // 4. FUNCIONES DEL JUEGO
  // =====================================

  // Permite elegir una categoría
  function elegirTema(t) {
    setTema(t);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);

    if (t === 'videojuegos') {
      setPantalla(3);
    } else {
      setPantalla(4);
    }
  }

  // Comprueba si la respuesta es correcta
  function responder(i) {
    if (seleccion !== null) return;

    setSeleccion(i);

    if (i === actual.correcta) {
      setCorrectas(c => c + 1);
    } else {
      setIncorrectas(c => c + 1);
    }
  }

  // Avanza a la siguiente pregunta
  function siguiente() {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setPantalla(5);
    }
  }

  // Reinicia el juego
  function volverAJugar() {
    setTema(null);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    setPantalla(2);
  }

  // =====================================
  // 5. PANTALLA DE INICIO
  // =====================================

  if (pantalla === 1) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.logo}>⚽</Text>
        <Text style={styles.titulo}>QuizZone</Text>
        <Text style={styles.subtitulo}>
          ¡Demuestra cuánto sabes de fútbol!
        </Text>

        <Button
          title="Comenzar"
          onPress={() => setPantalla(2)}
        />
      </View>
    );
  }

  // =====================================
  // 6. PANTALLA DE SELECCION
  // =====================================

  if (pantalla === 2) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Selecciona una categoría</Text>

        <View style={styles.espacio}>
          <Button
            title="⚽ Fútbol internacional"
            onPress={() => elegirTema('videojuegos')}
          />
        </View>

        <View style={styles.espacio}>
          <Button
            title="🇪🇨 Fútbol ecuatoriano"
            onPress={() => elegirTema('anime')}
          />
        </View>

        <View style={styles.espacio}>
          <Button
            title="Atrás"
            color="#7a869a"
            onPress={() => setPantalla(1)}
          />
        </View>
      </View>
    );
  }

  // =====================================
  // 7. PANTALLAS DE PREGUNTAS
  // =====================================

  if (pantalla === 3 || pantalla === 4) {

    let mensaje = '';

    if (seleccion !== null) {
      if (seleccion === actual.correcta) {
        mensaje = '¡Respuesta correcta! 🎉';
      } else {
        mensaje =
          'Respuesta incorrecta. La respuesta era: ' +
          actual.opciones[actual.correcta];
      }
    }

    return (
      <View style={styles.contenedor}>
        <Text style={styles.tema}>
          {tema === 'videojuegos'
            ? '⚽ Fútbol internacional'
            : '🇪🇨 Fútbol ecuatoriano'}
        </Text>

        <Text style={styles.contador}>
          Pregunta {indice + 1} de {preguntas.length}
        </Text>

        <Text style={styles.contador}>
          Puntos: {correctas}
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.pregunta}>
            {actual.pregunta}
          </Text>
        </View>

        <View style={styles.espacio}>
          <Button
            title={'A. ' + actual.opciones[0]}
            onPress={() => responder(0)}
            disabled={seleccion !== null}
          />
        </View>

        <View style={styles.espacio}>
          <Button
            title={'B. ' + actual.opciones[1]}
            onPress={() => responder(1)}
            disabled={seleccion !== null}
          />
        </View>

        <View style={styles.espacio}>
          <Button
            title={'C. ' + actual.opciones[2]}
            onPress={() => responder(2)}
            disabled={seleccion !== null}
          />
        </View>

        <View style={styles.espacio}>
          <Button
            title={'D. ' + actual.opciones[3]}
            onPress={() => responder(3)}
            disabled={seleccion !== null}
          />
        </View>

        {seleccion !== null && (
          <View>
            <Text
              style={
                seleccion === actual.correcta
                  ? styles.bien
                  : styles.mal
              }
            >
              {mensaje}
            </Text>

            <Button
              title={
                indice < preguntas.length - 1
                  ? 'Siguiente pregunta'
                  : 'Ver resultados'
              }
              color="#239455"
              onPress={siguiente}
            />
          </View>
        )}
      </View>
    );
  }

  // =====================================
  // 8. PANTALLA DE RESULTADOS
  // =====================================

  let mensajeFinal = '';

  if (correctas >= 4) {
    mensajeFinal = '¡Excelente! Eres un experto en fútbol 🏆';
  } else if (correctas >= 3) {
    mensajeFinal = '¡Muy bien! Sigue aprendiendo 👏';
  } else {
    mensajeFinal = '¡Sigue practicando! 💪';
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>🏆</Text>

      <Text style={styles.titulo}>
        ¡Juego terminado!
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Tu puntaje final</Text>

        <Text style={styles.puntaje}>
          {correctas} / {preguntas.length}
        </Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Correctas</Text>
          <Text style={styles.miniValor}>
            {correctas}
          </Text>
        </View>

        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Incorrectas</Text>
          <Text style={styles.miniValor}>
            {incorrectas}
          </Text>
        </View>
      </View>

      <Text style={styles.final}>
        {mensajeFinal}
      </Text>

      <Button
        title="Volver a jugar"
        onPress={volverAJugar}
      />
    </View>
  );
}

// =====================================
// 9. ESTILOS DE LA APLICACION
// =====================================

const styles = StyleSheet.create({

  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#eef4ff'
  },

  logo: {
    fontSize: 64,
    textAlign: 'center'
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#173b83',
    marginBottom: 15
  },

  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#596579',
    marginBottom: 25
  },

  espacio: {
    marginBottom: 12
  },

  tema: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2457c5'
  },

  contador: {
    fontSize: 14,
    textAlign: 'center',
    color: '#596579',
    marginVertical: 8
  },

  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16
  },

  pregunta: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#202b3c'
  },

  bien: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#239455',
    marginVertical: 10
  },

  mal: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c33c3c',
    marginVertical: 10
  },

  etiqueta: {
    fontSize: 14,
    textAlign: 'center',
    color: '#596579'
  },

  puntaje: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2457c5'
  },

  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  mini: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12
  },

  miniValor: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#202b3c'
  },

  final: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18
  }

});


