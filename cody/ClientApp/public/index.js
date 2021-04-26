function init() {
  loadThemeColors();
  initEventHandlers();

  window.addEventListener('load', () => {
    loadIllustrations();
  });
}


function initEventHandlers() {
  const reload = () => {
    window.location.reload();
  };

  window.addEventListener('themeUpdated', loadThemeColors);
  window.addEventListener('online', reload);
  document.addEventListener('reactDomLoaded', () => {
    window.removeEventListener('online', reload);
  });
}


function loadThemeColors() {
  const theme = localStorage.getItem('Cody-ThemeMode');
  const root = document.documentElement;
  
  if(theme === 'dark') {
    root.style.setProperty('--ring-inner-color', '#131C2A');
    root.style.setProperty('--ring-outer-color', '#1F4BFF');
    root.style.setProperty('--background-color', '#172230');
    root.style.setProperty('--offline-alert-color', 'white');
  }
  else if(theme === 'light') {
    root.style.setProperty('--ring-inner-color', '#f3f3f3');
    root.style.setProperty('--ring-outer-color', '#1F4BFF');
    root.style.setProperty('--background-color', '#f7f7f8');
    root.style.setProperty('--offline-alert-color', 'black');
  }
}


function loadIllustrations() {
  const illustrations = 
    document.querySelectorAll('.illustration[data-path]');

  illustrations.forEach((illustration) => {
    const path = illustration.getAttribute('data-path');
    fetch(path)
      .then(r => r.text())
      .then(t => illustration.innerHTML = t);
  });
}


function reloadPage() {
  const isErrorPage = location.href.match('/error/');
  if (isErrorPage) {
    location.href = '/';
  }
  else {
    location.reload();
  }
}