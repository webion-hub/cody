import { Organizations } from 'src/lib/server_calls/organizations';
import OrganizationImages from 'src/lib/server_calls/organization_images';
import { CreateOrganizationErrorController } from './create_organization_error_controller';

export function tryCreateOrganization(settings){
  const data = settings.data;
  const kind = settings.kind;

  return new Promise(async resolve => {
    const errorController = new CreateOrganizationErrorController();

    await errorController
      .checkAll(data, kind)
      .then(
        async results => {
          let errorsFromController = {};
          results.forEach(result => {
            errorsFromController[result] = true;
          });
          const thereAreFormatErrors = !errorsFromController.noError;

          if(thereAreFormatErrors){
            settings.onFormatError(errorsFromController)
            return;
          }

          await Organizations.createNew({
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
            },
            onConflict: () => settings.onConflict(),
            onError: () => settings.onError()
          })

        }
      )  
      resolve()
  })
}