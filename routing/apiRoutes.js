

var friends = require("../app/data/friends");



module.exports = function(app) {
  // API GET Requests
  

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  

  app.post("/api/friends", function(req, res) {
    

    // this will use this object to hold the "best match". it will constantly update it as it
    // loop through all of the options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    
    var userData = req.body;
    var userScores = userData.scores;

    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference;

    // this will loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // this will loop through scores
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // then calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    // this save the user's data to the database 
    
    friends.push(userData);

    // Return  best match to client. This will be used by the HTML in the next page
    res.json(bestMatch);
  });
};
 