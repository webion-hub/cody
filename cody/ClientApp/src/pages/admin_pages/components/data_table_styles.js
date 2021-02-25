export const dataTableStyles = (theme) => {
  return {
    rows: {
      style: {
        background: theme.palette.background.paperDark,
      }
    },
    header: {
      style: {
        background: theme.palette.background.paperDark,
        color: theme.palette.text.primary
      },
    },
    headCells: {
      style: {
        background: theme.palette.background.paperDark,
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
        background: theme.palette.background.paper,
        color: theme.palette.text.secondary
      },
    },
  }
}