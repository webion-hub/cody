import React, { Component } from 'react';
import Cropper from 'react-easy-crop'

import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Slider } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';

import { DialogBase } from 'src/components/bases/dialog_base';

const ResponsiveBox = withStyles((theme) => ({
  root: {
    width: 500,
    height: 500,
    [theme.breakpoints.down('lg')]: {
      width: "30vw",
      height: "30vw",
    },
    [theme.breakpoints.down('md')]: {
      width: "35vw",
      height: "35vw",
    },
    [theme.breakpoints.down('sm')]: {
      width: "40vw",
      height: "40vw",
    },
    [theme.breakpoints.down('xs')]: {
      width: "60vw",
      height: "60vw",
    },
  },
}))(Box);

export class ImageCropperDialog extends Component {
  constructor(props){
    super(props)

    this.state = {
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: this.props.aspect,
      maxSize: this.props.maxSize,
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

    const reader = new FileReader()
    canvas.toBlob(blob => {
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          this.props.onCroppedImage(reader.result)
          this.setState({croppedImage: reader.result})
        }
    })

    this.props.handleClose();
  }
  
  onZoomChange = (zoom) => {
    this.setState({ zoom });
  }
  handleSliderChange = (event, newValue) => {
    this.setState({ zoom: (newValue/100)*2 + 1 });
  };
  
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
        <ResponsiveBox
          width={500}
          height={500}
          position="relative"
        >
          <Cropper        
            image={this.props.image}
            crop={this.state.crop}
            cropShape={this.props.cropShape}
            showGrid={false}
            zoom={this.state.zoom}
            aspect={this.state.aspect}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
            style={{
              containerStyle: {
                borderRadius: 25,
              },
            }}
          />
        </ResponsiveBox>
        <Box mt={2}>
          <Slider 
            value={100*(this.state.zoom - 1)/2}
            onChange={this.handleSliderChange}
            color="secondary"
            aria-labelledby="zoom"
          />
        </Box>
      </DialogBase>
    )
  }
}

ImageCropperDialog.defaultProps = {
  aspect: 1,
  maxSize: 150,
  cropShape: "round"
}