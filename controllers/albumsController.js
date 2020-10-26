const router = require('express').Router();
const Album = require('../models/album').Album;
const Song = require('../models/album').Song;




// NEW ALBUM FORM
router.get('/new', (req, res) => {
    res.render('albums/new.ejs');
  });

//Index - all
router.get("/", (req, res) => {
  Album.find({}, (error, albums) => {
    res.render('albums/index.ejs', {
      albums: albums
    });
  });
});

  // ADD EMPTY FORM TO ALBUM SHOW PAGE TO ADD SONG TO AN ALBUM
router.get('/:albumId', (req, res) => {
    // find album in db by id and add new song
    Album.findById(req.params.albumId, (error, album) => {
      res.render('albums/show.ejs', { album });
    });
  });
  
  // CREATE A NEW ALBUM
  router.post('/', (req, res) => {
    Album.create(req.body, (error, album) => {
      res.redirect(`/albums/${album.id}`);
    });
  });

  // CREATE SONG EMBEDDED IN ALBUM
router.post('/:albumId/songs', (req, res) => {
    console.log(req.body);
    // store new song in memory with data from request body
    const newSong = new Song({ songText: req.body.songText });
  
    // find album in db by id and add new song
    Album.findById(req.params.albumId, (error, album) => {
      album.songs.push(newSong);
      album.save((err, album) => {
        res.redirect(`/albums/${album.id}`);
      });
    });
  });

  router.get('/:albumId/songs/:songId/edit', (req, res) => {
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
      // find song embedded in album
      const foundSong = foundAlbum.songs.id(songId);
      // update song text and complete with data from request body
      res.render('songs/edit.ejs', { foundAlbum, foundSong });
    });
  });
  
  // UPDATE SONG EMBEDDED IN A ALBUM DOCUMENT
  router.put('/:albumId/songs/:songId', (req, res) => {
    console.log('PUT ROUTE');
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
  
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
      // find song embedded in album
      const foundSong = foundAlbum.songs.id(songId);
      // update song text and complete with data from request body
      foundSong.songText = req.body.songText;
      foundAlbum.save((err, savedAlbum) => {
        res.redirect(`/albums/${foundAlbum.id}`);
      });
    });
  });
  
  router.delete('/:albumId/songs/:songId', (req, res) => {
    console.log('DELETE SONG');
    // set the value of the albums and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
  
    // find album in db by id
    ALbum.findById(albumId, (err, foundAlbum) => {
      // find song embedded in Album
      foundAlbum.songs.id(songId).remove();
      // update song text and complete with data from request body
      foundAlbum.save((err, savedAlbum) => {
        res.redirect(`/albums/${foundAlbum.id}`);
      });
    });
  });

  router.delete('/:albumId', (req, res) => {
    console.log('DELETE ALBUM');
    // set the value of the user and tweet ids
    const albumId = req.params.albumId;
  
    // find user in db by id
    Album.findById(albumId, (err, foundAlbum) => {
      // remove album
      foundAlbum.remove();
      // update 
      foundAlbum.save((err, savedAlbum) => {
        res.redirect('/albums');
      });
    });
  });

module.exports = router;