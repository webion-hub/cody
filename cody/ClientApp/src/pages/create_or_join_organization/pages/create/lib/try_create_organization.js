import { FormatController } from 'src/lib/format_controller/format_controller';
import { Organizations } from 'src/lib/server_calls/organizations';
import OrganizationImages from 'src/lib/server_calls/organization_images';

const getOrganizationKindController = (kind) => {
  if(kind === 'Team')
    return FormatController
      .setController()
        .add('organizationName')
        .add('website', true)
        .add('description', true)

  return FormatController
    .setController()
      .add('organizationName')
      .add('location')
      .add('website', true)
      .add('description', true)
}
 
export function tryCreateOrganization(settings){
  const data = settings.data;
  const kind = settings.kind;

  return new Promise(resolve => {
    getOrganizationKindController(kind)
      .checkAll({
        values: data,
        onErrors: settings.onFormatError,
        onNoErrors: async _ => {
          settings.onFormatError({})
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
      })
      .finally(resolve)
  })
}