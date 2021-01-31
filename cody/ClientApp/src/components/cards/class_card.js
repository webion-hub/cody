import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import { Grid, IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

import { CardBase } from 'src/components/bases/card_base';
import { ScrollableChipsArray } from 'src/components/scrollable_chips_array';
import { languages } from 'src/lib/default_values/lists/coding_languages'

const useStyles = makeStyles((theme) => ({
  tooltipUsers: {
    padding: "2px 0"
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  codingLanguageButton: {
    width: 40,
    height: 40,
  },
  avatarCodingLanguageBox: {
    background: theme.palette.background.paperSecondary,
    borderRadius: 28,
  }
}));

export function ClassCard(props){ 
  const theme = useTheme();
  const classes = useStyles();
  const userNumber = props.users.length;

  return (
    <CardBase
      background={theme.palette.background.paperSecondary}
      image={props.image}
      title={props.title}
      loading={props.loading}
      button={
        <Button
          size="small" 
          variant="contained"
          color="primary"
          endIcon={<KeyboardArrowRightRoundedIcon/>}
          href={props.href}
          className="noScroll"
        >
          Apri
        </Button>
      }
    >
        <Grid
        container
        direction="row"
        alignItems="center"
      >
        {
          props.loading ? (
            <Skeleton animation="wave" width={96} height={48}/>
          ) : (
            <Box pr={2}>
              <Grid
                container
                direction="row"
                spacing={1}
                className={classes.avatarCodingLanguageBox}
              >
                <Grid item>
                  <IconButton className={`${classes.codingLanguageButton} noScroll`}>
                    {props.languageIcon}
                  </IconButton>
                </Grid>
                <Grid item>
                  <Tooltip
                    arrow
                    interactive
                    placement="left"
                    disableFocusListener 
                    title={ userNumber > 0 ? (
                      <Grid
                        container
                        direction="column"
                      >
                        {
                          props.users.map((data, index) => {
                            return <Grid
                              key={index}
                              container
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              className={classes.tooltipUsers}
                            > 
                              <Grid item>
                                <Avatar 
                                  alt={data.username} 
                                  src={data.profilePic} 
                                  className={classes.smallAvatar}
                                />
                              </Grid>
                              <Grid item>
                                <div>{data.username}</div>
                              </Grid>
                            </Grid>
                          })
                        }
                      </Grid>
                    ) : (
                      "Non ci sono altri studenti"
                    )
                    }
                  >
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      badgeContent={userNumber > 0 ? "+" + userNumber : null}
                      color="secondary"
                    >
                      <Avatar 
                        alt={props.admin.username} 
                        src={props.admin.profilePic} 
                      />
                    </Badge>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          )
        }
        <div>
          {
            props.loading ? (
              null
            ) : (
              <div>
                <Typography variant="h5" component="h2">
                  {props.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Admin <Link href="" color="inherit" className="noScroll">{props.admin.username}</Link>
                </Typography>
              </div>
            )
          }

        </div>
      </Grid>
      <Box mt={1}>
        {
          props.loading ? (
            <Skeleton animation="wave" width="100%" height={44}/>
          ) : (
            <ScrollableChipsArray
              list={languages}
              clickables
              color="secondary"
              emptyMessage="Non hai linguaggi preferiti"
            />
          )
        }
      </Box>
    </CardBase>
  );
}