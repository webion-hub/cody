export const dataTableStyles = (theme) => {
  return {
    rows: {
      style: {
        background: theme.palette.background.paperSecondary,
      }
    },
    header: {
      style: {
        background: theme.palette.background.paperSecondary,
        color: theme.palette.text.primary
      },
    },
    progress: {
      style: {
        backgroundColor: theme.palette.background.default,
        width: "100%"
      }
    },
    headCells: {
      style: {
        background: theme.palette.background.paperSecondary,
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