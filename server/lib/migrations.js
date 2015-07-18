migrate = function(migrationName, func){
  if(!Migrations.findOne({migrationName: migrationName}))
  {
    console.log(func());
    Migrations.insert({migrationName: migrationName});
    console.log('Migration: ' + migrationName + ' done.');
  }

};