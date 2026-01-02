# AlgebraQuest - Proyecto

## Estructura de Archivos
```
/mnt/okcomputer/output/
├── index.html              # Página principal con el juego
├── tutorial.html           # Página de tutorial
├── avatar.html             # Selector de avatar
├── resources/              # Archivos multimedia
│   ├── coin.mp3           # Sonido de moneda
│   ├── success.mp3        # Sonido de éxito
│   ├── background.mp3     # Música de fondo
│   └── avatar.png         # Imagen del avatar
├── main.js                # Lógica principal del juego
├── design.md              # Documento de diseño
├── interaction.md         # Documento de interacción
└── project.md             # Este archivo
```

## Páginas de la Aplicación

### 1. index.html - Juego Principal
**Contenido**:
- Canvas del juego con todas las interacciones
- Barra de progreso y monedas
- Mascota Mathy
- Sistema de niveles y mundos
- 3 tipos de desafíos interactivos

**Funcionalidades**:
- Generación procedural de problemas matemáticos
- Sistema de puntuación en tiempo real
- Animaciones con Anime.js
- Efectos de sonido con Web Audio API
- LocalStorage para guardar progreso

### 2. tutorial.html - Tutorial Interactivo
**Contenido**:
- Introducción animada al mundo del álgebra
- Explicación de monomios, binomios, trinomios y cuatrinomios
- Mini-juegos de práctica
- Presentación de Mathy el robot

**Funcionalidades**:
- Paso a paso guiado
- Ejemplos interactivos
- Quiz inicial para evaluar conocimiento

### 3. avatar.html - Personalización
**Contenido**:
- Selector de personajes (niño, niña, robot)
- Personalización de colores
- Galería de logros desbloqueables
- Configuración de sonido

**Funcionalidades**:
- Preview en tiempo real
- Guardar preferencias
- Sistema de desbloqueo de items

## Componentes del Juego

### Motor de Matemáticas
- **Generador de Problemas**: Crea expresiones aleatorias según nivel
- **Evaluador**: Verifica respuestas con tolerancia de formato
- **Dificultad Adaptativa**: Ajusta complejidad según rendimiento

### Sistema de Recompensas
- **Monedas**: Animación de acumulación con sonido
- **Medallones**: Badges visuales con efectos de brillo
- **Logros**: Notificaciones emergentes con confeti
- **Tabla de Clasificación**: Top 5 mejores puntuaciones

### Interfaz de Usuario
- **Mapa de Niveles**: Scroll horizontal con mundos temáticos
- **HUD**: Barra de progreso, monedas, nivel actual
- **Animaciones**: Transiciones fluidas entre estados
- **Responsive**: Adaptable a tablets y móviles

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Animaciones y estilos con Tailwind
- **JavaScript ES6+**: Lógica del juego
- **Canvas API**: Renderizado de gráficos
- **Web Audio API**: Efectos de sonido

### Librerías
- **Anime.js**: Animaciones fluidas
- **p5.js**: Efectos visuales y partículas
- **ECharts.js**: Visualización de estadísticas
- **Splide.js**: Carouseles de logros

### Datos y Almacenamiento
- **LocalStorage**: Progreso del jugador
- **JSON**: Configuración de niveles
- **Generación Procedural**: Problemas infinitos

## Flujo de Desarrollo

### Fase 1: Núcleo del Juego
1. Implementar sistema de niveles básico
2. Crear generador de problemas de monomios
3. Añadir sistema de puntuación
4. Implementar feedback visual básico

### Fase 2: Experiencia Visual
1. Diseñar y implementar mundos temáticos
2. Añadir animaciones y efectos de partículas
3. Implementar sistema de sonido
4. Crear mascota animada

### Fase 3: Progresión y Recompensas
1. Sistema de monedas y tienda
2. Logros y tabla de clasificación
3. Desbloqueo de contenido
4. Personalización de avatar

### Fase 4: Contenido Educativo
1. Tutorial interactivo completo
2. Explicaciones paso a paso
3. Sistema de pistas inteligente
4. Adaptación de dificultad

## Métricas de Éxito

### Engagement
- Tiempo promedio de sesión: > 10 minutos
- Tasa de retorno diario: > 60%
- Niveles completados por sesión: > 5

### Aprendizaje
- Mejora en precisión: +20% después de 1 semana
- Velocidad de resolución: -30% en tiempo
- Dominio de conceptos: 80% de respuestas correctas

### Diversión
- Valoración de usuario: > 4.5/5 estrellas
- Comentarios positivos sobre dificultad
- Recomendaciones entre usuarios