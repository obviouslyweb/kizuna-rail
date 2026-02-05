import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    let routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    // Get region & season query parameters
    const { region, season } = req.query;

    // Filter by region
    if (region) {
        routes = await getRoutesByRegion(region);
    }

    // Filter by season
    if (season) {
        routes = routes.filter(route =>
          route.bestSeason.toLowerCase() === season.toLowerCase()  
        );
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: { region: region, season: season }
    });
};