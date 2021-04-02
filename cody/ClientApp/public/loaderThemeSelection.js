function loaderThemeSelection()
{
  let root = document.documentElement;
  if(localStorage.getItem('Cody-ThemeMode') == 'dark')
  {
    root.style.setProperty('--ring-inner-color', "#131C2A");
    root.style.setProperty('--ring-outer-color', "#1F4BFF");
    root.style.setProperty('--background-color', "#172230");
  }

  if(localStorage.getItem('Cody-ThemeMode') == 'light')
  {
    root.style.setProperty('--ring-inner-color', "#f3f3f3");
    root.style.setProperty('--ring-outer-color', "#1F4BFF");
    root.style.setProperty('--background-color', "#f7f7f8");
  }
}