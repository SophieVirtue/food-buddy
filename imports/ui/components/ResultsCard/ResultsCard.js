import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Drawer,
  List,
  ListItem
} from '@material-ui/core/';

class MediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
  }
  componentDidMount() {
    this.getPlaceDetails(this.props.places);
  }
  getPlaceDetails = async places => {
    const placeDetails = places.map(async place => {
      const placeid = place.place_id;
      const data = new Promise((resolve, reject) => {
        Meteor.call('googleMapsWebsite.geocode', placeid, (err, result) => {
          if (!err) return resolve(result);
        });
      });
      return await data;
    });
    this.setState({
      result: await Promise.all(placeDetails)
    });
  };
  render() {
    if (this.state.result) {
      const { classes, places } = this.props;
      const details = this.state.result;
      console.log(places);
      return (
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            anchor="right"
          >
            <List>
              {places.map((place, i) => {
                const photo_reference =
                  details && details[i].result.photos[0].photo_reference;
                return (
                  <ListItem key={place.id}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <a
                          href={details && details[i].result.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={classes.hrefLink}
                        >
                          <CardMedia
                            className={classes.media}
                            component="img"
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E`}
                            title="Restaurant Image"
                          />
                          <CardContent>
                            <Typography component="h2">{place.name}</Typography>
                            <Typography component="p">
                              {place.rating ? `Rating: ${place.rating}` : ''}
                            </Typography>
                            <Typography component="p">
                              {place.price_level
                                ? `Price Level: ${place.price_level}`
                                : ''}
                            </Typography>
                            <Typography component="p">
                              {place.vicinity}
                            </Typography>
                          </CardContent>
                        </a>
                      </CardActionArea>
                    </Card>
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
        </div>
      );
    } else {
      return '';
    }
  }
}
MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MediaCard);
