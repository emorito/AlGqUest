# AlgebraQuest - Proyecto

## Estructura de Archivos
```
/workspace/AlGqUest/
├── index.html              # Página principal con el juego
├── script.js               # Lógica principal del juego
├── style.css               # Estilos de la UI
├── design.md               # Documento de diseño
├── interaction.md          # Documento de interacción
└── project.md              # Este archivo
```

## Páginas de la Aplicación

### 1. index.html - Juego Principal
**Contenido**:
- Balanza con ecuaciones a resolver
- Indicadores de nivel y puntuación
- Zona de soltar para la respuesta
- Opciones arrastrables para elegir el valor de X

**Funcionalidades**:
- Generación procedural de problemas matemáticos
- Sistema de puntuación en tiempo real
- Drag & drop para responder

## Componentes del Juego

### Motor de Matemáticas
- **Generador de Problemas**: Crea expresiones aleatorias según nivel
- **Evaluador**: Verifica respuestas con tolerancia de formato
- **Dificultad Adaptativa**: Ajusta complejidad según rendimiento

### Sistema de Recompensas
- **Puntuación**: Incrementa con cada respuesta correcta
- **Niveles**: Avanza al resolver cada misión

### Interfaz de Usuario
- **HUD**: Nivel y puntuación actual
- **Balanza**: Indicador visual del estado correcto/incorrecto
- **Feedback**: Mensajes de acierto y error

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Animaciones y estilos básicos
- **JavaScript ES6+**: Lógica del juego

### Librerías
- (Sin dependencias externas)

### Datos y Almacenamiento
- **Generación Procedural**: Problemas infinitos

## Estado Actual
- Juego de ecuaciones simple con drag & drop.
- Sin dependencias externas ni almacenamiento persistente.
