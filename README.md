# Sistema de Gestión de Proyectos Colaborativos (SGPC)

Sistema para la gestión de proyectos y tareas colaborativas desarrollado con Spring Boot.

## Requisitos Previos

- Java JDK 17
- Maven
- IDE compatible con Spring Boot (recomendado: VS Code, IntelliJ IDEA, Eclipse)

## Tecnologías Utilizadas

- Spring Boot 3.5.7
- Spring Data JPA
- Spring Security
- H2 Database (Base de datos en memoria)
- Lombok
- Maven

## Estructura del Proyecto

El proyecto está organizado en los siguientes paquetes y archivos principales (versión actual en el repositorio):

```
src/
├─ main/
│  ├─ java/
│  │  ├─ dev/
│  │  │  ├─ austre/
│  │  │  │  ├─ SGPCApplication.java
│  │  │  │  └─ sgpc/
│  │  │  │     ├─ models/
│  │  │  │     │  ├─ ProyectoModel.java
│  │  │  │     │  ├─ TareaModel.java
│  │  │  │     │  ├─ ComentarioModel.java
│  │  │  │     │  ├─ UsuarioModel.java
│  │  │  │     │  ├─ RolModel.java
│  │  │  │     │  └─ AdjuntoModel.java
│  │  │  │     ├─ repositories/
│  │  │  │     │  ├─ ProyectoRepository.java
│  │  │  │     │  ├─ TareaRepository.java
│  │  │  │     │  ├─ ComentarioRepository.java
│  │  │  │     │  ├─ UsuarioRepository.java
│  │  │  │     │  ├─ RolRepository.java
│  │  │  │     │  └─ AdjuntoRepository.java
│  │  │  │     ├─ services/
│  │  │  │     │  ├─ ProyectoService.java
│  │  │  │     │  ├─ TareaService.java
│  │  │  │     │  ├─ ComentarioService.java
│  │  │  │     │  ├─ UsuarioService.java
│  │  │  │     │  ├─ RolService.java
│  │  │  │     │  ├─ AdjuntoService.java
│  │  │  │     │  └─ impl/
│  │  │  │     │     ├─ ProyectoServiceImpl.java
│  │  │  │     │     ├─ TareaServiceImpl.java
│  │  │  │     │     ├─ ComentarioServiceImpl.java
│  │  │  │     │     ├─ UsuarioServiceImpl.java
│  │  │  │     │     ├─ RolServiceImpl.java
│  │  │  │     │     └─ AdjuntoServiceImpl.java
│  │  │  │     └─ controllers/
│  │  │  │        ├─ ProyectoController.java
│  │  │  │        ├─ TareaController.java
│  │  │  │        ├─ ComentarioController.java
│  │  │  │        ├─ UsuarioController.java
│  │  │  │        ├─ RolController.java
│  │  │  │        └─ AdjuntoController.java
│  └─ resources/
│     ├─ application.properties
│     └─ (otros recursos estáticos o plantillas si aplica)
└─ pom.xml
```

## Entidades Principales

- **Proyecto**: Gestión de proyectos con sus tareas asociadas
- **Tarea**: Actividades específicas dentro de un proyecto
- **Comentario**: Comentarios asociados a las tareas
- **Usuario**: Gestión de usuarios del sistema
- **Rol**: Roles y permisos de usuarios
- **Adjunto**: Archivos adjuntos asociados a tareas o proyectos

## Configuración y Ejecución

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd SGPC
```

2. Compilar el proyecto:
```bash
mvn clean install
```

3. Ejecutar la aplicación:
```bash
mvn spring-boot:run
```

La aplicación estará disponible en `http://localhost:8080`

## Base de Datos

El proyecto utiliza H2 como base de datos en memoria para desarrollo. 
Puedes acceder a la consola H2 en: `http://localhost:8080/h2-console`

Credenciales por defecto:
- JDBC URL: `jdbc:h2:mem:sgpcdb`
- Usuario: `sa`
- Contraseña: ` ` (vacía)

## Características Principales

- Gestión de proyectos y tareas
- Sistema de comentarios
- Gestión de usuarios y roles
- Subida y descarga de archivos adjuntos
- Seguimiento de estados de tareas
- Control de fechas límite

## Contribución

Si deseas contribuir al proyecto:

1. Crea un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## Licencia

[Especificar la licencia del proyecto]