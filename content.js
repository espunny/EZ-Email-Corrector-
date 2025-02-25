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

// Función para corregir el dominio (la parte a la derecha de la arroba)
function correctDomain(domain) {
  console.log("Intentando corregir dominio:", domain);
  const prompt = `Corrige el siguiente dominio de correo si es incorrecto, y si es correcto, repítelo exactamente: "${domain}"`;
  const data = {
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ]
  };

  if (!openaiApiKey) {
    console.error("No hay API Key configurada.");
    return Promise.resolve(domain);
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
        // Extraer el dominio usando una expresión regular.
        const match = content.match(/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (match && match[0]) {
          console.log("Dominio corregido extraído:", match[0]);
          return match[0];
        }
      }
      console.log("No se encontró un dominio corregido, se usará el original.");
      return domain;
    })
    .catch(error => {
      console.error("Error al corregir el dominio:", error);
      return domain;
    });
}

// Función (mantener en caso de requerir correcciones totales de email)
function correctEmail(originalEmail) {
  console.log("Intentando corregir email:", originalEmail);
  const prompt = 'Corrige el dominio de la siguiente dirección de correo si es incorrecta, y si es correcta, repítela exactamente: "${originalEmail}"';
  const data = {
    model: "gpt-4o-mini", // O puedes cambiar a "gpt-3.5-turbo"
    messages: [
      { role: "user", content: prompt }
    ]
  };

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
    const originalValue = field.value;
    // Buscar la primera ocurrencia de una dirección de correo en el texto.
    const emailMatch = originalValue.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      const emailCandidate = emailMatch[0];
      console.log("Email encontrado:", emailCandidate);
      // Dividir el email en nombre de usuario y dominio.
      const parts = emailCandidate.split('@');
      if (parts.length === 2) {
        const username = parts[0];
        const domainCandidate = parts[1];
        const correctedDomain = await correctDomain(domainCandidate);
        const correctedEmail = username + "@" + correctedDomain;
        console.log("Email corregido:", correctedEmail);
        // Reemplazar únicamente el email encontrado en el texto original.
        field.value = originalValue.replace(emailCandidate, correctedEmail);
      }
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
