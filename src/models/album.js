module.exports = (sequelize, Datatypes) => {
  const schema = {
    name: Datatypes.STRING,
    year: Datatypes.INTEGER,
  };

  const Album = sequelize.define('Album', schema); 
  return Album;
}