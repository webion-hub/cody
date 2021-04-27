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

  insertError = (error) => {
    if(error === undefined)
      return

    this.errorsList.push(error);
  }

  addController = (controller, skippable) => {
    this.controllersLabel
      .push({
        controller,
        skippable,
      });
  }

  getController = (controllerLabel) => {
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

  getControllersList = (values) => {
    return this.controllersLabel
      .map(controller => 
        this.getController(controller.controller)
          .check(values, controller.skippable)
          .then(this.insertError)
      );
  }

  getErrorObject = () => {
    let errorsFromController = {};

    this.errorsList.forEach(result => {
      errorsFromController[result] = true;
    });

    return errorsFromController
  }

  static setController = () => {
    return new FormatController([])
  }

  /**
   * @param {Controllers} controller 
   */
   add = (controller, skippable = false) => {
    this.addController(controller, skippable);

    return new FormatController(this.controllersLabel);
  }

  /**
   * @param {Controllers} controller 
   */
  addIf = (controller, condition, skippable = false) => {
    if(condition)
      this.addController(controller, skippable);

    return new FormatController(this.controllersLabel);
  }

  checkAll = (settings) => {
    const values = settings?.values;
    const onErrors = settings?.onErrors;
    const onNoErrors = settings?.onNoErrors;

    return new Promise(async resolve => {
      const controllers = this.getControllersList(values)
      await Promise.all(controllers)
        .then(async _ => {
          const noError = this.errorsList.length === 0
          if(noError){
            await onNoErrors?.()
            return;
          }

          const errors = this.getErrorObject()
          await onErrors?.(errors)
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