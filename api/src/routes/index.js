const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");
const router = Router();
const { API_KEY } = process.env;

router.get("/videogames", async (req, res, next) => {
  try {
    const { name } = req.query; // si se busca por name
    if (name) {
      let gamesInDB = []; 

      const nameInDB = await Videogame.findAll({
        

        where: { name: { [Op.iLike]: "%" + name + "%" } }, 
        include: Genre, 

        limit: 15,
      });

      if (nameInDB.length > 0) {
        

        gamesInDB = nameInDB.map((videogame) => {
          //me quedo sólo con los datos que necesito y los guardo

          return {
            id: videogame.id,
            name: videogame.name,
            image: videogame.image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.genres,
          };
        });
      }
      
      const nameInApi = (
        await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        )
      ).data.results;

      let gamesinApi = []; 

      if (nameInApi.length > 0) {
        

        gamesinApi = nameInApi.map((videogame) => {
         
          return {
            id: videogame.id,
            name: videogame.name,
            image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            platforms: videogame.platforms?.map((pl) => pl.platform.name),
            genres: videogame.genres?.map((gen) => gen.name),
          };
        });
      }

      let videogames = [...gamesInDB, ...gamesinApi]; //agrupo los encontrados en db y en api
      videogames = videogames.slice(0, 15); 

      videogames.length === 0
        ? res.send(["No existe el juego"])
        : res.send(videogames); 
    } else {
      //si no pasé name por query me traigo todos(100)

      let videogames = []; 

      const videogamesDb = await Videogame.findAll({
       
        include: Genre,
        limit: 100,
      });

      videogamesDb.forEach((videogame) => {
       

        videogames.push({
          id: videogame.id,
          name: videogame.name,
          image: videogame.image,
          released: videogame.released,
          rating: videogame.rating,
          genres: videogame.genres.map((gen) => gen.name),
        });
      });

      //y ahora me traigo todos (100) de la api
      const api = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}` //cada llamado me trae 20
      );
      const api2 = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
      );
      const api3 = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
      );
      const api4 = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
      );
      const api5 = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
      );

      let promesas = await Promise.all([api, api2, api3, api4, api5]);

      PageOne = promesas[0].data.results;
      PageTwo = promesas[1].data.results;
      PageThree = promesas[2].data.results;
      PageFour = promesas[3].data.results;
      PageFive = promesas[4].data.results;

      let todo = PageOne.concat(PageTwo)
        .concat(PageThree)
        .concat(PageFour)
        .concat(PageFive);

      todo.forEach((videogame) => {
        
        videogames.push({
          id: videogame.id,
          name: videogame.name,
          image: videogame.background_image,
          released: videogame.released,
          rating: videogame.rating,
          platforms: videogame.platforms.map((pl) => pl.platform.name),
          genres: videogame.genres.map((gen) => gen.name),
        });
      });

      res.send(videogames); // mando el array con todo lo pusheado
    }
  } catch (error) {
    next(error);
  }
});

router.get("/videogames/:idVideogame", async (req, res, next) => {
  //si busco un game por ID
  try {
    const { idVideogame } = req.params;

    if (idVideogame.length > 6) {
      
      const foundInDB = await Videogame.findOne({
       
        where: { id: idVideogame },
        include: Genre,
      });

      const DBGAME = {
       
        id: foundInDB.id,
        name: foundInDB.name,
        image: foundInDB.image,
        description: foundInDB.description,
        released: foundInDB.released,
        rating: foundInDB.rating,
        platforms: foundInDB.platform,
        genres: foundInDB.genres.map((gen) => gen.name),
      };
      res.send(DBGAME); 
    } else {
      
      const foundInApi = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );

      const APIGAME = {
        
        id: foundInApi.data.id,
        name: foundInApi.data.name,
        image: foundInApi.data.background_image,
        description: foundInApi.data.description,
        released: foundInApi.data.released,
        rating: foundInApi.data.rating,
        platforms: foundInApi.data.platforms.map((p) => p.platform.name),
        genres: foundInApi.data.genres.map((g) => g.name),
      };

      res.send(APIGAME); 
    }
  } catch (error) {
    next(error);
  }
});

router.get("/genre", async (req, res, next) => {
  //traer todos los generos
  try {
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    ); //primero los traigo de la api

    genresApi.data.results.forEach(async (genre) => {
      //por cada uno me fijo si ya está en la DB, y sino lo creo
      await Genre.findOrCreate({ where: { name: genre.name } });
    });

    const DBGenres = await Genre.findAll(); //una vez que tengo la DB con todos, me los traigo

    res.send(DBGenres); 
  } catch (error) {
    next(error);
  }
});

router.post("/videogame", async (req, res, next) => {
  //crear un juego

  try {
    let { name, image, description, released, rating, platform, genre } =
      req.body; //parametros que voy necesitar
    let newGame = await Videogame.create({
      //lo creo en la DB
      name,
      image,
      description,
      released,
      rating,
      platform,
    });

    genre?.forEach(async (genre) => {
      var genreFound = await Genre.findOne({
        //busco en DB el genre del juego que quiero agregar
        where: { name: genre },
      });

      newGame.addGenre(genreFound); //se lo agrego al juego creado
    });

    res.send(newGame); 
   
  } catch (error) {
    next(error);
  }
});

router.delete("/videogames/:idVideogame", async (req, res, next) => {
  try {
    const idVideogame = req.params.idVideogame;
    await Videogame.destroy({
      where: {id: idVideogame, }, });
    res.json(["Borrado de la DB"]);
  } catch (error) {  next(error); }});

module.exports = router;
