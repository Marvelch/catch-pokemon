import express from 'express'
import axiosRequest from "axios"
import connection from "./config/database.config.js"
import Pokemon from './models/pokemon.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Sequelize } from 'sequelize'
const app = express()
const port = 8080

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pokemon-list', (req, res) => {
    var id = req.query.id;

    async function getPokemon() {
        let response = await axiosRequest.get(`https://pokeapi.co/api/v2/pokemon/?offset=${id}&limit=20`)
        return response;
    }

    async function getForms(params) {
        var arrForms = [];
        for(var param of params){
            let response = await axiosRequest.get(`${param.url}`)
            arrForms.push({name: param.name, images : response.data['sprites'], url: param.url});
        }
        return arrForms;
    }

    async function main() {
        let resultPokemon = await getPokemon();
        let resultDetailData = await getForms(resultPokemon.data.results);
        return resultDetailData;
    }

    main().then(result => {
        res.send(JSON.stringify(result));
    })
});

app.post('/catch/pokemon', (req, res) => {

    const pageId = req.query.id;
    const pokemonId = req.query.pokemon_id;
    const randomCatch = Math.floor(Math.random() * 100)
    
    async function getDetailPokemon() {
        try {
            let pokemonDetail = await axiosRequest.get(`https://pokeapi.co/api/v2/pokemon/${pageId}/`)
            let resultDetailRequest = {'idPage':pageId,'idListInPage':pokemonId,'pokemonName':pokemonDetail.data.forms[0].name};
            return resultDetailRequest;
        } catch (error) {
            return error.message;
        }
    }

    async function generateFibonacci() {
        try {
            await connection.authenticate();
            return Pokemon.findAll()
            .then(res => {
                var fibonacci = [];

                let n1 = 0, n2 = 1, nextTerm;

                for (let i = 1; i <= res.length+10; i++) {
                    fibonacci.push(n1)
                    nextTerm = n1 + n2;
                    n1 = n2;
                    n2 = nextTerm;
                }

                const unique = res.length < 0 ? 0 : res.length 
                
                return fibonacci[unique];
            }).catch((error) => {
                return error.message;
            });
        } catch (error) {
            return error.message;
        }
    }

    async function addMyListPokemon(paramsPokemon,paramsFibonancci) {
        try {
            connection.sync().then(() => {
                return Pokemon.create({
                    pokemonName: paramsPokemon.pokemonName,
                    customeName: paramsPokemon.pokemonName+'-'+paramsFibonancci,
                    pageId: paramsPokemon.idPage,
                    idInPage: paramsPokemon.idListInPage
                })
                .then(res => {
                    return res;
                });
            }).catch((error) => {
                return error.message;
            });
        } catch (error) {
            return error.message;
        }
    }

    async function main() {
        const responseCode = "200";
        const resultDetailPokemon = await getDetailPokemon();
        const resultGenerateFibonacci = await generateFibonacci();
        const resultMyListPokemon = await addMyListPokemon(resultDetailPokemon,resultGenerateFibonacci);
        const result = [{'responseCode':responseCode,'statusResponse':{resultDetailPokemon,resultGenerateFibonacci,resultMyListPokemon}}];
        return result;
    }

    main().then(result => {
        res.end(JSON.stringify(result))
    })
});

app.get('/my-list/pokemon', async (req,res) => {
    try {
        await Pokemon.findAll()
        .then(result => {
            res.end(JSON.stringify(
                {
                    'status':'success',
                    'data':{result},
                    'message': null
                }
            ));
        });
    } catch (error) {
        res.end(JSON.stringify(
            {
                'status':'failed',
                'message': error
            }
        ));
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})