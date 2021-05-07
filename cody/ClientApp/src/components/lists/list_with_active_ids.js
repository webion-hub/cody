import React from "react";
import { ListWithSearch } from "src/components/list_with_search/list_with_search";

export const ListActiveIdsContext = React.createContext({});

export const ListWithActiveIds = (props) => {
  const activeIdsList = React.useRef({});

  const addActiveId = (id) => {
    activeIdsList.current = {
      ...activeIdsList.current,
      [id]: true
    }
  }

  const removeActiveId = (id) => {
    activeIdsList.current = {
      ...activeIdsList.current,
      [id]: false
    }
  }

  const cleanActiveIds = () => {
    activeIdsList.current = {}
  }

  const isActive = (id) => {
    return activeIdsList.current[id] ?? false
  }
  
  const ListWithActiveIdsComponent = React.useCallback((props) => {
    return (
      <ListActiveIdsContext.Provider value={activeIdsList.current}>
        <ListWithSearch
          {...props}
        />
      </ListActiveIdsContext.Provider>
    )
  }, [])

  return {
    cleanActiveIds,
    addActiveId,
    removeActiveId,
    isActive,
    ListWithActiveIdsComponent
  }
}