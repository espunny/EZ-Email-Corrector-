document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  // Cargar la API key guardada (si existe)
  chrome.storage.local.get('openaiApiKey', function(result) {
    if (result.openaiApiKey) {
      apiKeyInput.value = result.openaiApiKey;
    }
  });

  // Guardar la API key cuando se haga clic en "Guardar"
  saveBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    chrome.storage.local.set({ openaiApiKey: key }, () => {
      status.textContent = 'API Key guardada.';
      setTimeout(() => { status.textContent = ''; }, 2000);
    });
  });
});
