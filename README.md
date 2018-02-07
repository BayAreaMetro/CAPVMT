# capvmt

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.4.2.

## Getting Started / Web Development  

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Note: the current live site is on the `development` branch. 

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Data Updates

### 2013 Plan Data

2013 Plan data is hosted on the `CAPVMT` database under the `CAPVMT` schema in the following tables:  

```
persons_2005_03_YYY
vmt_2005_03_YYY
persons_2010_03_YYY
vmt_2010_03_YYY
persons_2020_03_116
vmt_2020_03_116
persons_2030_03_116
vmt_2030_03_116
persons_2040_03_116
vmt_2040_03_116
```

Stored producedures and queries are used to produce view referenced in the queries that result in the tables found in the application front end. For convenience, and in order to determine which tables we need to rebuild, all queries to the database are pulled out and listed below:

```
dbo.County_Code_LU
Place_Lookup
Place_Lookup
VMT_Results 
CAPVMT.[PLACES_WGS84]
CAPVMT.[TAZ_PLACES_WGS84]
CAPVMT.[URBANTAZS_WGS84]
ScenarioYear 
VMT_Results 
```

Specific Queries:  

`SELECT County_ID as value, County_Name as text FROM dbo.County_Code_LU`

`SELECT ID as value, CityName as text FROM Place_Lookup";
request.query(query, function(err, vmtdata) {

`SELECT ID as value, CityName as text FROM Place_Lookup";
request.query(query, function(err, vmtdata) {

`SELECT Lives, Works, Persons, Inside, Partially_In, Outside, Total, CityName, model_run as Model_Run, tazlist FROM VMT_Results WHERE (placeid = " + place + ") AND (model_run = " + mr + ") ORDER BY CityName, SortOrder2, SortOrder3";

`SELECT ID, name as CityName, County, Shape.ToString() as WKT FROM CAPVMT.[PLACES_WGS84] WHERE (ID = " + place + ")";

`SELECT City_Domain as ID, taz_key, Shape.ToString() as WKT FROM CAPVMT.[TAZ_PLACES_WGS84] WHERE (ID = " + place + ")"`

`var query = "SELECT City_Domain as ID, taz_key, Shape.ToString() as WKT FROM CAPVMT.[URBANTAZS_WGS84] WHERE (ID = " + place + ")";`

`SELECT text, value FROM ScenarioYear Order By text Asc";`

`SELECT Lives, Works, Persons, Inside, Partially_In, Outside, Total, CityName, placeid as Place_ID, model_run as Model_Run, tazlist FROM VMT_Results WHERE (placeid = " + place + ") AND (model_run = " + mr + ") ORDER BY CityName, SortOrder2, SortOrder3"`


### 2017 Plan Data

2017 Plan data is hosted on the `CAPVMT` database under the `CAPVMT` schema in the following tables:   

```
persons_2005_05_YYY
vmt_2005_05_YYY
persons_2010_06_YYY
vmt_2010_06_YYY
persons_2020_06_694
vmt_2020_06_694
persons_2030_06_694
vmt_2030_06_694
persons_2040_06_694
vmt_2040_06_694
```

