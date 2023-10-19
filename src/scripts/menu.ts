const attachMenuListener = () => {
  const menuElement = document.querySelector('.mobile-menu')
  const menuButton = document.querySelector('.mobile-menu-button')

  if (menuElement && menuButton) {
    menuButton.addEventListener('click', () => {
      console.log('clicked')
      menuElement.classList.toggle('open')
    })
  }

}

attachMenuListener()

export {}

