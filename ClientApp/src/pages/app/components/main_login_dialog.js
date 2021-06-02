import React from 'react';

import { LoginDialog } from 'src/components/dialogs/login_dialog';
import { useListener } from 'src/lib/hooks/use_listener';
import { EventsDispatcher } from 'src/lib/events_dispatcher';

export default function MainLoginDialog(){
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true)
  }

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false)
  }

	useListener({
		eventFunction: handleOpenLoginDialog,
		controller: EventsDispatcher.setEvent('openLoginDialog'),
    removeFirstExecution: true,
  }, [])
  
  return (
    <LoginDialog
      open={openLoginDialog}
      onClose={handleCloseLoginDialog}
      onSuccess={handleCloseLoginDialog}      
    /> 
  )
}