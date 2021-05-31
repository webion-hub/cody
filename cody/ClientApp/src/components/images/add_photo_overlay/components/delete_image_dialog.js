import { Button } from '@material-ui/core';
import { DialogBase } from 'src/components/bases/others/dialog_base';

export function DeleteImageDialog(props){   
  return (
    <DialogBase
      centeredButtons
      titleAlign="center"
      title="Sei sicuro di eliminare l'immagine?"
      open={props.open}
      onClose={props.onClose}
      firstButton={
        <Button
          color="secondary"
          onClick={props.onClose}
        >
          Chiudi
        </Button>   
      }
      secondButton={
        <Button
          color="primary"
          variant="contained"
          onClick={props.onImageDelete}
        >
          Elimina
        </Button>       
      }
    />
  )
}