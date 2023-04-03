app.get('/search', function(req, res) {
    var query = req.query.query;
    var results = performCommentSearch(query); // Perform search and get results
    
    res.render('search-results', { query: query, results: results });
  });