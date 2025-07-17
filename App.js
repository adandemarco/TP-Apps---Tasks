import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import FormularioTarea from './components/FormularioTarea';
import ListaTareas from './components/ListaTareas';

export default function App() {
  // Estado que guarda todas las tareas
  const [tareas, setTareas] = useState([]);

  // Controla si se muestra el modal (formulario)
  const [modalVisible, setModalVisible] = useState(false);

  // Guarda temporalmente una tarea si está siendo editada
  const [tareaEditar, setTareaEditar] = useState(null);

  // Agrega una nueva tarea
  const agregarTarea = (texto, color) => {
    if (texto.trim() === '') {
      Alert.alert('Error', 'La tarea no puede estar vacía');
      return;
    }
    const nuevaTarea = {
      id: Date.now().toString(), // Genera un ID único
      texto,
      color,
    };
    setTareas([...tareas, nuevaTarea]);
    setModalVisible(false); // Cierra el modal
  };

  // Elimina una tarea por ID
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  // Edita una tarea ya existente
  const editarTarea = (id, nuevoTexto, nuevoColor) => {
    setTareas(
      tareas.map(t =>
        t.id === id ? { ...t, texto: nuevoTexto, color: nuevoColor } : t
      )
    );
    setModalVisible(false);
    setTareaEditar(null);
  };

  // Abre el formulario con los datos de la tarea a editar
  const abrirEditar = (tarea) => {
    setTareaEditar(tarea);
    setModalVisible(true);
  };

  // Cierra el modal y limpia la tarea en edición
  const cerrarFormulario = () => {
    setModalVisible(false);
    setTareaEditar(null);
  };

  return (
    <View style={estilos.contenedor}>
      {/* Logo */}
      <Image source={require('./assets/logo.png')} style={estilos.logo} />

      {/* Título de la app */}
      <Text style={estilos.titulo}>Administrador de Tareas</Text>

      {/* Lista de tareas */}
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListaTareas
            tarea={item}
            eliminarTarea={eliminarTarea}
            abrirEditar={abrirEditar}
          />
        )}
        ListEmptyComponent={<Text style={estilos.sinTareas}>No hay tareas aún</Text>}
      />

      {/* Modal que muestra el formulario */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={estilos.modalFondo}>
          <View style={estilos.modalContenedor}>
            <FormularioTarea
              agregarTarea={agregarTarea}
              tareaEditar={tareaEditar}
              editarTarea={editarTarea}
              cerrarFormulario={cerrarFormulario}
            />
          </View>
        </View>
      </Modal>

      {/* Botón flotante para agregar tarea */}
      <TouchableOpacity
        style={estilos.botonFlotante}
        onPress={() => {
          setTareaEditar(null); // Limpia edición
          setModalVisible(true); // Abre modal
        }}
      >
        <Text style={estilos.botonFlotanteTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos de la app
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: 20,
    textAlign: 'center',
  },
  sinTareas: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#555',
    fontStyle: 'italic',
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1a73e8',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  botonFlotanteTexto: {
    color: 'white',
    fontSize: 36,
    lineHeight: 38,
    fontWeight: 'bold',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContenedor: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    borderRadius: 12,
    elevation: 10,
  },
});