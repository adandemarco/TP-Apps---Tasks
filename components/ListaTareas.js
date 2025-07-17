import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ListaTareas({ tarea, eliminarTarea, abrirEditar }) {
  return (
    // Contenedor de una tarea con color de fondo
    <View style={[styles.tareaContenedor, { backgroundColor: tarea.color }]}>
      {/* Texto de la tarea */}
      <Text style={styles.textoTarea}>{tarea.texto}</Text>

      {/* Botones de edición y eliminación */}
      <View style={styles.botones}>
        <TouchableOpacity onPress={() => abrirEditar(tarea)} style={styles.botonEditar}>
          <Text style={styles.textoBoton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarTarea(tarea.id)} style={styles.botonEliminar}>
          <Text style={styles.textoBoton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos del componente de tarea
const styles = StyleSheet.create({
  tareaContenedor: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  textoTarea: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  botonEditar: {
    marginRight: 15,
  },
  botonEliminar: {},
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});