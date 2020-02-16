import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import TextTruncate from 'react-text-truncate';
import Avatar from 'Atoms/Avatar';

const styles = theme => ({
  card: {
    maxWidth: 300,
    height: 430,
  },
  media: {
    height: 300,
    width: 300,
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  body: {
    height: 50,
  },
  description: {
    fontSize: '0.8rem',
    color: '#595959',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 25,
    width: 25,
  },
  name: {
    paddingLeft: theme.spacing(1),
    color: '#333333',
  },
});

class RecipeCard extends PureComponent {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
    name: PropTypes.string,
    profilePic: PropTypes.string,
  };

  static defaultProps = {
    classes: {},
    name: undefined,
    profilePic: undefined,
  };

  render() {
    const {
      classes,
      imageUrl,
      title,
      description,
      name,
      profilePic,
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={imageUrl} />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>
          <div className={classes.body}>
            <Typography
              className={classes.description}
              variant="body1"
              color="inherit"
              component="span"
            >
              <TextTruncate line={2} truncateText=" …" text={description} />
            </Typography>
          </div>
          <Avatar
            src={profilePic}
            imgProps={{ size: 'small' }}
            name={name}
            nameProps={{ className: classes.name, display: 'right' }}
          />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(RecipeCard);
