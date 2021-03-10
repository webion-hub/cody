import { Organizations } from 'src/lib/organizations';
import { CreateOrganizationErrorController } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_error_controller';

export function tryCreateOrganization(settings){
  const data = settings.data;
  const kind = settings.kind;

  return new Promise(resolve => {
    const errorController = new CreateOrganizationErrorController;
    errorController
      .checkAll(data, kind)
      .then(
        results => {
          let errorsFromController = {};
          results.forEach(result => {
            errorsFromController[result] = true;
          });
          if(errorsFromController.noError){
            Organizations.createNew({
              organization: {
                name: data.name,
                city: data.city,
                country: data.country,
                website: data.website,
                description: data.description,
                kind: kind,
              },
              onSuccess: settings.onSuccess,
              onConflict: settings.onConflict,
              onError: settings.onError
            })
            .then(() => resolve())
          }
          else{
            settings.onFormatError(errorsFromController)
            resolve()
          }
        }
      )  

  })
}