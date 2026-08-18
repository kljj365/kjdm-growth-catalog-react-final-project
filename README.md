# Frame Finder — React Movie Search Final Project

Frame Finder is the replacement submission for the Frontend Simplified **React Final Project**. It was built to match the mentor feedback requiring a movie-search application rather than a service catalogue.

## Requirement evidence

| Mentor requirement | Implementation |
|---|---|
| Homepage with search bar and movies list | The root route includes a controlled title search form and dynamically rendered live movie cards. |
| API search | Browser-side requests use the OMDb search endpoint with the `s` title query and `type=movie`. |
| Movie details page | Each result links to a hash-routed IMDb-ID detail path, which requests full metadata by `i`. |
| Filter or sort feature | Release-window filter controls and newest, oldest, and title-A–Z sorting operate on the returned movie results. |
| Responsive design | CSS provides desktop five-column, tablet three-column, and mobile two-column movie grids plus mobile detail-page reflow. |
| Standard structure | Semantic `<header><nav>`, `<main>`, and `<footer>` elements are present on both the home and detail routes. |

## Live API verification

The local production-equivalent preview successfully loaded ten live OMDb movie results for the default **Batman** query, including poster images, release years, and detail links. The hash route for `tt1877830` returned the live detail view for *The Batman* with runtime, IMDb rating, plot, director, cast, release date, and awards. These requests use the documented OMDb title search (`s`) and IMDb-ID detail (`i`) parameters.[^omdb]

Browser inspection also confirmed that the homepage exposes the controlled movie-title input, submit action, release-window filter, and release-year/title sort menu before the live movie-card grid. The live detail route and release-window control were then exercised as described below.

During interactive inspection, the controlled title field accepted a replacement query (`Parasite`) while the available release-window and sort controls remained visible beside the live result grid. The source implementation submits the controlled field to the same OMDb search handler used for the default query.

The release-window filter was also exercised in the browser. Choosing **Before 2000** reduced the live Batman result grid from ten titles to four matching films released in 1997, 1995, 1992, and 1989, confirming that the required filter changes the rendered list.

## Public deployment plan

The public repository and GitHub Pages deployment use the dedicated `frame-finder-react-final-project` repository and URL path. Source code remains on `main`; the production Vite bundle is published separately on `gh-pages` so GitHub Pages serves the React application rather than the repository documentation. The previously submitted KJDM Growth Catalog remains a separate original business portfolio project and will not be reused as the course final-project submission.

GitHub Pages is configured to deploy from the `gh-pages` branch at the repository root. The public URL is therefore expected to serve the compiled Frame Finder application once the Pages build finishes.

## Public deployment verification

The public GitHub Pages home route rendered the Frame Finder React interface with the live Batman movie list, the movie-title search control, release-window filter, sort options, and responsive navigation. The public detail route at `#/tt1877830` also rendered the live OMDb record for *The Batman*, including its poster, runtime, rating, plot, director, cast, release date, and awards.

[^omdb]: [OMDb API, Usage and Parameters](https://www.omdbapi.com/)
