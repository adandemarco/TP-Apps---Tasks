import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const coloresDisponibles = ['#1a73e8', '#ea4335', '#fbbc04', '#34a853', '#ff6d01'];

export default function FormularioTarea({ agregarTarea, tareaEditar, editarTarea, cerrarFormulario }) {
  const [texto, setTexto] = useState('');
  const [color, setColor] = useState(coloresDisponibles[0]);

  // Si se va a editar una tarea, carga sus datos
  useEffect(() => {
    if (tareaEditar) {
      setTexto(tareaEditar.texto);
      setColor(tareaEditar.color);
    }
  }, [tareaEditar]);

  // Guarda la tarea nueva o editada
  const onGuardar = () => {
    if (texto.trim() === '') {
      alert('La tarea no puede estar vacía');
      return;
    }

    // Si hay una tarea para editar, actualiza
    if (tareaEditar) {
      editarTarea(tareaEditar.id, texto, color);
    } else {
      agregarTarea(texto, color);
    }
  };

  return (
    <View>
      {}
      <TextInput
        placeholder="Escribí tu tarea"
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
      />

      {}
      <Text style={styles.subtitulo}>Elegí el color</Text>
      <View style={styles.coloresContenedor}>
        {coloresDisponibles.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorCirculo,
              { backgroundColor: c },
              color === c ? styles.colorSeleccionado : null,
            ]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      {}
      <Button title={tareaEditar ? 'Guardar cambios' : 'Agregar tarea'} onPress={onGuardar} />
      <Button title="Cancelar" color="gray" onPress={cerrarFormulario} />
    </View>
  );
}

// Estilos del formulario
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  subtitulo: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  coloresContenedor: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorCirculo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  colorSeleccionado: {
    borderWidth: 3,
    borderColor: '#000',
  },
});
