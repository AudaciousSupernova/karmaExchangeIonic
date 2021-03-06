var url = "http://localhost:3000";

angular.module('app.services', [])

// Questions factory handles all requests to add, retrieve, or modify questions in the database


.factory('User', function($http, $location) {
  return {
    // add a question from ask
    getUser: function(id) {
      return $http({
        method: 'GET',
        url:url + '/profile/' + id,
      })
      .then(function(res) {
        return res.data;
      })
    },

    getUserByPartial: function(partial){
      return $http({
        method: 'GET',
        url:url + '/users/partial/' + partial,
      })
      .then(function(res) {
        return res.data;
      })      
    },

    getLeaderData: function() {
      return $http({
        method: 'GET',
        url:url + '/leaders',
      })
      .then(function(res) {
        console.log(res.data, 'res.data'); 
        return res.data;
      })
    }
  }
})

.factory('Portfolio', function($http, $location) {
  return {
    // add a question from ask
    getInvestments: function(id) {
      return $http({
        method: 'GET',
        url:url + '/portfolio/' + id,
      })
      .then(function(res) {
        return res.data;
      })
    },

    addInvestment: function(investment) {
      return $http({
        method: 'POST',
        url:url + '/profile/buy',
        data: {investment: investment}
      })
    }
  }
})

.factory('Newsfeed', function($http, $location) {
  return {
    // add a question from ask
    getTrending: function() {

      return $http({
        method: 'GET',
        url:url + '/trending',
      })
      .then(function(res) {
        return res.data;
      })
    }
  }
})

.factory('Auth', function ($http, $location, $rootScope) {
  return {
    checkLoggedIn: function () {
      return $http({
        method: 'GET',
        url:url + '/api/loggedin'
      })
      .then(function (user) {
        if (user.data.id) {
          $rootScope.user = user;
          return true;
        } else {
          console.log("error authenticating user");
          return false;
        }
      });
    }
  }
})

.factory('Root', function ($http, $location, $rootScope) {
  return {
    addUserInfo: function(info) {
      this.currentUserInfo = info;
    }
  }
})


.factory('TransactionHist', function ($http, $location) {
  return {
    // calls addTransaction, which adds transaction to TransactionHist - affecting transactionQueue, karma, stocks, share price.  
    addTransaction: function(transactionObj) {
      return $http({
        method: 'POST',
        url:url + '/transaction/add',
        data: {transactionObj: transactionObj}
      })
    },
    //get all past transactions for given user_id
    getTransactions: function(user_id) {
      return $http({
        method: 'GET', 
        url:url + '/transaction/get/' + user_id
      })
      .then(function(res) {
        return res.data;
      })
    },
    //gets all of the open transactions for a specific user, used in the portfolio to help close those transactions
    getOpenUserTransactions: function(user_id){
      return $http({
        method: 'GET', 
        url:url + '/transaction/queue/' + user_id
      })
      .then(function(res) {
        return res.data;
      })
    },
    // returns number of shares available for given target_id
    checkSharesAvail: function(target_id, type) {
      console.log('targetid', target_id, 'type', type);
      return $http({
        method: 'GET',
        url:url + '/transaction/check/',
        params: {target_id: target_id, type: type}
      })
      .then(function(res) {
        return res.data;
      })
    },

    // calls makeTransaction
    makeTransaction: function(transactionObj) {
      return $http({
        method: 'POST',
        url:url + '/transaction/make',
        data: {transactionObj: transactionObj}
      })
    },

    // calls addTransactionToQueue, which adds specified transaction to transaction queue 
    addTransactionToQueue: function(transactionObj) {
      
      return $http({
        method: 'POST', 
        url:url + '/transaction/queue', 
        data: {transactionObj: transactionObj}
      })
    },

    // calls closeTransactionRequest, which closes specified transaction request 
    closeTransactionRequest: function(transactionObj, shareValue) {
      return $http({
        method: 'POST',
        url:url + '/transaction/close',
        data: {transactionObj: transactionObj, shareValue: shareValue}
      })
    },

    //deletes an open transaction from the queue. Used in portfolio view to cancel a transaction
    deleteOpenTransaction: function(transactionId){
      return $http({
        method: 'DELETE',
        url:url + '/transaction/queue/delete/' + transactionId
      })
    }

  }
})

.factory('Scores', function ($http, $location) {
  return {
    getScores: function(id) {
      return $http({
        method: 'GET',
        url:url + '/profile/score/month/' + id
      })
      .then(function(res) {
        return res.data;
      })
    }
  }
})

.factory('FB', function ($http, $location) {
  return {
    test: function(id) {
      return $http({
        method: 'GET',
        url:url + '/facebook/' + id
      })
      .then(function(res) {
        return res.data;
      })
    }
  }
})

.factory('Url', function() {
  return {
    // add a question from ask
    url: function() {
      return url
    }
  }
})
