const functions = require('firebase-functions');
const axios = require('axios').default;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.getGardens = functions.https.onRequest( async (req, res) => {    
    let {lat, lon} = req.body;
    const data = await getPlaces(lat, lon);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});


const getPlaces = async (lat, lon) => {
    let result;
    try {
        result = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?parameters", {
            params: {
                "key": "AIzaSyDPLdj-1ztQeqm8qLRl24MnTCExbe8jxkw",
                "input": "Community gardens",
                "keyword": "Community gardens",
                "location": lat !== undefined || lon !== undefined ? `${lat,lon}` : "26.715342,-80.053375",
                "radius": "10000",
            }
        });
        functions.logger.log(result.data)
    }catch(err) {
        functions.logger.log(err);
    }
    return result.data;
}

