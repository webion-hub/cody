export const dataTableStyles = (theme) => {
  return {
    rows: {
      style: {
        background: theme.palette.background[650],
      }
    },
    header: {
      style: {
        background: theme.palette.background[700],
        color: theme.palette.text.primary
      },
    },
    progress: {
      style: {
        backgroundColor: theme.palette.background[400],
        width: "100%"
      }
    },
    headCells: {
      style: {
        background: theme.palette.background[700],
        color: theme.palette.text.primary,
      },
      activeSortStyle: {
        color: theme.palette.text.primary,
        '&:hover': {
          color: theme.palette.text.secondary,
        },
      },
      inactiveSortStyle: {
        color: theme.palette.text.primary,
        '&:hover': {
          color: theme.palette.text.secondary,
        },
      }
    },
    cells: {
      style: {
        background: theme.palette.background[600],
        color: theme.palette.text.secondary
      },
    },
  }
}