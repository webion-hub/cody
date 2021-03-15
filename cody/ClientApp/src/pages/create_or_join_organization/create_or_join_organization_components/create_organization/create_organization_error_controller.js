import { OrganizationNameController } from 'src/lib/format_controller/organization_name_controller'
import { LocationController } from 'src/lib/format_controller/loaction_controller'
import { WebsiteController } from 'src/lib/format_controller/website_controller'
import { DescriptionController } from 'src/lib/format_controller/description_controller'

export class CreateOrganizationErrorController{

    removeNoError(array){
      const index = array.indexOf("noError");
      if (index >= 0) {
        array.splice(index, 1);
      }
  
      return array;
    }
  
    checkAll(values, kind){
      return new Promise(resolve => {
        const organizationNameController = new OrganizationNameController();
        const locationController = new LocationController();
        const websiteController = new WebsiteController();
        const descriptionController = new DescriptionController();
  
        const name = values.name;
        const location = values.location;
        const website = values.website;
        const description = values.description;

        const skipFields = kind === "Team"

        let skipWebsite;
        let skipDescription;
        if(skipFields){
          skipWebsite = true;
          skipDescription = true;
        }
        else{
          skipWebsite = website.length === 0;
          skipDescription = description.length === 0;  
        }

        let errorsList = ["noError"];  
        Promise.all([
          organizationNameController
            .checkOrganizationName(name, false)
            .then(
              result => {
                if(result !== "correctOrganizationName") {
                  errorsList.push(result);
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),
          locationController
            .checkLocation(location, skipFields)
            .then(
              result => {
                if(result !== "correctLocation") {
                  errorsList.push("locationError");
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),    
          websiteController
            .checkWebsite(website, skipWebsite || skipFields)
            .then(
              result => {
                if(result !== "correctWebsite") {
                  errorsList.push(result);
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),    
          descriptionController
            .checkDescription(description, skipDescription || skipFields)
            .then(
              result => {
                if(result !== "correctDescription") {
                  errorsList.push(result);
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),
        ])
        .then(_ => {
          resolve(errorsList);
        });
      })
    }
  }