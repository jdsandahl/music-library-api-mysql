/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/sequelize');

describe('/songs', () => {
  let artist;
  let album;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
      album = await Album.create({
        name: 'InnerSpeaker',
        year: 2010,
        artistId: artist.id,
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /album/:albumId/song', () => {
    it('creates a new song under an album', (done) => {
      request(app)
        .post(`/album/${album.id}/song`)
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          const songId = res.body.id;
          expect(res.body.id).to.equal(songId);
          expect(res.body.name).to.equal('Solitude Is Bliss');
          expect(res.body.artistId).to.equal(artist.id);
          expect(res.body.albumId).to.equal(album.id);
          done();
        });
    });
  });

 describe('with songs in the database', () => {
   let songs;
   beforeEach((done) => {

    Promise.all([
      Song.create({ name: 'testSong1', albumId: album.id, artistId: artist.id }),
      Song.create({ name: 'testSong2', albumId: album.id, artistId: artist.id }),
      Song.create({ name: 'testSong3', albumId: album.id, artistId: artist.id }),
    ]).then((documents) => {
      songs = documents;
      done();
    });
   });

   describe('GET album/:albumId/all-tracks', () => {
     it('gets all songs on an album', (done) => {
        request(app)
          .get(`/album/${album.id}/all-tracks`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((song) => {
              const expected = songs.find((s) => s.id === song.id);
              expect(song.name).to.equal(expected.name);
              expect(song.albumId).to.equal(album.id);
              expect(song.artistId).to.equal(artist.id);
            });
            done();
          });
      });

      it('returns a 404 if the album does not exist', (done) => {
        request(app)
          .get(`/album/12345/all-tracks`)
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
            done();
          });
      });
   });
 });

});
