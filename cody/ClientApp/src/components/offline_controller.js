import React, { useEffect } from 'react';
import { PageController } from 'src/lib/page_controller';

import OfflinePage from 'src/pages/message_pages/OfflinePage';
import { SnackbarAlert } from 'src/components/snackbar_alert';


export function OfflineController(props){
  const [openSnackBar, setOpenSnackBar] = React.useState(false)
  const [isOffline, setIsOffline] = React.useState(false)
  const [showOfflinePage, setShowOfflinePage] = React.useState(false)
  
  const unListen = PageController.listen(_=> {
    if(isOffline)
      setShowOfflinePage(true)
  })

  useEffect(() => {
		const reactDomLoaded = new CustomEvent('reactDomLoaded');
		document.dispatchEvent(reactDomLoaded)
  }, [])

  window.addEventListener('offline', _=> {
    setIsOffline(true)
    setOpenSnackBar(true)
  });

  window.addEventListener('online', _=> {
    unListen()
    setIsOffline(false)
    setShowOfflinePage(false)
    setOpenSnackBar(true)
  });


  return (
    <>
      <SnackbarAlert open={openSnackBar} onClose={() => setOpenSnackBar(false)} severity={isOffline ? "error" : "success"}>
        {isOffline ? "Sei offline" : "Sei di nuovo online"}
      </SnackbarAlert>
      {showOfflinePage ? <OfflinePage/> : props.children}
    </>
  )
}