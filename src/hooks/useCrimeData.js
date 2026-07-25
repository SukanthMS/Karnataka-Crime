import { useState, useEffect } from 'react';
import {
  loadFirDataset,
  loadPoliceStations,
  loadDistrictGeoJSON,
  computeDashboardMetrics,
  computeMonthlyTrend,
  computeCrimeCategories,
  computeTopDistricts
} from '../services/csvDataLoader';

export const useCrimeData = (selectedDistrict = 'All', selectedYear = 'All') => {
  const [firs, setFirs] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);
  const [geoJSON, setGeoJSON] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [firData, stationData, geoData] = await Promise.all([
          loadFirDataset(),
          loadPoliceStations(),
          loadDistrictGeoJSON()
        ]);

        if (isMounted) {
          setFirs(firData);
          setPoliceStations(stationData);
          setGeoJSON(geoData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = computeDashboardMetrics(firs, selectedDistrict, selectedYear);
  const monthlyTrend = computeMonthlyTrend(firs);
  const crimeCategories = computeCrimeCategories(firs);
  const topDistricts = computeTopDistricts(firs);

  return {
    firs,
    policeStations,
    geoJSON,
    metrics,
    monthlyTrend,
    crimeCategories,
    topDistricts,
    loading,
    error
  };
};
