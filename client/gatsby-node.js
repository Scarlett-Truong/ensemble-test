const chalk = require('chalk')
const {performance} = require('perf_hooks')
const axios = require('axios')

let filmsList, charactersList, planetsList, vehiclesList; 

const getList = async (type) => {
  try{
    const list = await axios.get(`https://swapi.co/api/${type}`)
    let result = list.data.results
    let next = list.data.next
    let i = 1
    while(next){
      const list2 = await axios.get(`https://swapi.co/api/${type}/?page=${i}`)
      i++
      next = list2.data.next
      result = [...result, ...list2.data.results]
    }
    return result;
  }
  catch (err){
    throw Error(err.message)
  }
}

exports.onPreBootstrap = async () => {
  const t0 = performance.now();
  try {
    filmsList = await getList('films')
    planetsList = await getList('planets')
    charactersList = await getList('people')
    vehiclesList = await getList('vehicles')

    const t1 = performance.now()
    const ms = t1 - t0
    const s = ((ms / 1000) % 60).toFixed(3)
    console.log(chalk.green('success ') + `getFilmsList: ${filmsList.length} films - ${s} s`)
    console.log(chalk.green('success ') + `getPlanetsList: ${planetsList.length} planets - ${s} s`)
    console.log(chalk.green('success ') + `getCharactersList: ${charactersList.length} characters - ${s} s`)
    console.log(chalk.green('success ') + `getVehiclesList: ${vehiclesList.length} vehicles - ${s} s`)
  } catch (error) {
    throw Error(error.message)
  }
}

//Add films list to front page
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path === '/') {
    createPage({
      ...page,
      context: {
        ...page.context,
        filmsList
      }
    })
  }
  else{
    filmsList.forEach(async film => {
      film.slug = film.title.toLowerCase().replace(/\s+/g, '-')
      createPage({
        path: `films/${film.slug}`,
        component: require.resolve('./src/templates/film.js'),
        context: {
          ...page.context,
          film
        }
      })
    })
    
    planetsList.forEach(async planet => {
      planet.slug = planet.name.toLowerCase().replace(/\s+/g, '-')
      createPage({
        path: `planets/${planet.slug}`,
        component: require.resolve('./src/templates/planet.js'),
        context: {
          ...page.context,
          planet
        }
      })
    })

    charactersList.forEach(async character => {
      character.slug = character.name.toLowerCase().replace(/\s+/g, '-')
      createPage({
        path: `characters/${character.slug}`,
        component: require.resolve('./src/templates/character.js'),
        context: {
          ...page.context,
          character
        }
      })
    })

    vehiclesList.forEach(async vehicle => {
      vehicle.slug = vehicle.name.toLowerCase().replace(/\s+/g, '-')
      createPage({
        path: `vehicles/${vehicle.slug}`,
        component: require.resolve('./src/templates/vehicle.js'),
        context: {
          ...page.context,
          vehicle
        }
      })
    })
  }
}
  
