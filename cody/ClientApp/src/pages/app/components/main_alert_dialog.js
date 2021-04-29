import React from 'react';
import Requests from 'src/lib/server_calls/requests';

import { AlertDialog } from 'src/components/dialogs/alert_dialog';
import { PageController } from 'src/lib/page_controller';

import PanToolRoundedIcon from '@material-ui/icons/PanToolRounded';
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import CloudOffRoundedIcon from '@material-ui/icons/CloudOffRounded';
import ZoomOutMapRoundedIcon from '@material-ui/icons/ZoomOutMapRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';

import { Error } from 'src/components/illustrations/error';
import { Error404 } from 'src/components/illustrations/error404';
import { Sad } from 'src/components/illustrations/sad';
import { NetworkError } from 'src/components/illustrations/network_error';

import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import { AlertDialogItem } from 'src/components/alert_dialog_item'

export function MainAlertDialog(){
  const [currentError, setCurrentError] = React.useState("")

  Requests.onError = (reason) => {
    if (process.env.NODE_ENV === 'development') {
      window.alert(reason);
    }
    else {
      setCurrentError(reason);
    }
  };

  const errorInfos = {
    serverError: { 
      icon: <CloudOffRoundedIcon/>, 
      title: "Sembra che il server abbia riscontrato un problema",
      illustration: NetworkError,
      description: `
        Cercheremo di risolvere il problema il prima possibile, 
        intanto puoi provare a ricaricare la pagina
      `,
    },
    sizeTooBig: { 
      icon: <ZoomOutMapRoundedIcon/>, 
      title: "Le dimensioni del file sono troppo grandi",
      illustration: Error,
      description: `
        Prova a caricare un file di dimensioni più piccole
      `,
    },
    unauthorized: { 
      icon: <PanToolRoundedIcon/>, 
      title: "Non sei autorizzato ad accedere a questo contenuto",
      illustration: Sad,
      description: `
        Prova a loggarti con un account con privilegi più elevati
      `,
    },
    badRequest: { 
      icon: <RemoveCircleOutlineRoundedIcon/>, 
      title: "Richiesta non valida",
      illustration: Error,
      description: ``,
    },
    notFound: { 
      icon: <FindInPageRoundedIcon/>, 
      title: "Non trovato",
      illustration: Error404,
      description: `
        La risorsa che hai richiesto non è stata trovata
      `,
    },
    networkError: { 
      icon: <WifiOffRoundedIcon/>, 
      title: "Si è verificato un errore di rete",
      illustration: NetworkError,
      description: `
        Probabilmente sei offline, prova a ricaricare la pagina
      `,
    },
    genericError: { 
      icon: <ErrorRoundedIcon/>, 
      title: "Si è verificato un errore",
      illustration: Error,
      description: `
        Scusa, questo non sarebbe dovuto succedere ＞﹏＜
      `,
    },
  };

  const errorInfo = errorInfos[currentError];

  return (
    <AlertDialog
      open={errorInfo !== undefined}
      illustration={errorInfo?.illustration}
      onClose={() => {
        setCurrentError("");
        PageController.refresh();
      }}
      title={errorInfo?.title}
      buttonLabel="Ricarica la pagina"
    >
      <AlertDialogItem
        icon = {errorInfo?.icon}
        label = {errorInfo?.description}
      />
    </AlertDialog> 
  )
}