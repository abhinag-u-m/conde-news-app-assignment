const express = require('express')
const cors = require('cors');
const port = process.env.port || 8000;
const https = require('https');

const app = express()
app.use(cors());

// to fetch top-headlines
app.get('/getTopHeadlines', (req, res) => {
    const userAgent = req.get('user-agent');
    const API_KEY = req.query.apiKey;
    const options = {
        host: 'newsapi.org',
        path: `/v2/top-headlines?country=in&apiKey=${API_KEY}`,
        headers: {
            'User-Agent': userAgent
        }
    }
    https.get(options, function (response) {
        let data;
        response.on('data', function (chunk) {
            if (!data) {
                data = chunk;
            } else {
                data += chunk;
            }
        });
        response.on('end', function () {
            const newsData = JSON.parse(data);
            res.json(newsData)
        });
    });
})

//section wise top-headlines
app.get('/getTopHeadlinesOnCategory', (req, res) => {
    const userAgent = req.get('user-agent');
    const API_KEY = req.query.apiKey;
    const category = req.query.category;
    const page =  req.query.page;
    const pageSize = req.query.pageSize;
    const options = {
        host: 'newsapi.org',
        path: `/v2/top-headlines?&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}&country=us`,
        headers: {
            'User-Agent': userAgent
        }
    }
    https.get(options, function (response) {
        let data;
        response.on('data', function (chunk) {
            if (!data) {
                data = chunk;
            } else {
                data += chunk;
            }
        });
        response.on('end', function () {
            const newsData = JSON.parse(data);
            res.json(newsData)
        });
    });
})

// search query on the top-headlines
app.get('/getTopHeadlinesOnSearchQuery', (req, res) => {
    const userAgent = req.get('user-agent');
    const API_KEY = req.query.apiKey;
    const category = req.query.category;
    const page =  req.query.page;
    const pageSize = req.query.pageSize;
    const query = req.query.queryValue;
    const options = {
        host: 'newsapi.org',
        path: `/v2/top-headlines?&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}&q=${query}&country=us`,
        headers: {
            'User-Agent': userAgent
        }
    }
    https.get(options, function (response) {
        let data;
        response.on('data', function (chunk) {
            if (!data) {
                data = chunk;
            } else {
                data += chunk;
            }
        });
        response.on('end', function () {
            const newsData = JSON.parse(data);
            res.json(newsData)
        });
    });
})

// everything api
app.get('/everything', (req, res) => {
    const userAgent = req.get('user-agent');
    const searchQuery = req.query.q;
    const API_KEY = req.query.apiKey;
    console.log('params.',params);
    const options = {
        host: 'newsapi.org',
        path: `/v2/everything?q=${searchQuery}?&apiKey=${API_KEY}`,
        headers: {
            'User-Agent': userAgent,
        }
    }
    https.get(options, function (response) {
        let data;
        response.on('data', function (chunk) {
            if (!data) {
                data = chunk;
            } else {
                data += chunk;
            }
        });
        response.on('end', function () {
            const newsData = JSON.parse(data);
            res.json(newsData)
        });
    });
})


app.listen(port, () => console.log(`App listening on port ${port}!`))