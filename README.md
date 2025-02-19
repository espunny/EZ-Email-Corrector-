# EZ Email Corrector +

## Versión en Español

EZ Email Corrector + es una extensión de Chrome de código abierto que utiliza inteligencia artificial para corregir automáticamente errores tipográficos en direcciones de correo electrónico. La extensión interviene en tiempo real en cualquier campo de entrada (inputs o textareas) que contenga lo que parezca una dirección de correo, garantizando que los correos ingresados sean correctos y evitando problemas de comunicación.

### Características principales

- **Corrección Automática:** Analiza y corrige direcciones de correo electrónico al perder el foco del campo, incluso en formularios complejos.
- **Tecnología de OpenAI:** Se apoya en la potencia de la inteligencia artificial de OpenAI para realizar correcciones precisas.
- **Configuración Personalizada:** Incluye una página de opciones donde puedes ingresar tu propia clave API de OpenAI, asegurando que la extensión funcione únicamente con tus credenciales y manteniendo la seguridad de la API.
- **Código Abierto:** Publicado bajo la Licencia MIT, lo que permite a la comunidad usar, modificar y mejorar el proyecto, siempre reconociendo al autor original.

### Cómo funciona

1. **Detección de posibles errores:**  
   Al perder el foco (*blur*) en cualquier campo de entrada, la extensión evalúa el contenido. Si detecta que el valor contiene los caracteres "@" y ".", lo considera como un posible correo electrónico.

2. **Intervención mediante IA:**  
   Aunque el formato básico pueda ser correcto, a menudo se producen errores tipográficos (por ejemplo, escribir "gmali" en lugar de "gmail"). La extensión envía el correo introducido a la API de OpenAI junto con un prompt que indica:  
   > “Corrige la dirección de correo si es incorrecta, y si es correcta, repítela exactamente.”  
   OpenAI analiza el correo y devuelve la versión corregida (o la misma si no hay errores).

3. **Actualización del campo:**  
   Una vez que la extensión recibe la respuesta, actualiza el valor del campo con la dirección corregida, ayudando a evitar problemas de entrega o comunicaciones fallidas debido a errores tipográficos.

### ¿Por qué es necesario intervenir?

- **Errores comunes de tipeo:**  
  Incluso pequeños errores, como escribir "gmali" en lugar de "gmail", pueden impedir la entrega correcta de los mensajes, generando frustración y problemas de comunicación, especialmente en contextos profesionales.

- **Ahorro de tiempo y reducción de errores:**  
  La corrección automática evita que el usuario tenga que revisar manualmente cada dirección, actuando como un asistente inteligente que mejora la precisión de los datos ingresados.

- **Mejora en la comunicación:**  
  Asegurar que las direcciones de correo sean correctas es esencial para mantener una comunicación fluida. Corregir errores en tiempo real reduce la posibilidad de que los mensajes se pierdan o se envíen a direcciones equivocadas.

### Requisitos

- **Clave API de OpenAI:**  
  Es imprescindible disponer de una clave API de OpenAI para que la extensión funcione. Puedes obtener una registrándote en [OpenAI](https://openai.com/). Una vez obtenida, ingresa tu clave en la página de opciones de la extensión.

### Uso

1. Instala la extensión en tu navegador (modo desarrollador).
2. Abre la página de opciones y configura tu clave API de OpenAI.
3. La extensión corregirá automáticamente cualquier dirección de correo que parezca contener errores al perder el foco del campo.

### Contribuciones

¡Contribuciones y mejoras son siempre bienvenidas! Si encuentras algún problema o tienes sugerencias, no dudes en abrir un **issue** o enviar un **pull request**.

---

## English Version

EZ Email Corrector + is an open-source Chrome extension that uses artificial intelligence to automatically correct typographical errors in email addresses. The extension works in real-time on any input field (inputs or textareas) that appears to contain an email address, ensuring that the entered email addresses are correct and preventing communication issues.

### Key Features

- **Automatic Correction:** Analyzes and corrects email addresses when an input field loses focus, even in complex forms.
- **Powered by OpenAI:** Leverages the power of OpenAI's artificial intelligence to provide accurate corrections.
- **Customizable Settings:** Includes an options page where you can enter your own OpenAI API key, ensuring that the extension works only with your credentials while keeping the API secure.
- **Open Source:** Released under the MIT License, allowing the community to use, modify, and improve the project, while always giving proper credit to the original author.

### How It Works

1. **Detection of Potential Errors:**  
   When an input field loses focus (*blur*), the extension evaluates its content. If it detects that the value contains the "@" and "." characters, it considers it a potential email address.

2. **Intervention via AI:**  
   Although the basic format may appear correct, typographical errors (for example, writing "gmali" instead of "gmail") are common. The extension sends the entered email address to the OpenAI API along with a prompt that states:  
   > “Correct the email address if it is incorrect, and if it is correct, repeat it exactly.”  
   OpenAI analyzes the email and returns the corrected version (or the same one if no errors are found).

3. **Field Update:**  
   Once the extension receives the response, it updates the field with the corrected email address, helping to avoid delivery issues or failed communications due to typos.

### Why Intervention Is Necessary

- **Common Typographical Errors:**  
  Even minor mistakes, such as writing "gmali" instead of "gmail", can prevent emails from being delivered correctly, causing frustration and communication issues, especially in professional contexts.

- **Time Saving and Error Reduction:**  
  Automatic correction prevents the user from having to manually review each email address, acting as an intelligent assistant that improves the accuracy of entered data.

- **Enhanced Communication:**  
  Ensuring that email addresses are correct is essential for maintaining smooth communication. Real-time correction reduces the likelihood of messages being lost or sent to incorrect addresses.

### Requirements

- **OpenAI API Key:**  
  An OpenAI API key is required for the extension to function. You can obtain one by registering at [OpenAI](https://openai.com/). Once obtained, enter your key on the extension's options page.

### Usage

1. Install the extension in your browser (dev mode).
2. Open the options page and configure your OpenAI API key.
3. The extension will automatically correct any email address that appears to contain errors when the input field loses focus.

### Contributions

Contributions and improvements are always welcome! If you encounter any issues or have suggestions, please feel free to open an **issue** or submit a **pull request**.
