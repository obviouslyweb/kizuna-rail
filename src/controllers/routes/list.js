import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    let routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    const { region, season } = req.query;

    if (region) {
        routes = await getRoutesByRegion(region);
    }

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