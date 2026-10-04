import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Alert
} from 'react-native';

export default function App() {
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [listaMaterias, setListaMaterias] = useState([]);

  // Función para agregar materia y evaluar condición (Estructura Selectiva)
  const agregarMateria = () => {
    const notaNum = parseFloat(calificacion);

    // Estructura selectiva: Validación de campos
    if (!materia.trim() || isNaN(notaNum)) {
      Alert.alert('Error', 'Por favor ingrese un nombre y una calificación válida.');
      return;
    }

    // Estructura selectiva: Determinación de estatus (if / else)
    let estatus = '';
    let aprobado = false;

    if (notaNum >= 70) {
      estatus = 'Aprobado';
      aprobado = true;
    } else {
      estatus = 'Reprobado';
      aprobado = false;
    }

    const nuevaMateria = {
      id: Date.now().toString(),
      nombre: materia,
      nota: notaNum,
      estatus: estatus,
      aprobado: aprobado,
    };

    setListaMaterias([...listaMaterias, nuevaMateria]);
    setMateria('');
    setCalificacion('');
  };

  // Función para calcular el promedio (Estructura Iterativa: for)
  const calcularPromedio = () => {
    if (listaMaterias.length === 0) return 0;

    let suma = 0;
    // Bucle for para cumplir con la Parte 1
    for (let i = 0; i < listaMaterias.length; i++) {
      suma += listaMaterias[i].nota;
    }

    return (suma / listaMaterias.length).toFixed(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluador de Calificaciones</Text>

      {/* Formulario de Entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la materia"
          value={materia}
          onChangeText={setMateria}
        />
        <TextInput
          style={styles.input}
          placeholder="Calificación (0 - 100)"
          keyboardType="numeric"
          value={calificacion}
          onChangeText={setCalificacion}
        />
        <Pressable
          style={({ hovered }) => [
            styles.button,
            hovered && styles.buttonHover
          ]}
          onPress={agregarMateria}
        >
          <Text style={styles.buttonText}>Agregar Materia en curso</Text>
        </Pressable>
      </View>

      {/* Resumen del Promedio */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Promedio General: {calcularPromedio()}
        </Text>
        <Text style={styles.summarySubtext}>
          Total registradas: {listaMaterias.length}
        </Text>
      </View>

      {/* Estructura Iterativa: Renderizado de la lista */}
      <FlatList
        data={listaMaterias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Text style={styles.cardScore}>Nota: {item.nota}</Text>
            </View>
            <Text
              style={[
                styles.badge,
                { backgroundColor: item.aprobado ? '#4CAF50' : '#F44336' },
              ]}
            >
              {item.estatus}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, marginBottom: 10 },
  button: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonHover: { backgroundColor: '#1976D2' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  summaryContainer: { backgroundColor: '#E3F2FD', padding: 15, borderRadius: 8, marginBottom: 15 },
  summaryText: { fontSize: 18, fontWeight: 'bold', color: '#0D47A1' },
  summarySubtext: { fontSize: 14, color: '#1565C0' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardScore: { fontSize: 14, color: '#666' },
  badge: { color: '#FFF', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12, fontWeight: 'bold' },
});