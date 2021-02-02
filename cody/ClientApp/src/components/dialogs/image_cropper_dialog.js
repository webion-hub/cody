import React, { Component } from 'react';
import Cropper from 'react-easy-crop'

import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { DialogBase } from 'src/components/bases/dialog_base';

export class ImageCropperDialog extends Component {
    constructor(props){
      super(props)
  
      this.state = {
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 1,
        maxSize: 150,
        croppedImage: null,
        croppedAreaPixels: null,
      }
    }
   
    onCropChange = (crop) => {
      this.setState({ crop })
    }
   
    onCropComplete = (croppedArea, croppedAreaPixels) => {    
      this.setState({croppedAreaPixels: croppedAreaPixels})
    }
  
    onSubmit = () => {
      const smallerSide = this.state.croppedAreaPixels.width < this.state.croppedAreaPixels.height ?
        this.state.croppedAreaPixels.height :
        this.state.croppedAreaPixels.width;
  
      let ratio = smallerSide / this.state.maxSize;
      ratio = ratio > 1 ? ratio : 1;
  
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      ctx.canvas.width  = this.state.croppedAreaPixels.width/ratio;
      ctx.canvas.height = this.state.croppedAreaPixels.height/ratio;
  
      const image = new Image();
      image.src = this.props.image;
  
      ctx.drawImage(
        image, 
        this.state.croppedAreaPixels.x,
        this.state.croppedAreaPixels.y,
        this.state.croppedAreaPixels.width*ratio,
        this.state.croppedAreaPixels.height*ratio,
        0,
        0,
        this.state.croppedAreaPixels.width,
        this.state.croppedAreaPixels.height,     
      );
  
      const {croppedImage} = this.props;
      const reader = new FileReader()
      canvas.toBlob(blob => {
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            croppedImage(reader.result); 
            this.setState({croppedImage: reader.result})
          }
      })
  
      this.props.handleClose();
    }
   
    onZoomChange = (zoom) => {
      this.setState({ zoom })
    }
   
    render() {
      return (
        <DialogBase
          title="Modifica l'immagine"
          open={this.props.open}
          onClose={this.props.handleClose}
          firstButton={
            <Button 
              onClick={this.props.handleClose}
              color="secondary"
            >
              Chiudi
            </Button>
          }
          secondButton={
            <Button 
              onClick={this.onSubmit}
              variant="contained"
              color="primary"
            >
              Conferma
            </Button>
          }
        >
          <Box
            width={500}
            height={500}
            position="relative"
          >
            <Cropper        
              image={this.props.image}
              crop={this.state.crop}
              cropShape="round"
              showGrid={false}
              zoom={this.state.zoom}
              aspect={this.state.aspect}
              onCropChange={this.onCropChange}
              onCropComplete={this.onCropComplete}
              onZoomChange={this.onZoomChange}
            />
          </Box>
        </DialogBase>
      )
    }
  }