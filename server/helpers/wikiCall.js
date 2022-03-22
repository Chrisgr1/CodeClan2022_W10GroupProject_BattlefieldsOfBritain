import {MongoClient, ObjectID}  from 'mongodb';
import fetch from 'node-fetch'


const wikiCall = async(req, res) => {
    console.log("req.body withing wikiCall", req.body);
    console.log("name from within the wiki call", req.body.name);
    const wikiBaseURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch='
    const wikiContentURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&rvsection=0&titles='
    const wikiParserStart = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&requestid=&origin=*&summary=&page='
    const wikiParserEnd ='&prop=images%7Cwikitext%7Csections&section=1'

    const stringParser = (string) => {
    const stringArray = string.split(' ')
        
        
        return stringArray.join('_')
    }

        const getbattle = await fetch(wikiBaseURL + req.body.name)
        .then(wikiRes => wikiRes.json())
        .then(wikiRes => {
            const nameOfBattle = stringParser(wikiRes.query.search[0].title)
            console.log("wikiRes", nameOfBattle);
            console.log("wikiContentURL + wikiRes.query.search[0].title", wikiContentURL + nameOfBattle);
            console.log("wikiParserStart + nameOfBattle + wikiParserEnd", wikiParserStart + nameOfBattle + wikiParserEnd)
            return fetch(wikiParserStart + nameOfBattle + wikiParserEnd)
        
        .then(data => data.json())
        .then(data => {
            res.status(200);
            res.json({title: data.parse.title, text: data.parse.wikitext["*"]});
        })
    })   
        }


export default wikiCall;