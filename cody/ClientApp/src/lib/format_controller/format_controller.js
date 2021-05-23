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
import { CourseTitleController } from "./controllers/course_title_controller";

export class FormatController {
  constructor(controllers){
    this.controllersLabel = controllers;
    this.skippableControllers = []
  }

  addController = (controller, skippable, customController = null) => {
    this.controllersLabel
      .push({
        controller,
        skippable,
        customController
      });
  }

  getController = (controllerLabel, customController) => {
    const controller = {
      'email':            EmailController,
      'password':         PasswordController,
      'username':         UsernameController,
      'name':             NameSurnameController.setType('name'),
      'surname':          NameSurnameController.setType('surname'),
      'birthDate':        BirthDateController,
      'termsAndService':  TermsAndServiceController,
      'organizationName': OrganizationNameController,
      'courseTitle':      CourseTitleController,
      'location':         LocationController,
      'description':      DescriptionController,
      'website':          WebsiteController,
      'custom':           customController
    }[controllerLabel]

    return controller
  }

  getControllersList = (values) => {
    return this.controllersLabel
      .map(controller => 
        this
          .getController(controller.controller, controller.customController)
          .check(values, controller.skippable)
      );
  }

  getErrorObject = (errorsList) => {
    let errorsFromController = {};

    errorsList.forEach(result => {
      errorsFromController[result.value] = true;
    });

    return errorsFromController
  }

  static setController = () => {
    return new FormatController([])
  }


  /**
   * @param {Function} errorCondition
   * @param {String} controlerrorLabeller 
   */
  create = ({errorCondition, errorLabel}, skippable = false) => {
    const controller = {
      check: val => {
        if(errorCondition(val))
          return Promise.resolve(errorLabel)

        return Promise.reject()
      }
    }

    this.addController('custom', skippable, controller);    
    return new FormatController(this.controllersLabel)
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
      await Promise.allSettled(controllers)
        .then(async errorsList => {          
          const errorsFiltered = errorsList
            .filter(error => 
              error.status == "fulfilled"
            );
            
          const noError = errorsFiltered.length === 0

          if(noError){
            await onNoErrors?.()
            return;
          }

          const errors = this.getErrorObject(errorsFiltered)
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