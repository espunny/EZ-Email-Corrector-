console.log("Universal Email Corrector on Blur extension loaded.");

let openaiApiKey = "";

// Cargar la API key desde chrome.storage al iniciar el content script
chrome.storage.local.get('openaiApiKey', function(result) {
  if (result.openaiApiKey) {
    openaiApiKey = result.openaiApiKey;
    console.log("OpenAI API Key cargada desde opciones.");
  } else {
    console.warn("No se encontró API Key. Configúrala en la página de opciones.");
  }
});

// Función para determinar si una cadena tiene pinta de ser un correo (búsqueda simple de "@" y ".")
function isEmailLike(str) {
  return str.includes("@") && str.includes(".");
}

// Función que llama a la API de OpenAI para corregir el email.
function correctEmail(originalEmail) {
  console.log("Intentando corregir email:", originalEmail);
  const prompt = `Corrige la siguiente dirección de correo si es incorrecta, y si es correcta, repítela exactamente: "${originalEmail}"`;
  const data = {
    model: "gpt-4o-mini", // O puedes cambiar a "gpt-3.5-turbo"
    messages: [
      { role: "user", content: prompt }
    ]
  };

  // Si no hay API key, aborta la llamada
  if (!openaiApiKey) {
    console.error("No hay API Key configurada.");
    return Promise.resolve(originalEmail);
  }

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log("Respuesta de OpenAI, estado:", response.status);
      return response.json();
    })
    .then(result => {
      console.log("Respuesta completa de OpenAI:", result);
      const content = result?.choices?.[0]?.message?.content;
      if (content) {
        // Extraer el correo usando una expresión regular.
        const match = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (match && match[0]) {
          console.log("Email corregido extraído:", match[0]);
          return match[0];
        }
      }
      console.log("No se encontró un email corregido, se usará el original.");
      return originalEmail;
    })
    .catch(error => {
      console.error("Error al corregir el email:", error);
      return originalEmail;
    });
}

// Función para adjuntar el listener de "blur" a un campo (input o textarea)
function attachBlurListener(field) {
  if (field.hasAttribute("data-email-corrector-attached")) return;
  field.setAttribute("data-email-corrector-attached", "true");

  field.addEventListener("blur", async function() {
    const val = field.value.trim();
    console.log("Blur en campo:", field, "Valor:", val);
    if (val && isEmailLike(val)) {
      console.log("El valor parece ser un email. Intentando corrección...");
      const corrected = await correctEmail(val);
      console.log("Email corregido:", corrected);
      field.value = corrected;
    }
  });
}

// Adjuntar listeners a todos los campos de entrada y áreas de texto
function attachListenersToFields() {
  const fields = document.querySelectorAll("input, textarea");
  fields.forEach(field => attachBlurListener(field));
}

attachListenersToFields();

// Observar cambios en el DOM para detectar nuevos campos añadidos dinámicamente
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.matches("input, textarea")) {
          attachBlurListener(node);
        }
        if (node.querySelectorAll) {
          node.querySelectorAll("input, textarea").forEach(field => attachBlurListener(field));
        }
      }
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true });
