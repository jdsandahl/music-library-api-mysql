/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/sequelize');

describe('/albums', () => {
  let artist;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Album.findByPk(res.body.id, { raw: true }).then((album) => {
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artistId).to.equal(artist.id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.findAll().then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          });
        });
    });
  });

  describe('with albums in the database', () => {
    let albums;
    beforeEach((done) => {
      //console.log({artistId: artist.id});
      Promise.all([
        Album.create({ name: 'testAlbum1', year: 2020, artistId: artist.id }),
        Album.create({ name: 'testAlbum2', year: 2020, artistId: artist.id }),
        Album.create({ name: 'testAlbum3', year: 2020, artistId: artist.id }),
      ]).then((documents) => {
        albums = documents;
        done();
      });
    });

    describe('GET artists/:artistId/albums', () => {
      it('gets all albums by an artist', (done) => {
        //console.log("artist",artist.id);
        request(app)
          .get(`/artists/${artist.id}/albums`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            //console.log(res.body);
            res.body.forEach((album) => { 
              const expected = albums.find((a) => a.id === album.id);
              expect(album.name).to.equal(expected.name);
              expect(album.year).to.equal(expected.year);
              expect(album.artistId).to.equal(artist.id);
            });
            done();
          });
      });

      it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .get(`/artists/12345/albums`)
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });
    });
  
    //NOT CURRENTLY WORKING - Error ECONNREFUSED error
    describe('GET artists/:artistId/albums/:albumId', () => {
      it('gets a single album by artist and album id', (done) => {
        const album = albums[0];
        request(app)
          .get(`artists/${artist.id}/albums/${album.id}`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(album.name);
            expect(res.body.year).to.equal(album.year);
            expect(res.body.id).to.equal(album.id);
            expect(res.body.artistId).to.equal(artist.id);
            done();
          });
      });

      xit('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .get(`/artists/12345/albums/${album.id}`)
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });

      xit('returns a 404 if the album does not exist', (done) => {
        request(app)
          .get(`/artists/${artist.id}/albums/99999`)
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
            done();
          });
      });
    });


    describe('PATCH artists/:artistId/albums/:albumId', () => {
      xit('updates album name by ')
    });

  });
});
