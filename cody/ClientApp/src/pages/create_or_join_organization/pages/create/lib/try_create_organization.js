import { Organizations } from 'src/lib/organizations';
import OrganizationImages from 'src/lib/organization_images';
import { CreateOrganizationErrorController } from './create_organization_error_controller';

export function tryCreateOrganization(settings){
  const data = settings.data;
  const kind = settings.kind;

  return new Promise(resolve => {
    const errorController = new CreateOrganizationErrorController();

    errorController
      .checkAll(data, kind)
      .then(
        results => {
          let errorsFromController = {};
          results.forEach(result => {
            errorsFromController[result] = true;
          });
          const thereAreNotFormatErrors = errorsFromController.noError;
          if(thereAreNotFormatErrors){
            Organizations.createNew({
              organization: {
                name: data.name,
                location: data.location,
                website: data.website === "" ? null : data.website,
                description: data.description,
                kind: kind,
              },
              onSuccess: async (id) => {
                if(data.logo !== null)
                  await OrganizationImages
                    .of(id)
                    .update('logo', data.logo)

                settings.onSuccess(id)
                resolve()                    
              },
              onConflict: () => {
                settings.onConflict()
                resolve()
              },
              onError: () => {
                settings.onError()
                resolve()
              }
            })
          }
          else{
            settings.onFormatError(errorsFromController)
            resolve()
          }
        }
      )  

  })
}