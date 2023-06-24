let deferredPrompt; // Saves the event to be used later

const butInstall = document.getElementById('buttonInstall');

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  
  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Update UI notify the user they can install the PWA
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Hide install button, it can't be called twice.
  butInstall.style.display = 'none';
  
  // Show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Optionally, send analytics event with outcome of install prompt.
    console.log(`User response to the install prompt: ${outcome}`);

    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
  } else {
    console.log('Install prompt not available yet.');
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully!');
});