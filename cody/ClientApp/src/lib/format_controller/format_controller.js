import { EmailController } from "src/lib/format_controller/controllers/email_controller";
import { BirthDateController } from "src/lib/format_controller/controllers/birth_date_controller";
import { PasswordController } from "src/lib/format_controller/controllers/password_controller";
import { TermsAndServiceController } from "./controllers/terms_and_service_controller";
import { UsernameController } from "./controllers/username_controller";
import { NameSurnameController } from "./controllers/name_surname_controller";
import { OrganizationNameController } from "./controllers/organization_name_controller";
import { LocationController } from "./controllers/loaction_controller";
import { DescriptionController } from "./controllers/description_controller";
import { WebsiteController } from "./controllers/website_controller";

export class FormatController {
  constructor(controllers){
    this.controllersLabel = controllers;
    this.skippableControllers = []
    this.errorsList = [];
  }

  static setController(){
    return new FormatController([])
  }

  insertError = (error) => {
    if(error === undefined)
      return

    this.errorsList.push(error);
  }

  /**
   * @param {Controllers} controller 
   */
  add(controller, skippable = false){
    this.controllersLabel
      .push({
        controller,
        skippable,
      });

    return new FormatController(this.controllersLabel);
  }

  getController(controllerLabel){
    const controller = {
      'email':            EmailController,
      'password':         PasswordController,
      'username':         UsernameController,
      'name':             NameSurnameController.setType('name'),
      'surname':          NameSurnameController.setType('surname'),
      'birthDate':        BirthDateController,
      'termsAndService':  TermsAndServiceController,
      'organizationName': OrganizationNameController,
      'location':         LocationController,
      'description':      DescriptionController,
      'website':          WebsiteController
    }[controllerLabel]

    return controller
  }

  getControllersList(values){
    let controllers = []
    
    this.controllersLabel
      .forEach(controller => {
        const valueController =
          this.getController(controller.controller)
            .check(values, controller.skippable)
            .then(this.insertError)

        controllers.push(valueController)        
      });

    return controllers;
  }

  getErrorObject = () => {
    let errorsFromController = {};

    this.errorsList.forEach(result => {
      errorsFromController[result] = true;
    });

    return errorsFromController
  }

  checkAll(settings){
    const values = settings?.values;
    const onErrors = settings?.onErrors;
    const onNoErrors = settings?.onNoErrors;

    return new Promise(async resolve => {
      const controllers = this.getControllersList(values)
      await Promise.all(controllers)
        .then(_ => {
          const noError = this.errorsList.length === 0
          if(noError){
            onNoErrors?.()
            return;
          }

          const errors = this.getErrorObject()
          onErrors?.(errors)
        })
        
      resolve()
    })
  }    
}

  
/**
 * @typedef {(
 *  'email' | 
 *  'password' |
 *  'username' |
 *  'name' |
 *  'surname' |
 *  'birthDate' |
 *  'description' |
 *  'organizationName' |
 *  'website' |
 *  'location' |
 *  'termsAndService'
 * )} Controllers
 */