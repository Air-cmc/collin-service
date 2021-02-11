/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable guard-for-in */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Places from './Places';
import Activities from './Activities';
import CityList from './CityList';
import CardSkeletons from './CardSkeletons';
import CityListSkeletons from './CityListSkeletons';
import styles from '../styles.js';

const axios = require('axios');

const useStyles = makeStyles(styles);

const App = () => {
  const [city, setCity] = useState(1);
  const [homeInfo, setHomeInfo] = useState([]);
  const [activityInfo, setActivityInfo] = useState([]);
  const [cities, setCities] = useState([]);
  const [activityPage, setActivityPage] = useState(0);
  const [homesPage, setHomesPage] = useState(0);
  const classes = useStyles();
  const { id } = useParams();

  const getActivityData = () => {
    axios.get(`http://52.91.70.54:3000/activities/${city}?page=${activityPage}`)
      .then((response) => setActivityInfo(response.data))
      .catch((err) => console.log(err));
  };

  const getCities = () => {
    axios.get('http://52.91.70.54:3000/cities')
      .then((response) => setCities(response.data))
      .catch((err) => console.log(err));
  };

  const getHomeData = () => {
    city
    && axios.get(`http://52.91.70.54:3000/homes/${city}?page=${homesPage}`)
      .then((response) => setHomeInfo(response.data))
      .then(() => getActivityData())
      .then(() => getCities())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(id);
    setCity(id);
    getHomeData();
  }, [id, city]);

  return (
    <div>
      <Box className={classes.relatedInfo}>
        { homeInfo.length
          ? (
            <Box>
              <h2>More places to stay</h2>
              <Places homeInfo={homeInfo} />
            </Box>
          )
          : <CardSkeletons />}
        { activityInfo.length
          ? (
            <Box>
              <h2>Things to do nearby</h2>
              <Activities activityInfo={activityInfo} />
            </Box>
          )
          : <CardSkeletons />}
        { cities.length
          ? (
            <Box>
              <h2>Explore other options in another city</h2>
              <CityList cities={cities} setCity={setCity} />
            </Box>
          )
          : <CityListSkeletons />}
      </Box>
    </div>
  );
};

export default App;
