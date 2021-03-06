import React from 'react';

import { OrganizationKindIcon } from 'src/components/icons/organization_kind_icon';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

export const FilterComponent = React.forwardRef((props, ref) => {
  return(
    <ToggleButtonGroup
      ref={ref}
      className={props.className}
      value={props.filters}
      onChange={(_, filter) => props.onFiltersChange(filter)}
    >
      <ToggleButton value="Team">
        <OrganizationKindIcon kind="team"/>
      </ToggleButton>
      <ToggleButton value="School">
        <OrganizationKindIcon kind="school"/>
      </ToggleButton>
      <ToggleButton value="Company">
        <OrganizationKindIcon kind="company"/>
      </ToggleButton>
    </ToggleButtonGroup>
  );
})